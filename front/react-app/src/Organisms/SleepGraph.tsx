import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { timeConverterForNumber } from '../Functions/Functions';
import { memo, useState } from 'react';
import { SleepLogListItem } from '../types/types';
import dayjs from "dayjs";
import "dayjs/locale/ja";
import { GraphLegend } from './GraphLegend';
dayjs.locale('ja');

export const SleepGraph = memo(({ sleepLogs } : { sleepLogs: SleepLogListItem[] } ): JSX.Element => {
  const [showSatisfaction, setShowSatisfaction] = useState<boolean>(true);
  const [showSleepIn, setShowSleepIn] = useState<boolean>(true);
  const [showWakeAt, setShowWakeAt] = useState<boolean>(true);
  const contents = ["起床時刻", "就寝時刻", "満足度"];

  const toggleSatisfaction = (): void => {
    showSatisfaction ? setShowSatisfaction(false) : setShowSatisfaction(true);
  }

  const toggleSleepIn = (): void => {
    showSleepIn ? setShowSleepIn(false) : setShowSleepIn(true);
  }

  const toggleWakeAt = (): void => {
    showWakeAt ? setShowWakeAt(false) : setShowWakeAt(true);
  }

  // 0時以降は24時~として計算する。
  // memo化で破壊的変更ができないためsliceで複製する。
  const logs = sleepLogs.slice().reverse().map((log) => {
    return {
      date: log.wakeAt.format("MM/DD"),
      起床時刻: timeConverterForNumber(log.wakeAt.hour(), log.wakeAt.minute()),
      就寝時刻: timeConverterForNumber(log.sleepAt.hour(), log.sleepAt.minute(), true),
      満足度: log.satisfaction
    }
  });

  return (
    <>
      <ResponsiveContainer width="100%" height="89%">
        <LineChart
          width={500}
          height={200}
          data={logs}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId={1} label={{ value: "時刻", angle: -90, dx: -12 }} domain={[2, 26]}/>
          <YAxis yAxisId={2} orientation="right" label={{ value: contents[2], angle: -90, dx: 12 }} domain={[0, 5]} />
          <Tooltip />
          { showSatisfaction ? <Line type="monotone" yAxisId={2} dataKey={ contents[2] } stroke="#82ca9d" strokeWidth={1.5} /> : <></> }
          { showWakeAt ? <Line type="monotone" yAxisId={1} dataKey={ contents[0] } stroke="#fcca9d" activeDot={{ r: 8 }} strokeWidth={3} /> : <></>}
          { showSleepIn ? <Line type="monotone" yAxisId={1} dataKey={ contents[1] } stroke="#8884d8"  strokeWidth={3} /> : <></>}
        </LineChart>
      </ResponsiveContainer>
      <GraphLegend contents={ contents } toggleWakeAt={ toggleWakeAt } toggleSleepIn={toggleSleepIn} toggleSatisfaction={toggleSatisfaction} />
    </>
  );
})