require 'rails_helper'

RSpec.describe AlarmPreset, type: :model do
  context '新規のプリセットを作成しようとしたとき' do
    it '正規のデータなら有効' do
      expect(User.count).to eq nil
      new_preset = FactoryBot.build(:alarm_preset)
      expect(new_preset).to be_valid
    end

    it 'user_idがnilなら無効' do
      new_preset = FactoryBot.build(:alarm_preset, user_id: nil)
      expect(new_preset).to_not be_valid
    end

    it 'preset_nameがnilなら無効' do
      new_preset = FactoryBot.build(:alarm_preset, preset_name: nil)
      expect(new_preset).to_not be_valid
    end

    it 'preset_nameが空白文字なら無効' do
      new_preset = FactoryBot.build(:alarm_preset, preset_name: " ")
      expect(new_preset).to_not be_valid
    end

    it 'wake_atがnilなら無効' do
      new_preset = FactoryBot.build(:alarm_preset, wake_at: nil)
      expect(new_preset).to_not be_valid
    end

    it 'how_to_stopがnilなら無効' do
      new_preset = FactoryBot.build(:alarm_preset, task: nil)
      expect(new_preset).to_not be_valid
    end
  end
end
