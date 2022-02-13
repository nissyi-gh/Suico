require 'rails_helper'

RSpec.describe "AlarmPresets", type: :request do
  context 'alarm_presetを作成しようとしたとき' do
    before do
      @alarm_preset = FactoryBot.attributes_for(:alarm_preset)
      @user = FactoryBot.build(:user)
    end

    it "正常な値なら作成できる" do
      post api_v1_alarm_presets_path, params: { alarm_preset: @alarm_preset }
      expect(response).to have_http_status(:created)
    end
  end

  context 'alarm_presetを更新しようとしたとき' do
    before do
      @user = FactoryBot.create(:user)
      @alarm_preset = FactoryBot.create(:alarm_preset, user_id: @user[:id])
    end

    it 'alarm_presetはDBに存在する' do
      expect(AlarmPreset.find(@alarm_preset.id)).to be_valid
    end

    it 'preset_nameは空欄にできない' do
      patch api_v1_alarm_preset_path(@alarm_preset), params: {
        alarm_preset: {
          preset_name: ""
        }
      }
      expect(response).to have_http_status(:bad_request)
    end

    it 'user_idは空欄にできない' do
      patch api_v1_alarm_preset_path(@alarm_preset), params: {
        alarm_preset: {
          user_id: ""
        }
      }
      expect(response).to have_http_status(:bad_request)
    end

    it 'wake_atは空欄にできない' do
      patch api_v1_alarm_preset_path(@alarm_preset), params: {
        alarm_preset: {
          preset_name: ""
        }
      }
      expect(response).to have_http_status(:bad_request)
    end

    it 'how_to_stopは空欄にできない' do
      patch api_v1_alarm_preset_path(@alarm_preset), params: {
        alarm_preset: {
          how_to_stop: ""
        }
      }
      expect(response).to have_http_status(:bad_request)
    end

    # FactoryBotではuser_id: 1で作成
    it 'user_idは変更できない' do
      patch api_v1_alarm_preset_path(@alarm_preset), params: {
        alarm_preset: {
          user_id: @user[:id] + 1
        }
      }
      expect(response).to have_http_status(:bad_request)
    end
  end
end
