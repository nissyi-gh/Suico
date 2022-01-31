import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { timeConverterForNumber } from '../Functions/Functions';
import { memo } from 'react';
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

export const SleepGraph = memo((): JSX.Element => {
  const now = dayjs();

  const data = [
    {
      date: now.format("MM/DD"),
  
      起床時刻: timeConverterForNumber(8, 10),
      就寝時刻: timeConverterForNumber(24, 0),
      満足度: 2
    },
    {
      date: now.add(1, 'day').format("MM/DD"),
  
      起床時刻: timeConverterForNumber(7, 12),
      就寝時刻: timeConverterForNumber(23, 48),
      満足度: 4
    },
    {
      date: now.add(2, 'day').format("MM/DD"),
  
      起床時刻: timeConverterForNumber(7, 38),
      就寝時刻: timeConverterForNumber(22, 59),
      満足度: 1
    },
    {
      date: now.add(3, 'day').format("MM/DD"),
  
      起床時刻: timeConverterForNumber(6, 42),
      就寝時刻: timeConverterForNumber(23, 48),
      満足度: 3
    },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis yAxisId={1} label={{ value: "時刻", angle: -90, dx: -12 }} />
        <YAxis yAxisId={2} orientation="right" label={{ value: "満足度", angle: -90, dx: 12 }}/>
        <Tooltip />
        <Legend />
        <Line type="monotone" yAxisId={1} dataKey="起床時刻" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" yAxisId={1} dataKey="就寝時刻" stroke="#fcca9d" />
        <Line type="monotone" yAxisId={2} dataKey="満足度" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
})