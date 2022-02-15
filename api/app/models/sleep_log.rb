class SleepLog < ApplicationRecord
  attribute :sleep_time
  belongs_to :user
  default_scope { order(created_at: :desc) }
  validates :sleep_at, presence: true
  validates :wake_at, presence: true

  class << self
    def sleep_log_analyze(logs)
      sleep_at_average = time_average(logs, :sleep_at)
      wake_at_avereage = time_average(logs, :wake_at)

      [sleep_at_average, wake_at_avereage]
    end

    def time_average(model, target)
      # UTCとJSTの時差540分。RailsはUTC、文字列での出力時にはJSTに変換する
      # time_difference_between_utc_and_jst = 540
      # 24時台は0時扱いになってしまう。1440秒足すことで24時台として計算する
      add_24_hour = 60 * 24
      times = model.pluck(target).map do |log|
        log.hour.zero? ? log.min + add_24_hour : (log.hour * 60) + log.min
      end
      time_average = (times.sum / model.size)
      # 24時間を超えている場合は、24時間をマイナス
      time_average -= (24 * 60) if time_average > (24 * 60)
      format('%02<hour>d:%02<min>d', hour: time_average / 60, min: time_average % 60)
    end

    # 睡眠時間を計算する。
    def sleep_time(sleep_logs)
      sleep_logs.each do |log|
        log.sleep_time = Time.at(log[:wake_at] - log[:sleep_at]).utc.strftime('%H:%M')
      end
    end

    def sleep_time_analyze(logs)
      sleep_times = []
      logs.each do |log|
        add_24_hour = log[:wake_at].hour + 9 < 2 ? 24 : 0
        wake = {
          hour: log[:wake_at].hour + 9 + add_24_hour,
          min: log[:wake_at].min + 9
        }

        add_24_hour = log[:sleep_at].hour + 9 < 2 ? 24 : 0
        sleep = {
          hour: log[:sleep_at].hour + 9 + add_24_hour,
          min: log[:sleep_at].min + 9
        }

        sleep_times << (((wake[:hour] * 60) + wake[:min]) - ((sleep[:hour] * 60) + sleep[:min]))
      end
      average = sleep_time_average(sleep_times, logs.size)
      max = Time.at(sleep_times.max).in_time_zone.strftime('%H:%M')
      min = Time.at(sleep_times.min).in_time_zone.strftime('%H:%M')

      [average, max, min]
    end

    def sleep_time_average(sleep_times, size)
      time_average = sleep_times.sum / size
      format('%02<hour>d:%02<min>d', hour: time_average / 60, min: time_average % 60)
    end

    # 満足度の平均をnull以外から算出。
    def satisfaction_average(sleep_logs)
      satisfactions = sleep_logs.pluck(:satisfaction)
      null_count = 0
      satisfactions_total = 0
      satisfactions.each do |item|
        item ? satisfactions_total += item : null_count += 1
      end
      (satisfactions_total / (sleep_logs.size - null_count).to_f).round(1)
    end

    # indexアクションの処理をまとめる
    def sleep_log_index(sleep_logs)
      # 各データに睡眠時間をセット
      sleep_time(sleep_logs)
      # 起床時間、就寝時間の平均を取得
      data = sleep_log_analyze(sleep_logs)
      # 睡眠時間、最長睡眠、最短睡眠を取得
      sleep_time_data = sleep_time_analyze(sleep_logs)
      [*data, satisfaction_average(sleep_logs), *sleep_time_data]
    end
  end
end
