import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { sleepLogsAPI } from "../constants/urls";
import { AlarmSetterWithLabel, CommentEditorWithLabel, SatisfactionSelectorWithLabel, submitButton } from "../Molecules/Form";
import { ModalClose } from "../Molecules/ModalClose";
import { SleepLogListItem } from "../types/types";
import { fetchSleepLogs } from "../Functions/Functions";
import { sleepLogsProviderContext } from "../providers/SleepLogsProvider";

// dayjs
import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc';
import "dayjs/locale/ja";
dayjs.extend(utc);
dayjs.locale('ja');

export const SleepLogEditForm = ({ hideModalFunction, log } : { hideModalFunction: () => void, log: SleepLogListItem }): JSX.Element => {
  const [beforeLog] = useState<SleepLogListItem>(log);
  const [changeLog, setChangeLog] = useState<SleepLogListItem>();
  const { setSleepLogs, setSleepLogsData } = useContext(sleepLogsProviderContext);

  useEffect(() => {
    if (changeLog) {
      axios.patch(`${sleepLogsAPI}/${log.sleepLogId}`,
        {
          sleep_at: changeLog.sleepAt.utc(),
          wake_at: changeLog.wakeAt.utc(),
          satisfaction: changeLog.satisfaction,
          body: changeLog.comment
        }, 
        { withCredentials: true })
      .then(() => {
        fetchSleepLogs(setSleepLogs, setSleepLogsData);
        hideModalFunction();
      })
      .catch(e => console.log(e))
    }
  }, [changeLog, log.sleepLogId, hideModalFunction, setSleepLogs, setSleepLogsData])

  const onClickSubmit = (e: React.FormEvent<HTMLInputElement>): void => {
    const wakeAtHour = (document.getElementById('wakeAt_hour') as HTMLSelectElement).value;
    const wakeAtMin = (document.getElementById('wakeAt_min') as HTMLSelectElement).value;
    const sleepAtHour = (document.getElementById('sleepAt_hour') as HTMLSelectElement).value;
    const sleepAtMin = (document.getElementById('sleepAt_min') as HTMLSelectElement).value;
    const satisfaction = (document.getElementById('satisfaction') as HTMLSelectElement).value;
    const comment = (document.getElementById('comment') as HTMLTextAreaElement).value;
    e.preventDefault();

    const changedWakeAt = log.wakeAt.hour(parseInt(wakeAtHour, 10)).minute(parseInt(wakeAtMin, 10));
    const changedSleepAt = log.sleepAt.hour(parseInt(sleepAtHour, 10)).minute(parseInt(sleepAtMin, 10))

    const changingLog: SleepLogListItem = {
      sleepLogId: log.sleepLogId,
      wakeAt: changedWakeAt.utc(),
      sleepAt: changedSleepAt.utc(),
      satisfaction: parseFloat(satisfaction),
      comment: comment,
    }

    if ((beforeLog.wakeAt.isSame(changingLog.wakeAt)) &&
        (beforeLog.sleepAt.isSame(changingLog.sleepAt)) && 
        (beforeLog.satisfaction === changingLog.satisfaction) &&
        (beforeLog.comment === changingLog.comment))
    {
      return console.log("変更なし")
    }

    setChangeLog(changingLog);
  }

  return(
    <>
      { ModalClose(hideModalFunction, `睡眠ログ編集フォーム`)}
      <form className="border-2 dark:border border-gray-100 bg-amber-100 dark:bg-gray-500 p-4 flex justify-center rounded-md">
        <div className="w-5/6">
          <p className="block mb-4 text-xl tracking-wider">{ log.sleepAt.format('MM/DD(dd)')}</p>
          { AlarmSetterWithLabel("就寝時刻", "sleepAt", `sleepAt`, log.sleepAt) }
          { AlarmSetterWithLabel("起床時刻", "wakeAt", "wakeAt", log.wakeAt) }
          { SatisfactionSelectorWithLabel(log.satisfaction) }
          { CommentEditorWithLabel(log.comment) }
          { submitButton("変更する", onClickSubmit) }
        </div>
      </form>
      <ul id="form_error"></ul>
    </>
  )
}