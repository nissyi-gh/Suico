require 'rails_helper'

RSpec.describe Notification, type: :model do
  context 'モデルの有効性を検証' do
    before do
      @user = create(:user)
    end

    it 'すべてのデータが有れば有効' do
      expect(build(:notification, user: @user)).to be_valid
    end

    it 'タイトルがnilなら無効' do
      expect(build(:notification, user: @user, title: nil)).to be_valid
    end

    it 'タイトルが空文字なら無効' do
      expect(build(:notification, user: @user, title: "   ")).to be_valid
    end

    it 'bodyがnilなら無効' do
      expect(build(:notification, user: @user, body: nil)).to be_valid
    end

    it 'bodyが空文字なら無効' do
      expect(build(:notification, user: @user, body: "   ")).to be_valid
    end

  end
end
