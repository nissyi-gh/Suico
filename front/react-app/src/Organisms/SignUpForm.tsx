// import axios from "axios";
// import { useState } from "react";
import { inputWithLabel, submitButton } from "../Molecules/Form";

// type LoginUserData = {
//   email: string,
//   password: string
// }

export const SignUpForm = (hideModalFunction: () => void): JSX.Element => {
  // const [session, setValues] = useState<LoginUserData>({
  //   email: "",
  //   password: ""
  // })

  return(
    <>
      <div className="flex justify-between">
        <h2 className="text-xl inline-block">新規登録フォーム</h2>
        <button onClick={ hideModalFunction } className="inline-block">閉じる</button>
      </div>
      <form className="border-2 border-white bg-amber-100">
        { inputWithLabel("お名前", "text", "name", "input_name") }
        { inputWithLabel("Email", "email", "email", "input_email") }
        { inputWithLabel("パスワード", "password", "password", "input_password") }
        { inputWithLabel("パスワード再確認", "password", "password_confirmation", "input_password") }
        { submitButton("登録する") }
      </form>
      <ul id="form_error"></ul>
    </>
  )
}