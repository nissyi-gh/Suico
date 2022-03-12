require 'rails_helper'

RSpec.describe "SleepLogComments", type: :request do
  context 'ユーザーが持つcommentを取得しようとしたとき' do
    before do
      @user = create(:user)
      @sleep_log = create(:sleep_log, user_id: @user.id)
      @sleep_log_comment = create(:sleep_log_comment)
      @new_comment = CommentRelationship.new(sleep_log_id: @sleep_log.id, sleep_log_comment_id: @sleep_log_comment.id)
    end

    it 'ユーザーのコメントを取得できる' do
      get api_v1_sleep_log_comments_path, params: {
        user_id: @user.id
      }
      expect(JSON.parse(response.body)).to eq(sleep_log_comment)  
    end

    it 'コメントを1件作成していたら、取得できるデータの件数は1件' do
      get api_v1_sleep_log_comments_path, params: {
        user_id: @user.id
      }
      expect(JSON.parse(response.body).count).to eq(1) 
    end
  end
end
