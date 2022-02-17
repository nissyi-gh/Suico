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
      # 2時までは26時台として計算する
      add_24_hour = 3600 * 24
      times = model.pluck(target).map do |log|
        log.hour < 2 ? (log.min * 60) + add_24_hour : (log.hour * 3600) + (log.min * 60)
      end

      time_average = (times.sum / model.size)
      # 26時を超えている場合は、26時間をマイナス
      time_average -= (26 * 3600) if time_average > (26 * 3600)
      format('%02<hour>d:%02<min>d', hour: time_average / 3600, min: time_average % 3600 / 60)
    end

    # 睡眠時間を計算する。
    def sleep_time(sleep_logs)
      sleep_logs.each do |log|
        log.sleep_time = Time.at(log[:wake_at] - log[:sleep_at]).utc.strftime('%H:%M')
      end
    end

    # Time型のデータの時間と分を秒ベースに変換
    def time_convert_to_second_base(log)
      (log.hour * 3600) + (log.min * 60)
    end

    def sleep_time_analyze(logs)
      sleep_times = []
      logs.each do |log|
        wake_at = time_convert_to_second_base(log[:wake_at])
        sleep_at = time_convert_to_second_base(log[:sleep_at])
        add_1_day = log[:sleep_at].day == log[:wake_at].day ? 0 : 86400

        sleep_times << ((sleep_at - wake_at) - add_1_day).abs
      end

      average = sleep_time_average(sleep_times, sleep_times.size)
      max = Time.local(2000, 1, 1, sleep_times.max / 3600, sleep_times.max % 3600 / 60).in_time_zone.strftime('%H:%M')
      min = Time.local(2000, 1, 1, sleep_times.min / 3600, sleep_times.min % 3600 / 60).in_time_zone.strftime('%H:%M')

      [average, max, min]
    end

    def sleep_time_average(sleep_times, size)
      time_average = sleep_times.sum / size
      format('%02<hour>d:%02<min>d', hour: time_average / 3600, min: time_average % 3600 / 60)
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
