class CommentRelationship < ApplicationRecord
  belongs_to :sleep_log
  belongs_to :sleep_log_comment

  validates :sleep_log_id, presence: true
  validates :sleep_log_comment_id, presence: true
end
