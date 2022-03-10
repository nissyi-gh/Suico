import { RequestState } from "../types/types"

export const REQUEST_STATE: RequestState = {
  INITIAL: 'INITIAL',
  LOADING: 'LOADING',
  OK: 'OK',
  FAILED: 'FAILED'
}

export const GUEST_USER_DATA = {
  EMAIL: 'guest.user@guest.com',
  PASSWORD: 'guestuser'
}

export const ALARM_STATE = {
  READY: 'READY',
  SLEEP: 'SLEEP',
  TASK: 'TASK',
  WAKE: 'WAKE'
}

export const satisfactions = {
  NULL: {
    NUMBER: null,
    CHARACTER: "-"
  },
  BAD: {
    NUMBER: 0.0, 
    CHARACTER: "X"
  },
  SOSO: {
    NUMBER: 1.25, 
    CHARACTER: "△"
  },
  GOOD: {
    NUMBER: 2.5, 
    CHARACTER: "◯"
  },
  BETTER: {
    NUMBER: 3.75, 
    CHARACTER: "◎"
  },
  BEST: {
    NUMBER: 5.0, 
    CHARACTER: "☆"
  },
}