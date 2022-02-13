FactoryBot.define do
  factory :alarm_preset do
    user_id { 1 }
    preset_name { "test preset" }
    wake_at { Time.zone.now }
    how_to_stop { rand(2) }
  end
end
