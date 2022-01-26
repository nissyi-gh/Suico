import { inputWithLabel } from "../Molecules/Form"

export const LoginForm = (hideModalFunction: () => void): JSX.Element => {
  return(
    <>
      <div className="flex justify-between">
        <h2 className="text-xl inline-block">ログインフォーム</h2>
        <button onClick={ hideModalFunction } className="inline-block">閉じる</button>
      </div>
      <form className="border-2 border-white bg-amber-100">
        { inputWithLabel("Email", "email", "email", "input_email")}
        { inputWithLabel("パスワード", "password", "password", "input_password")}
      </form>
      <ul id="form_error"></ul>
    </>
  )
}