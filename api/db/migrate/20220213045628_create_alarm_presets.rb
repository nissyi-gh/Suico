class CreateAlarmPresets < ActiveRecord::Migration[6.1]
  def change
    create_table :alarm_presets do |t|
      t.references :user, foreign_key: true
      t.string :preset_name
      t.datetime :wake_at
      t.timestamps
    end
  end
end
