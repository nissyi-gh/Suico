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
