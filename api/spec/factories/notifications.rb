FactoryBot.define do
  factory :notification do
    association :user, factory: :user
    title { 'test' }
    body { 'test' }
  end
end
