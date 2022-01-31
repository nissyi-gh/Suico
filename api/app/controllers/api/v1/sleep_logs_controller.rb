module Api
  module V1
    class SleepLogsController < ApplicationController
      def index
        logs = SleepLog.all
        render json: { logs: logs }, status: :ok
      end
    end
  end
end
