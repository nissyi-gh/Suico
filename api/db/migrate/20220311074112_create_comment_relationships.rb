class CreateCommentRelationships < ActiveRecord::Migration[6.1]
  def change
    create_table :comment_relationships do |t|
      t.references :sleep_log, null: false, foreign_key: true
      t.references :sleep_log_comment, null: false, foreign_key: true
      t.timestamps
    end

    add_index :comment_relationships, %i[sleep_log_id sleep_log_comment_id], unique: true, name: 'comment_relationship'
  end
end
