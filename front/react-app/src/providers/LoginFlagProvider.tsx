import axios from "axios";
import { ReactElement, createContext, useState, useEffect } from "react";
import { loggedIn } from '../constants/urls';

export const LoginContext =  createContext({} as {
  loginFlag: boolean,
  setLoginFlag: React.Dispatch<React.SetStateAction<boolean>>;
});


export const LoginFlagProvider: React.FC = ({ children }): ReactElement => {
  const [loginFlag, setLoginFlag] = useState<boolean>(false);

  // リロード時に読み込ませる
  useEffect(() => {
    console.log("更新時のログイン状態を確認します");
    axios.get(loggedIn, { withCredentials: true })
      .then(() => {
        setLoginFlag(true);
        console.log("ログインしています");
      })
      .catch(() => {
        // loginFlagはリロード時にFalseになる
        console.log("ログインしていません");
      });
  }, [])

  return (
    <LoginContext.Provider value={ { loginFlag, setLoginFlag } }>
      { children }
    </LoginContext.Provider>
  )
}