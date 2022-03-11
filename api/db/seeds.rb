# 管理者ユーザーを登録
User.create!(
  name: "admin user",
  email: "admin.user@test.com",
  password: "adminuser",
  password_confirmation: "adminuser"
)

# 就寝と起床が同日になる睡眠データを生成
def same_day_sleep_log_creater(user_id, today, iterator, satisfactions)
  SleepLog.create(
    user_id: user_id,
    sleep_at: Time.local(today.year, today.month, today.day, rand(0..1), rand(0..59), 0).in_time_zone - iterator.day,
    wake_at: Time.local(today.year, today.month, today.day, rand(5..9), rand(0..59), 0).in_time_zone - iterator.day,
    satisfaction: satisfactions[rand(6)]
  )
end

# 就寝と起床が別日になる睡眠データを生成
def diff_day_sleep_log_creater(user_id, today, iterator, satisfactions)
  SleepLog.create(
    user_id: user_id,
    sleep_at: Time.local(today.year, today.month, today.day, rand(21..23), rand(0..59), 0).in_time_zone - iterator.day,
    wake_at: Time.local(
      today.year,
      today.month,
      today.day,
      rand(5..9),
      rand(0..59),
      0
    ).in_time_zone - iterator.day + 1.day,
    satisfaction: satisfactions[rand(6)]
  )
end

# 睡眠データを登録
def make_sleep_logs(times, user_id)
  t = Time.zone.now
  satisfactions = [nil, 0.0, 1.25, 2.5, 3.75, 5.0]

  times.downto(1) do |i|
    # 0の場合のみ、就寝、起床ともに日付は同じ（夜ふかしパターン）。
    create_mode = rand(10)

    case create_mode
    when 0
      # 日付は同じ（夜ふかしパターン）
      same_day_sleep_log_creater(user_id, t, i, satisfactions)
    else
      # 日付はまたぐ（早寝早起きパターン）
      diff_day_sleep_log_creater(user_id, t, i, satisfactions)
    end
  end
end

# 管理者
make_sleep_logs(50, 1)
# ゲスト
make_sleep_logs(50, 2)

# ゲストのみ睡眠プリセットを登録
1.upto(20) do |i|
  random_hour = rand(24)
  random_minute = rand(60)
  AlarmPreset.create(
    user_id: 2,
    preset_name: "試作#{i}番",
    wake_at: Time.zone.local(2000, 1, 1, random_hour, random_minute),
    task: rand(3)
  )
end
