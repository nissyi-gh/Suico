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
    end
  end
end
