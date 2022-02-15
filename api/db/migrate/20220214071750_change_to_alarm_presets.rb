class ChangeToAlarmPresets < ActiveRecord::Migration[6.1]
  def change
    rename_column :alarm_presets, :how_to_stop, :task
  end
end
