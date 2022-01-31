class CreateSleepLogs < ActiveRecord::Migration[6.1]
  def change
    create_table :sleep_logs do |t|
      t.references :user, foreign_key: true
      t.datetime :sleep_at
      t.datetime :wake_at
      t.integer :satisfaction, limit: 1

      t.timestamps
    end
  end
end
