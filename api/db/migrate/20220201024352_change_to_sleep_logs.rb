class ChangeToSleepLogs < ActiveRecord::Migration[6.1]
  def up
    change_column :sleep_logs, :satisfaction, :float
  end
end
