class SleepLog < ApplicationRecord
  attribute :sleep_time
  belongs_to :user
  default_scope { order(created_at: :desc) }
  validates :sleep_at, presence: true
  validates :wake_at, presence: true
end
