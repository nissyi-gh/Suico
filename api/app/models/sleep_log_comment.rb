class SleepLogComment < ApplicationRecord
  has_one :sleep_log, dependent: :destroy
end
