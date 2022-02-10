require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  context 'ゲストログインしようとした場合' do      
    it 'レスポンスは200を返す' do
      expect(
        post api_v1_login_path, params: {
          session: {
            email: "guest.user@guest.com",
            password: "guestuser"
          }
        }
      ).to eq(200)
    end
  end
end