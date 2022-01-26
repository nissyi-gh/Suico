import axios from "axios";
import { useState } from "react";
import { inputWithLabel, submitButton } from "../Molecules/Form";

type LoginUserData = {
  email: string,
  password: string
}

export const LoginForm = (hideModalFunction: () => void): JSX.Element => {
  const [session, setValues] = useState<LoginUserData>({
    email: "",
    password: ""
  })

  return(
    <>
      <div className="flex justify-between">
        <h2 className="text-xl inline-block">ログインフォーム</h2>
        <button onClick={ hideModalFunction } className="inline-block">閉じる</button>
      </div>
      <form className="border-2 border-white bg-amber-100">
        { inputWithLabel("Email", "email", "email", "input_email") }
        { inputWithLabel("パスワード", "password", "password", "input_password") }
        { submitButton("ログイン") }
      </form>
      <ul id="form_error"></ul>
    </>
  )
}