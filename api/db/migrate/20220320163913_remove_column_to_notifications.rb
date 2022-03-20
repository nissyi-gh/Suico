class RemoveColumnToNotifications < ActiveRecord::Migration[6.1]
  def up
    remove_column :notifications, :post_user_id
  end
end
