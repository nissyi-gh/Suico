class SleepLogComment < ApplicationRecord
  has_one :comment_relationship, dependent: :destroy
end
