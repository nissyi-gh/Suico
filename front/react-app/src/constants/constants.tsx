import { RequestState } from "../types/types"

export const REQUEST_STATE: RequestState = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  OK: 'OK',
  FAILED: 'FAILED'
}

export const ALARM_STATE = {
  READY: 'READY',
  SLEEP: 'SLEEP',
  TASK: 'TASK',
  WAKE: 'WAKE'
}