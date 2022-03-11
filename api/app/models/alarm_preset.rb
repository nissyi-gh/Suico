class AlarmPreset < ApplicationRecord
  belongs_to :user
  validates :wake_at, presence: true
  default_scope { order(wake_at: :asc) }
  validates :preset_name, presence: true
  validates :task, presence: true

  def self.create_sample_preset(user_id)
    AlarmPreset.create(
      user_id: user_id,
      preset_name: 'プリセットサンプル',
      wake_at: Time.zone.local(2000, 1, 1, 7, 0),
      task: rand(3)
    )
  end
end
