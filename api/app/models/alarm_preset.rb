class AlarmPreset < ApplicationRecord
  belongs_to :user
  validates :wake_at, presence: true
  default_scope { order(wake_at: :asc) }
  validates :preset_name, presence: true
end
