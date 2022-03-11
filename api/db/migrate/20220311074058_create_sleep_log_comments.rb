class CreateSleepLogComments < ActiveRecord::Migration[6.1]
  def change
    create_table :sleep_log_comments do |t|
      t.text :body, null: false

      t.timestamps
    end
  end
end
