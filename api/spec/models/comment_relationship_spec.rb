require 'rails_helper'

RSpec.describe CommentRelationship, type: :model do
  context 'バリデーションについて検証した場合' do
    it 'sleep_logとsleep_log_commentのidがあれば有効' do
      user = create(:user)
      sleep_log = create(:sleep_log, user_id: user.id)
      sleep_log_comment = create(:sleep_log_comment)
      new_comment = CommentRelationship.new(sleep_log_id: sleep_log.id, sleep_log_comment_id: sleep_log_comment.id)
      expect(new_comment).to be_valid
    end
    
    it 'sleep_logのidが無ければ無効' do
      new_comment = CommentRelationship.new(sleep_log_id: nil, sleep_log_comment_id: 1)
      expect(new_comment).to_not be_valid
    end

    it 'sleep_log_commentのidが無ければ無効' do
      new_comment = CommentRelationship.new(sleep_log_id: 1, sleep_log_comment_id: nil)
      expect(new_comment).to_not be_valid
    end

    it 'sleep_logとsleep_log_commentのidが無ければ無効' do
      new_comment = CommentRelationship.new(sleep_log_id: nil, sleep_log_comment_id: 1)
      expect(new_comment).to_not be_valid
    end
  end
end
