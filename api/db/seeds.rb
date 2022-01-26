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
