// Day.js
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

export const AlarmStopper = ({ alarm }:{ alarm: dayjs.Dayjs }): JSX.Element => {
  return (
    <>
      <div className="border border-white">
        アラーム日時 : { alarm.format('YYYY/MM/DD HH:mm') }
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