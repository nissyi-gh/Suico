FactoryBot.define do
  factory :user do
    name { "example user" }
    email { "foo@bar.com" }
    birthday_at { Time.zone.today }
    password { "foobar123" }
    password_confirmation { "foobar123" }

    factory :guest do
      name { "ゲスト" }
      email { "guest@example.com" }
    end
  end
end
