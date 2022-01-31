import { memo, useCallback, useEffect, useState } from "react";
import { calculateProblem } from '../types/types';
import { problemTypeConverter, randomAnswers, setCalclationProblems } from "../Functions/Tasks/Calculate";
import { hiddenTaskField, showTaskField, showWakeUpButton } from "../Functions/Alarm";
// Day.js
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { getRandomIntInclusive } from "../Functions/Functions";
import { returnRandomPanels, reRenderPanleContent } from "../Functions/Tasks/Panles";
dayjs.locale('ja');

type propsFunctions = {
  alarm: dayjs.Dayjs,
  task: number | undefined,
  alarmLeftTime: string | undefined, 
}

export const AlarmStopper = memo(({ alarm, task, alarmLeftTime }: propsFunctions): JSX.Element => {
  const [taskLeft, setTaskLeft] = useState<number>(task === 0 ? 0 : getRandomIntInclusive(1, 5));
  const [answers, setAnswers] = useState<number[] | undefined>();
  const [problem, setProblem] = useState<calculateProblem>({
    leftNumber: undefined,
    type: undefined,
    rightNumber: undefined,
    answer: undefined
  });
  const [panels, setPanels] = useState<number[]>();
  const [panelMax, setPanelMax] = useState<number>(0);
  const [panelAnswer, setPanelAnswer] = useState<number>(0);

  const createTask = useCallback(() => {
    task === 1 ? setCalclationProblems(setProblem) : setPanelMax(getRandomIntInclusive(5, 20));
  }, [task]);

  const answerCheck = (id: number): void => {
    const status = document.getElementById("answer_status") as HTMLParagraphElement;

    if(id === problem.answer) {
      status.textContent = "正解です";
      setTaskLeft(taskLeft - 1);
    } else {
      status.textContent = "答えが違います。";
    }
  }

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

  useEffect(() => {
    if(problem.answer !== undefined) {
      setAnswers(randomAnswers(problem.answer));
    }
  }, [problem.answer])

  useEffect(() => {
    setPanels(returnRandomPanels(panelMax));
    setPanelAnswer(1);
  }, [panelMax])

  const panelAnswerCheck = (panel: number): void =>  {
    if (panelAnswer === panel) {
      const selectPanel = document.getElementById(panel.toString()) as HTMLLIElement;

      selectPanel.classList.remove("cursor-pointer");
      selectPanel.classList.add("text-gray-900");
      if (panelAnswer < panelMax) {
        setPanelAnswer(panelAnswer + 1);
      } else {
        reRenderPanleContent(panelMax);
        // 一度リセットしないと、panelMaxに同じ値が代入されたときに再レンダリングされない。
        setPanelMax(0);
        setTaskLeft(taskLeft - 1);
      }
    }
  }

  const answerPanelCSS: string = "inline-block border-2 text-center w-8 h-8 m-2 border-black text-gray-50 bg-gray-500 cursor-pointer select-none"

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
        { task === 1 ? <>
          <div id="calculate" className="w-64 h-48 my-0 mx-auto">
            <p>
              <span id="question_left">{ problem.leftNumber }</span>
              <span id="manipulate_type"> { problemTypeConverter(problem.type) } </span>
              <span id="question_right">{ problem.rightNumber }</span>
              <span id="question_equal">= ?</span>
            </p>
            <div id="answer">
              <p className="border-2 bg-gray-400">解答を選んでください。</p>
              <ul id="answer_buttons" className="flex">
                { answers?.map((item) => {
                  return(
                    <li key={ item } id={ item.toString() } className={ answerPanelCSS } onClick={ () => answerCheck(item)}>{ item }</li>
                    ) 
                  })}
              </ul>
              <p id="answer_status"></p>
            </div>
          </div>
        </> : <>        
          <div id="panel_field" className="w-64 h-48 my-0 mx-auto">
            <ul>
              { 
                panels?.map((panel) => {
                  return (
                    <li key={ panel } id={ panel.toString() } className={ answerPanelCSS } onClick={ () => panelAnswerCheck(panel) } >
                      { panel }
                    </li>
                  )
                })
              }
            </ul>
          </div>
        </>}
      </div>
      <div className="text-right flex flex-end items-end">
        <div className="w-2/3"></div>
        <div className="w-1/3">
          <img src="alarm_sheep.png" alt="Sheep" className="block w-full" />
        </div>
      </div>
      <button id="wake_up_button" className="hidden border border-black w-24 bg-gray-200">おはよう</button>
    </>
  )
})