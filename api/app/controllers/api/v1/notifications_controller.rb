module Api
  module V1
    class NotificationsController < ApplicationController
      def index
        notifications = current_user.notifications
        if notifications
          render json: notifications
        else
          render json: 404
        end
      end

      def destroy
        notification = Notification.find(params[:id])
        return if current_user.notifications.exclude?(notification)

        notification.destroy
        render json: 200
      end
    end
  end
end
