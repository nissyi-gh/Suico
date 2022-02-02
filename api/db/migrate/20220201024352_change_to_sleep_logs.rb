class ChangeToSleepLogs < ActiveRecord::Migration[6.1]
  def change
    change_column :sleep_logs, :satisfaction, :float
  end
end
