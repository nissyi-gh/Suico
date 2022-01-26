import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'Page A',
    睡眠時間: 2000
  },
  {
    name: 'Page B',
    睡眠時間: 2300
  },
  {
    name: 'Page C',
    睡眠時間: 2300
  },
  {
    name: 'Page D',
    睡眠時間: 2100
  },
  {
    name: 'Page E',
    睡眠時間: 22000
  },
  {
    name: 'Page F',
    睡眠時間: 2700
  },
  {
    name: 'Page G',
    睡眠時間: 2800
  },
];

export const Graph = () => {
  // render() {
    return (
      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="睡眠時間" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
