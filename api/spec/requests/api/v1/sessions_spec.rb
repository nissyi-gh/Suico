require 'rails_helper'

RSpec.describe "Sessions", type: :request do
  before do
    @guest_user = FactoryBot.create(:guest)
  end

  context 'ゲストログインしようとした場合' do
    it 'レスポンスは200を返す' do
      expect(
        post api_v1_login_path, params: {
          session: {
            email: @guest_user.email,
            password: @guest_user.password
          }
        }
      ).to eq(200)
    end
  end
end