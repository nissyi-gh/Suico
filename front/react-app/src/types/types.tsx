import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

export type User = {
  id: number,
  name: string,
  email: string
}

export type NewUserData = {
  name: string,
  email: string,
  password: string,
  password_confirmation: string
}

export type calculateProblem = {
  leftNumber: number | undefined,
  type: number | undefined,
  rightNumber: number | undefined,
  answer: number | undefined
}

export type SleepLog = {
  created_at: string,
  id: number,
  satisfaction: number,
  sleep_at: string,
  updated_at: string,
  user_id: number,
  wake_at: string,
  sleep_time: string
}

export type RequestState = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  OK: 'OK',
  FAILED: 'FAILED'
}

export type SleepLogListItem = {
  sleepLogId: string, 
  wakeAt: dayjs.Dayjs,
  sleepAt: dayjs.Dayjs,
  satisfaction: number,
  sleepTime?: string,
}

export type sleepLogsData = {
  satisfaction: number,
  wakeAtAverage: string,
  sleepInAverage: string,
  sleepAverage: string,
  sleepMax: string,
  sleepMin: string
}

export type AlarmPreset = {
  id: number,
  preset_name: string,
  wake_at: dayjs.Dayjs,
  task: number
}

export type AlarmPresetsListItemType = {
  id: number | undefined,
  presetName: string,
  wakeAt: dayjs.Dayjs | undefined,
  task: number | undefined
}