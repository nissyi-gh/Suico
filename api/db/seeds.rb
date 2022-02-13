# 管理者ユーザーを登録
User.create!(
  name: "admin user",
  email: "admin.user@test.com",
  password: "adminuser",
  password_confirmation: "adminuser"
)

User.create!(
  name: "ゲストユーザー",
  email: "guest.user@guest.com",
  password: "guestuser",
  password_confirmation: "guestuser"
)

# 一般テストユーザーを登録
1.upto(10) do |n|
  User.create!(
    name: "#{n}th user",
    email: "test.user@#{n}th.com",
    password: "testpass",
    password_confirmation: "testpass"
  )
end

# 睡眠データを登録
def make_sleep_logs(times, user_id)
  t = Time.zone.now
  satisfactions = [nil, 0.0, 1.25, 2.5, 3.75, 5.0]
  sleep_in_hour = [22, 23, 0, 1]

  times.downto(1) do |i|
    SleepLog.create(
      user_id: user_id,
      sleep_at: Time.mktime(t.year, t.month, (t - i).day, sleep_in_hour[rand(0..3)], rand(0..59), 0),
      wake_at: Time.mktime(t.year, t.month, (t - i + 1).day, rand(6..10), rand(0..59), 0),
      satisfaction: satisfactions[rand(6)]
    )
  end
end

# 管理者
make_sleep_logs(50, 1)
# ゲスト
make_sleep_logs(100, 2)

# ゲストのみ睡眠プリセットを登録
1.upto(20) do |i|
  how_to_stop = rand(3)
  random_hour = rand(24)
  random_minute = rand(60)
  AlarmPreset.create(
    user_id: 2,
    preset_name: "試作#{i}番",
    wake_at: Time.zone.local(2000, 1, 1, random_hour, random_minute),
    how_to_stop: how_to_stop
  )
end
