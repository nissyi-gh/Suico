FactoryBot.define do
  factory :alarm_preset do
    user_id { 1 }
    preset_name { "test preset" }
    wake_at { Time.zone.now }
    task { rand(2) }
  end
end
