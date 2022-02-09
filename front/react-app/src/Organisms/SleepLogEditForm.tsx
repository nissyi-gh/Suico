import { useEffect, useState } from "react";
import { AlarmSetterWithLabel, SatisfactionSelectorWithLabel, submitButton } from "../Molecules/Form";
import { ModalClose } from "../Molecules/ModalClose";
import { SleepLogListItem } from "../types/types";

export const SleepLogEditForm = ({ hideModalFunction, log } : { hideModalFunction: () => void, log: SleepLogListItem }): JSX.Element => {
  const [beforeLog] = useState<SleepLogListItem>(log);
  const [changeLog, setChangeLog] = useState<SleepLogListItem>(log);

  useEffect(() => {
    console.log("送信します")
  }, [beforeLog, changeLog])

  const onClickSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    const wakeAtHour = (document.getElementById('wakeAt_hour') as HTMLSelectElement).value;
    const wakeAtMin = (document.getElementById('wakeAt_min') as HTMLSelectElement).value;
    const sleepAtHour = (document.getElementById('sleepAt_hour') as HTMLSelectElement).value;
    const sleepAtMin = (document.getElementById('sleepAt_min') as HTMLSelectElement).value;
    const satisfaction = (document.getElementById('satisfaction') as HTMLSelectElement).value;
    e.preventDefault();

    const changingLog: SleepLogListItem = {
      sleepLogId: log.sleepLogId,
      wakeAt: log.wakeAt.hour(parseInt(wakeAtHour, 10)).minute(parseInt(wakeAtMin, 10)),
      sleepAt: log.sleepAt.hour(parseInt(sleepAtHour, 10)).minute(parseInt(sleepAtMin, 10)),
      sleepTime: log.sleepTime,
      satisfaction: parseInt(satisfaction, 10)
    }

    if ((beforeLog.wakeAt.isSame(changingLog.wakeAt)) &&
        (beforeLog.sleepAt.isSame(changingLog.sleepAt)) && 
        (beforeLog.satisfaction === changingLog.satisfaction))
    {
      return console.log("変更なし")
    }

    setChangeLog(changingLog);
  }

  return(
    <>
      { ModalClose(hideModalFunction, `睡眠ログ編集フォーム （ID: ${ log.sleepLogId }）`)}
      <form className="border-2 border-white bg-amber-100 p-4 flex justify-center">
        <div className="w-5/6">
          <p>{ log.sleepAt.format('MM/DD(dd)')}</p>
          { AlarmSetterWithLabel("就寝時刻", "sleepAt", "sleepAt", log.sleepAt) }
          { AlarmSetterWithLabel("起床時刻", "wakeAt", "wakeAt", log.wakeAt) }
          { SatisfactionSelectorWithLabel(log.satisfaction) }
          { submitButton("変更する", onClickSubmit) }
        </div>
      </form>
      <ul id="form_error"></ul>
    </>
  )
}