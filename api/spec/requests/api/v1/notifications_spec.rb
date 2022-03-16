require 'rails_helper'

RSpec.describe "Notifications", type: :request do
  context '通知を取得しようとしたとき' do
    before do
      @notification = create(:notification)

      post api_v1_login_path, params: {
        session: {
          email: @notification.user.email,
          password: @notification.user.password
        }
      }
    end
    
    it '保存されている通知を取得できる' do
      get api_v1_notifications_path
      expect(JSON.parse(response.body)).to eq [JSON.parse(@notification.to_json)]
    end
  end

  context '通知を削除しようとしたとき' do
    before do
      @notification = create(:notification)

      post api_v1_login_path, params: {
        session: {
          email: @notification.user.email,
          password: @notification.user.password
        }
      }
    end
    
    it '保存されている通知を取得できる' do
      delete api_v1_notification_path(@notification)
      expect(response).to have_http_status 200
    end
  end
end
