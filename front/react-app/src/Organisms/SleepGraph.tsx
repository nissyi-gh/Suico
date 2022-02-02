import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { timeConverterForNumber } from '../Functions/Functions';
import { memo } from 'react';
import { SleepLogListItem } from '../types/types';
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

export const SleepGraph = memo(({ sleepLogs } : { sleepLogs: SleepLogListItem[] } ): JSX.Element => {
  // 1時などは25時として計算する。
  // memo化で破壊的変更ができないためsliceで複製する。
  const logs = sleepLogs.slice().reverse().map((log) => {
    return {
      date: log.wakeAt.format("MM/DD"),
      起床時刻: timeConverterForNumber(log.wakeAt.hour(), log.wakeAt.minute()),
      就寝時刻: timeConverterForNumber(log.sleepAt.hour(), log.sleepAt.minute()),
      満足度: log.satisfaction
    }
  });

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
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
        <YAxis yAxisId={2} orientation="right" label={{ value: "満足度", angle: -90, dx: 12 }} domain={[0, 5]} />
        <Tooltip />
        <Legend />
        <Line type="monotone" yAxisId={2} dataKey="満足度" stroke="#82ca9d" strokeWidth={1.5} />
        <Line type="monotone" yAxisId={1} dataKey="起床時刻" stroke="#8884d8" activeDot={{ r: 8 }} strokeWidth={3} />
        <Line type="monotone" yAxisId={1} dataKey="就寝時刻" stroke="#fcca9d"  strokeWidth={3} />
      </LineChart>
    </ResponsiveContainer>
  );
})