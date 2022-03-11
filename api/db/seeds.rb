# 管理者ユーザーを登録
User.create!(
  name: "admin user",
  email: "admin.user@test.com",
  password: "adminuser",
  password_confirmation: "adminuser"
)

# 管理者
SleepLog.make_sleep_logs(50, 1)

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
