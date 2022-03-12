class CreateSleepLogComments < ActiveRecord::Migration[6.1]
  def change
    create_table :sleep_log_comments do |t|
      t.references :sleep_log, foreign_key: true
      t.text :body, null: false

      t.timestamps
    end
  end
end
