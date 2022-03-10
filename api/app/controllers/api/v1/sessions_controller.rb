module Api
  module V1
    class SessionsController < ApplicationController
      def new
      end

      def create
        user = User.find_by(email: params[:session][:email].downcase)

        # userが有効かつ、パスワードが正しいか
        if user&.authenticate(params[:session][:password])
          log_in user
          params[:session][:remember_me] ? remember(user) : forget(user)
          render json: {}, status: :ok
        else
          render json: {}, status: :bad_request
        end
      end

      def destroy
        logged_in? ? log_out : render(json: {}, status: :bad_request)
      end

      def logged_in
        if logged_in?
          render json: { user: current_user }
        else
          render json: {}, status: :bad_request
        end
      end
    end
  end
end
