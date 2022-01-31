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