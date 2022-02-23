import { memo, useCallback, useContext, useEffect, useState } from "react";
import { calculateProblem } from '../types/types';
import { problemTypeConverter, randomAnswers, setCalclationProblems } from "../Functions/Tasks/Calculate";
import { hiddenTaskField, showTaskField, showWakeUpSubmit, submitSleepLog } from "../Functions/Alarm";
import { fetchSleepLogs, getRandomIntInclusive } from "../Functions/Functions";
import { returnRandomPanels, reRenderPanleContent } from "../Functions/Tasks/Panles";
import { Satisfactionselector, submitButton } from "./Form";
import { showAlarmContext } from "../providers/ShowAlarmFlagProvider";
import { REQUEST_STATE } from "../constants/constants";
// Day.js
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { useNavigate } from "react-router-dom";
import { sleepLogsProviderContext } from "../providers/SleepLogsProvider";
dayjs.locale('ja');

type propsFunctions = {
  alarm: dayjs.Dayjs,
  task: number | undefined,
  alarmLeftTime: string | undefined,
  sleepAt: dayjs.Dayjs
}

export const AlarmStopper = memo(({ alarm, task, alarmLeftTime, sleepAt }: propsFunctions): JSX.Element => {
  const { setShowAlarmFlag } = useContext(showAlarmContext);
  const { setSleepLogs, setSleepLogsData } = useContext(sleepLogsProviderContext);
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
  const navigate = useNavigate();

  const createTask = useCallback(() => {
    task === 1 ? setCalclationProblems(setProblem) : setPanelMax(getRandomIntInclusive(5, 15));
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
        showWakeUpSubmit();
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
      selectPanel.classList.remove("text-gray-50");
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

  // 睡眠データの登録が完了したらアラームモーダルを閉じる
  const onClickWakeUpButton = async (): Promise<void> => {
    if (await submitSleepLog(sleepAt) === REQUEST_STATE.OK) {
      fetchSleepLogs(setSleepLogs, setSleepLogsData);
      navigate("/sleep_logs");
      setShowAlarmFlag(false);
    }
  }

  return (
    <>
      { !alarmLeftTime ? <>
        <div className="w-full text-center text-gray-500">
          <p className="text-3xl">アラーム読込中</p>
        </div>
        </> : <>
        <div className="border border-white flex flex-col py-6 mb-4 items-center rounded-md text-gray-100">
          <div className="w-80">
            <p className="block mb-4">
              { alarm.format('YYYY/MM/DD HH:mm') } まで
            </p>
            <p className="block text-6xl text-center">
              { alarmLeftTime }
            </p>
          </div>
          <div id="task_field" className="hidden mt-4 text-gray-100">
            { taskLeft ? <p>アラーム停止まで残り { taskLeft } 問</p> : <></> }
            { task === 1 ? <>
              <div id="calculate" className="w-80 my-0 mx-auto">
                <p className="text-2xl text-center my-4 border rounded-md">
                  <span id="question_left">{ problem.leftNumber }</span>
                  <span id="manipulate_type"> { problemTypeConverter(problem.type) } </span>
                  <span id="question_right">{ problem.rightNumber }</span>
                  <span id="question_equal">= ?</span>
                </p>
                <div id="answer">
                  <ul id="answer_buttons" className="flex items-center justify-around">
                    { answers?.map((item) => {
                      return(
                        <li key={ item } id={ item.toString() } className='inline-block border-2 text-center leading-normal text-3xl w-12 h-12 m-2 border-black text-gray-50 bg-gray-500 cursor-pointer rounded-md select-none' onClick={ () => answerCheck(item) }>{ item }</li>
                        ) 
                      })}
                  </ul>
                  <p id="answer_status"></p>
                </div>
              </div>
            </> : <>        
              <div id="panel_field" className="w-80 h-64 my-0 mx-auto">
                <ul>
                  { 
                    panels?.map((panel) => {
                      return (
                        <li key={ panel } id={ panel.toString() } className='inline-block border-2 text-center leading-normal text-3xl w-12 h-12 m-2 border-black text-gray-50 bg-gray-500 cursor-pointer rounded-md select-none'onClick={ () => panelAnswerCheck(panel) } >
                          { panel }
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            </>}
          </div>
        </div>
        <div id="wake_up_submit" className="hidden border border-white mb-4 p-4 pb-0">
          <div className="mb-4">
            <label htmlFor="satisfaction" className="inline-block w-1/3 text-center text-gray-100">
              満足度
            </label>
            { Satisfactionselector() }
          </div>
          { submitButton('起床', onClickWakeUpButton)}
        </div>
        <div className="text-right flex justify-end">
          <img src="sheep_dark.png" alt="Sheep" className="block w-1/3" />
        </div>
      </> }
    </>
  )
})