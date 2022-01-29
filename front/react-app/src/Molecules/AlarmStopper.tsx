// Day.js
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

type propsFunctions = {
  alarm: dayjs.Dayjs,
  task: number | undefined,
  alarmLeftTime: string | undefined, 
}

export const AlarmStopper = ({ alarm, task, alarmLeftTime }: propsFunctions): JSX.Element => {
  return (
    <>
      <div className="border border-white">
        <p className="block">
          アラーム日時 : { alarm.format('YYYY/MM/DD HH:mm') }
        </p>
        <p className="block">
          残り時間 : { alarmLeftTime }
        </p>
      </div>
      <form>
        <div className="text-right flex flex-end items-end">
          <div className="w-2/3"></div>
          <div className="w-1/3">
            <img src="alarm_sheep.png" alt="Sheep" className="block w-full" />
          </div>
        </div>
      </form>
    </>
  )
}