require 'rails_helper'

RSpec.describe "AlarmPresets", type: :request do
  context 'alarm_presetを作成しようとしたとき' do
    before do
      @alarm_preset = FactoryBot.attributes_for(:alarm_preset)
    end

    it "正常な値なら作成できる" do
      expect(
        post api_v1_alarm_presets_path, params: { alarm_preset: @alarm_preset }
      ).to have_http_status(200)
    end
  end

  context 'alarm_presetを更新しようとしたとき' do
    before do
      @alarm_preset = FactoryBot.create(:alarm_preset)
    end

    it 'preset_nameは空欄にできない' do
      expect (
        patch api_v1_alarm_preset_path(@alarm_preset.id), params: {
          alarm_preset: {
            title: ''
          }
        }
      ).to eq false
    end
  end
end
