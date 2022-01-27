import axios from "axios";
import { useState, useContext, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { inputWithLabel, submitButton, inputCheckBox } from "../Molecules/Form";
import { LoginContext } from "../providers/LoginFlagProvider";
import { new_session, sleepLogsURL } from "../constants/urls";
import { REQUEST_STATE } from '../constants/constants';

type LoginUserData = {
  email: string,
  password: string,
  remember_me: boolean
}

export const LoginForm = (hideModalFunction: () => void): JSX.Element => {
  const [session, setValues] = useState<LoginUserData>({
    email: "",
    password: "",
    remember_me: false
  })
  const { setLoginFlag } = useContext(LoginContext);
  const [request, setRequest] = useState(REQUEST_STATE.INITIAL);
  const navigate = useNavigate();

  const resetErrors = () => {
    const formError = document.getElementById("form_error") as HTMLUListElement;
    
    while (formError.firstChild) {
      formError.removeChild(formError.firstChild);
    }
  }

  useEffect(() => {
    if (session.email && session.password) {
      axios.post(new_session, { session }, { withCredentials: true })
      .then(response => {
        console.log(response);
        setRequest(REQUEST_STATE.OK);
      })
      .catch(error => {
        console.log(error);
        // setErrorOther("メールアドレスとパスワードの組合わせが正しくありません。");
        submitDisabledReturn();
        setRequest(REQUEST_STATE.INITIAL);
      })
    }
  }, [session])
  
  const whenSuccessLogin = useCallback(
    () => {
      setLoginFlag(true);
      hideModalFunction();
      navigate(sleepLogsURL);
    }, [hideModalFunction, navigate, setLoginFlag]);

  // Loginに成功したらModalを閉じる。
  useEffect(() => {
    if (request === REQUEST_STATE.OK) {
      whenSuccessLogin();
    }
  }, [request, whenSuccessLogin])

  // 送信ボタンを連打させないようにする。
  const submitDisabledReturn = () => {
    const submit = document.getElementById("submit") as HTMLInputElement;
    submit.disabled =  submit.disabled ? false : true;
  }

  // 入力したユーザーデータが正常ならtrueを返す。
  const sessionDataValidation = (email:string, password: string): boolean => {
    const formError = document.getElementById("form_error") as HTMLUListElement;
    const DEFAULT_PASSWORD_LENGTH: number = 8;
    const DEFAULT_EMAIL_LENGTH: number = 255;
    const errorMessages: string[] = [];
    let postFlag = false;
    
    // Emailのバリデーション
    if (!email) {
      errorMessages.push("Emailアドレスを入力してください。");
    } else if (email.length > DEFAULT_EMAIL_LENGTH) {
      errorMessages.push(`Emailアドレスは${DEFAULT_EMAIL_LENGTH}文字以下です。`);
    }
    
    // passwordのバリデーション
    if (password.length > DEFAULT_EMAIL_LENGTH) {
      errorMessages.push(`パスワードは${DEFAULT_PASSWORD_LENGTH}文字以上です。`);
    } else if (!password) {
      errorMessages.push(`パスワードを入力してください。`);
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

   // ログインボタンがクリックされたときの動作
  const loginButtonClick = (event: React.FormEvent<HTMLInputElement>) => {
    const inputEmail: string = (document.getElementById("input_email") as HTMLInputElement).value;
    const inputPassword:string = (document.getElementById("input_password") as HTMLInputElement).value;
    const inputRememberMe:boolean = (document.getElementById("input_remember_me") as HTMLInputElement).checked;
    
    // 画面遷移を防ぐ
    event.preventDefault();

    resetErrors();
    if (sessionDataValidation(inputEmail, inputPassword) === false) {
      return ;
    }

    setValues({
      email: inputEmail,
      password: inputPassword,
      remember_me: inputRememberMe
    });

    submitDisabledReturn();
  }



  return(
    <>
      <div className="flex justify-between">
        <h2 className="text-xl inline-block">ログインフォーム</h2>
        <button onClick={ hideModalFunction } className="inline-block">閉じる</button>
      </div>
      <form className="border-2 border-white bg-amber-100">
        { inputWithLabel("Email", "email", "email", "input_email") }
        { inputWithLabel("パスワード", "password", "password", "input_password") }
        { inputCheckBox("ログイン状態を保存する", "remember_me", "input_remember_me")}
        { submitButton("ログイン", loginButtonClick) }
      </form>
      <ul id="form_error"></ul>
    </>
  )
}