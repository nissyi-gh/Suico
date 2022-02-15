module Api
  module V1
    class AlarmPresetsController < ApplicationController
      def index
        alarm_presets = AlarmPreset.where(user_id: current_user.id)
        if alarm_presets
          render json: { alarm_presets: alarm_presets }, status: :ok
        else
          render json: {}, status: :no_content
        end
      end

      def create
        alarm_preset = AlarmPreset.new(alarm_preset_params)
        alarm_preset[:user_id] = current_user[:id]
        
        if alarm_preset.save
          render json: {}, status: :created
        else
          render json: { alarm_preset: alarm_preset }
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

      def destroy
        if correct_preset(params[:id]).destroy
          render json: {}, status: :no_content
        else
          render json: {}, status: :bad_request
        end
      end

      private

      def alarm_preset_params
        params.require(:alarm_preset).permit(:user_id, :preset_name, :wake_at, :task)
      end

      def correct_preset(preset_id)
        AlarmPreset.find(preset_id)
      end
    end
  end
end
