FactoryBot.define do
  factory :sleep_log do
    sleep_at { Time.now }
    wake_at { Time.now }
    satisfaction { 0.0 }
  end
end
