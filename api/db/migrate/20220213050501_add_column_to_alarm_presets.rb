class AddColumnToAlarmPresets < ActiveRecord::Migration[6.1]
  def change
    add_column :alarm_presets, :how_to_stop, :tinyint
  end
end
