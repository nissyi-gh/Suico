class CommentRelationship < ApplicationRecord
  belongs_to :sleep_log
  belongs_to :sleep_log_comment
end
