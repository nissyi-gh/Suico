require 'rails_helper'

RSpec.describe SleepLogComment, type: :model do
  context 'モデルの有効性について検証' do
    it 'sleep_log_idに関連付けされていてbodyがあれば有効' do
      user = create(:user)
      sleep_log = create(:sleep_log, user_id: user.id)
      expect(sleep_log.sleep_log_comment.new(body: 'test')).to be_valid
    end

    it 'sleep_log_idがない場合は無効' do
      expect(SleepLogComment.new(sleep_log_id: nil, body: 'test')).to_not be_valid
    end

    it 'bodyがない場合は無効' do
      sleep_log = build(:sleep_log)
      expect(SleepLogComment.new(sleep_log_id: sleep_log.id, body: nil)).to_not be_valid
    end
  end
end
