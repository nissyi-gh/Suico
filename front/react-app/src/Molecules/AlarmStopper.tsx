import { memo, useCallback, useEffect, useState } from "react";
import { calculateProblem } from '../types/types';
import { problemTypeConverter, setCalclationProblems } from "../Functions/Tasks/Calculate";
import { hiddenTaskField, showTaskField, showWakeUpButton } from "../Functions/Alarm";
// Day.js
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

type propsFunctions = {
  alarm: dayjs.Dayjs,
  task: number | undefined,
  alarmLeftTime: string | undefined, 
}

export const AlarmStopper = memo(({ alarm, task, alarmLeftTime }: propsFunctions): JSX.Element => {
  const [taskLeft, setTaskLeft] = useState<number>(task === 0 ? 0 : 10);
  const [problem, setProblem] = useState<calculateProblem>({
    leftNumber: 0,
    type: 0,
    rightNumber: 0,
    answer: 0
  });
  console.log(taskLeft)
  console.log(problem)

  const createTask = useCallback(() => {
    task === 1 ? setCalclationProblems(setProblem) : console.log(2);
  }, [task]);

  useEffect(() => {
    if (taskLeft) createTask();
  }, [taskLeft, createTask])

  useEffect(() => {
    if(alarmLeftTime === "00:00:00") {
      showTaskField();

      if (!taskLeft) {
        showWakeUpButton();
        hiddenTaskField();
      }
    }
  }, [taskLeft, alarmLeftTime])

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
            <span id="question_left">{ problem.leftNumber }</span>
            <span id="manipulate_type">{ problemTypeConverter(problem.type) }</span>
            <span id="question_right">{ problem.rightNumber }</span>
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
      <button onClick={ () => { setTaskLeft(taskLeft - 1)} } className="border bg-orange-50">へらすんご</button>
      <div id="wake_up_button" className="hidden">おはようボタン</div>
    </>
  )
})