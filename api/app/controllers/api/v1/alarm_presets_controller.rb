module Api
  module V1
    class AlarmPresetsController < ApplicationController
      def create
        alarm_preset = AlarmPreset.new(alarm_preset_params)
        if alarm_preset.save
          render json: {}, status: :created
        else
          render json: {}, status: :bad_request
        end
      end

      def update
        alarm_preset = AlarmPreset.find(params[:id])

        if alarm_preset.update(alarm_preset_params)
          render json: {}, status: :ok
        else
          render json: {}, status: :bad_request
        end
      end

      private

      def alarm_preset_params
        params.require(:alarm_preset).permit(:user_id, :preset_name, :wake_at, :how_to_stop)
      end

      def correct_preset(preset_id)
        AlarmPreset.find(id: preset_id)
      end
    end
  end
end
