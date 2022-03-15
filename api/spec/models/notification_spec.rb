require 'rails_helper'

RSpec.describe Notification, type: :model do
  context 'モデルの有効性を検証' do
    it 'すべてのデータが有れば有効' do
      expect(build(:notification)).to be_valid
    end

    it 'タイトルがnilなら無効' do
      expect(build(:notification, title: nil)).to be_valid
    end

    it 'タイトルが空文字なら無効' do
      expect(build(:notification, title: "   ")).to be_valid
    end

    it 'bodyがnilなら無効' do
      expect(build(:notification, body: nil)).to be_valid
    end

    it 'bodyが空文字なら無効' do
      expect(build(:notification, body: "   ")).to be_valid
    end

  end
end
