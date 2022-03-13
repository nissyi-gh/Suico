class CreateNotifications < ActiveRecord::Migration[6.1]
  def change
    create_table :notifications do |t|
      t.references :user, foreign_key: true
      t.integer :post_user_id, null: false, default: 0
      t.string :title, null: false
      t.text :body, null: false

      t.timestamps
    end
  end
end
