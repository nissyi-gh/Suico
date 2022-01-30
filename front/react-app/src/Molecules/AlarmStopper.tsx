// Day.js
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { createElement, memo, useEffect, useState } from "react";
import { ALARM_STATE } from "../constants/constants";
dayjs.locale('ja');

type propsFunctions = {
  alarm: dayjs.Dayjs,
  task: number | undefined,
  alarmLeftTime: string | undefined, 
}

export const AlarmStopper = memo(({ alarm, task, alarmLeftTime }: propsFunctions): JSX.Element => {
  console.log("RenderTest: AlarmStopper");
  const [taskLeft, setTaskLeft] = useState<number>(task === 0 ? 0 : 100);
  const taskField = document.getElementById("task_field") as HTMLDivElement;

  const showWakeUpButton = () => {
    const wakeUpButton = document.getElementById("wake_up_button") as HTMLDivElement;

    wakeUpButton.classList.remove('hidden');
  }

  const taskCreate = (task: number | undefined) => {
    const taskField = document.getElementById("task_field") as HTMLDivElement;

    taskField.classList.remove("hidden");
    switch (task) {
      case 1: 
        break;
      case 2:
        console.log("2");
        break;
    }
  }
  
  useEffect(() => {
    if (alarmLeftTime === "00:00:00") {
      taskLeft ? taskCreate(task) : showWakeUpButton();
    }
  }, [taskLeft, task, alarmLeftTime])


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
      <div id="task_field" className="hidden">
        { taskLeft ? <p>残りの問題数 { taskLeft }</p> : <></> }
        <div id="calculate">
          <p>
            <span id="question_left"></span>
            <span id="manipulate_type"></span>
            <span id="question_right"></span>
            <span id="question_equal">= ?</span>
          </p>
          <div id="answer">
            <p className="border-2 bg-gray-400">解答を選んでください。</p>
            <p id="answer_status"></p>
          </div>
        </div>
      </div>
      <div className="text-right flex flex-end items-end">
        <div className="w-2/3"></div>
        <div className="w-1/3">
          <img src="alarm_sheep.png" alt="Sheep" className="block w-full" />
        </div>
      </div>
      <div id="wake_up_button" className="hidden">おはようボタン</div>
    </>
  )
})