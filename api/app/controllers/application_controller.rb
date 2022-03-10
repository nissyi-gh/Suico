class ApplicationController < ActionController::API
  include ActionController::Cookies

  # userでセッションを作成する
  def log_in(user)
    session[:user_id] = user.id
  end

  # 現在のユーザーをログアウト
  def log_out
    forget(current_user)
    session.delete(:user_id)
    @current_user = nil
  end

  # 永続ログイン用に署名付きcookieを作る
  def remember(user)
    user.remember
    cookies.permanent.signed[:user_id] = user.id
    cookies.permanent.signed[:remember_token] = user.remember_token
  end

  # 現在のユーザー・記憶トークンに対応するユーザーを返す
  def current_user
    if (user_id = session[:user_id])
      @current_user ||= User.find_by(id: session[:user_id])
    elsif (user_id = cookies.signed[:user_id])
      user = User.find_by(id: user_id)
      if user&.authenticated?(cookies[:remember_token])
        log_in user
        @current_user = user
      end
    end
  end

  # ログインしているならtrue, していなければfalse
  def logged_in?
    !current_user.nil?
  end

  # 永続的セッションを破棄する
  def forget(user)
    user.forget
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
  end

  module Api
    module V1
      def health
        render json: { message: 'hello' }, status: :ok
      end
    end
  end
end
