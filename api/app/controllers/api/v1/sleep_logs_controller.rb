module Api
  module V1
    class SleepLogsController < ApplicationController
      def index
        # Rails側ではUTCで保存、出力する
        # 文字列で出力する場合には、JSTに変換したうえでフロントに渡す

        # テスト用にuser_id: 1のデータのみ表示
        # sleep_logs = SleepLog.select(:id, :sleep_at, :wake_at, :satisfaction).where(user_id: 1)
        sleep_logs = SleepLog.eager_load(:sleep_log_comment).select(
          :id,
          :sleep_at,
          :wake_at,
          :satisfaction,
          :body
        ).where(user_id: current_user.id)
        sleep_data = sleep_logs.sleep_log_index(sleep_logs)

        render json: {
          sleep_logs: sleep_logs,
          average: {
            sleep_at: sleep_data[0],
            wake_at: sleep_data[1],
            satisfaction: sleep_data[2],
            sleep_time: sleep_data[3]
          },
          max: sleep_data[4],
          min: sleep_data[5]
        }, status: :ok
      end

      def create
        sleep_log = current_user.sleep_logs.build(sleep_log_params)
        if sleep_log.save
          render json: {}, status: :ok
        else
          render json: {}, status: :bad_request
        end
      end

      def destroy
        log = SleepLog.find_by(id: params[:id])
        # ユーザーがもっているlogでなければ早期リターン
        return if current_user.sleep_logs.exclude?(log)

        log.delete
        render json: {}, status: :ok
      end

      def update
        log = SleepLog.find_by(id: params[:id])
        return if current_user.sleep_logs.exclude?(log)

        log.update(sleep_log_params)
      end

      private

      def sleep_log_params
        params.require(:sleep_log).permit(:sleep_at, :wake_at, :satisfaction)
      end
    end
  end
end
