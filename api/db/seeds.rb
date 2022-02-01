# 管理者ユーザーを登録
User.create!(
  name: "admin user",
  email: "admin.user@test.com",
  password: "adminuser",
  password_confirmation: "adminuser"
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

# 管理者のみ睡眠データを登録
t = Time.zone.now
satisfactions = [nil, 0.0, 1.25, 2.5, 3.75, 5.0]
40.downto(1) do |i|
  hour = rand(8..9)
  min = rand(30)
  satisfaction = satisfactions[rand(6)]
  SleepLog.create(
    user_id: 1,
    sleep_at: Time.mktime(t.year, t.month, t.day, hour, min, 0) - (i.day - 14.hours),
    wake_at: Time.mktime(t.year, t.month, t.day, hour, min, 0) - (i - 1).day, satisfaction: satisfaction
  )
end
