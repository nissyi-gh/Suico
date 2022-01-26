import axios from "axios";
import { useState, useEffect, useCallback } from "react";
import { inputWithLabel, submitButton } from "../Molecules/Form";
import { NewUserData } from "../types/types";
import { userCreate } from "../urls";

export const SignUpForm = (hideModalFunction: () => void): JSX.Element => {
  const [user, setValues] = useState<NewUserData>({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

  const userDataEmptyCheck = useCallback(
    () => {
      return (user.name && user.email && user.password && user.password_confirmation) ? true : false
    },
  [user]);
    

  // userに必要な情報が送信されたら、非同期通信を行う。
  useEffect(() => {
    if (userDataEmptyCheck()) {
      axios.post(userCreate, { user }, { withCredentials: true })
        .then(response => {
          console.log(response);
          setValues({
            name: "",
            email: "",
            password: "",
            password_confirmation: ""
          });
          hideModalFunction();
        })
        .catch(error => {
          console.log(error);
          // setErrorOther("このメールアドレスは使用できません。");
          submitDisabledReturn();
        })
    }
  }, [user, userDataEmptyCheck, hideModalFunction])

 // 入力したユーザーデータが正常ならtrueを返す。
  const userDataValidation = (name: string, email:string, password: string, passwordConfirm: string): boolean => {
    const formError = document.getElementById("form_error") as HTMLUListElement;
    const DEFAULT_NAME_LENGTH: number = 50;
    const DEFAULT_PASSWORD_LENGTH: number = 8;
    const DEFAULT_EMAIL_LENGTH: number = 255;
    const errorMessages: string[] = [];
    let postFlag = false;
    
    // nameのバリデーション
    if (name === "") {
      errorMessages.push("名前を入力してください。");
    } else if (name.length > DEFAULT_NAME_LENGTH) {
      errorMessages.push(`名前は${DEFAULT_NAME_LENGTH}文字以下で設定してください。`)
    }

    // Emailのバリデーション
    if (!email) {
      errorMessages.push("Emailアドレスを入力してください。");
    } else if (email.length > DEFAULT_EMAIL_LENGTH) {
      errorMessages.push(`Emailアドレスは${DEFAULT_EMAIL_LENGTH}文字以下です。`);
    }

    // passwordのバリデーション
    if (password.length < DEFAULT_PASSWORD_LENGTH) {
      errorMessages.push(`パスワードは${DEFAULT_PASSWORD_LENGTH}文字以上です。`);
    } else if (!password) {
      errorMessages.push('パスワードを入力してください');
    } else if (!passwordConfirm) {
      errorMessages.push('再確認用パスワードを入力してください');
    } else if (password !== passwordConfirm) {
      errorMessages.push('パスワードが異なります。');
    }

    // エラーがなければpostFlagを立てる
    if (!errorMessages.length) {
      postFlag = true;
    } else {
      errorMessages.forEach((message) => {
        const listItem: HTMLLIElement = document.createElement('li');

        listItem.textContent = message;
        formError.append(listItem);
      })
    }
    
    return postFlag;
  }


  // ボタンの連打を防ぐためにDisabledの状態を変更する
  const submitDisabledReturn = () => {
    const submit = document.getElementById("submit") as HTMLInputElement;
    submit.disabled =  submit.disabled ? false : true
  }

  // フォームに表示したエラーを消去
  const resetErrors = () => {
    const formError = document.getElementById("form_error") as HTMLUListElement;
    
    while (formError.firstChild) {
      formError.removeChild(formError.firstChild);
    }
  }


  const submitClick = (event: React.FormEvent<HTMLInputElement>) => {
    const inputName: string = (document.getElementById("input_name") as HTMLInputElement).value;
    const inputEmail: string = (document.getElementById("input_email") as HTMLInputElement).value;
    const inputPassword:string = (document.getElementById("input_password") as HTMLInputElement).value;
    const inputPasswordConfirm: string = (document.getElementById("input_password_confirm") as HTMLInputElement).value;
    
    event.preventDefault();

    resetErrors();
    if (userDataValidation(inputName, inputEmail, inputPassword, inputPasswordConfirm) === false) {
      return ;
    }

    setValues({
      name: inputName,
      email: inputEmail,
      password: inputPassword,
      password_confirmation: inputPasswordConfirm
    });

    submitDisabledReturn();
  };


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
        { inputWithLabel("パスワード再確認", "password", "password_confirmation", "input_password_confirm") }
        { submitButton("登録する", submitClick) }
      </form>
      <ul id="form_error"></ul>
    </>
  )
}