import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GUEST_USER_DATA } from "../constants/constants";
import { createGuestUser, new_session, sleepLogsURL } from "../constants/urls";
import { AboutSection } from "../Molecules/AboutSection"
import { LoginModal } from "../Organisms/LoginModal";
import { SignUpModal } from "../Organisms/SignUpModal";
import { LoginContext } from "../providers/LoginFlagProvider";
import { MainContentInner } from "../Templates/MainContentInner"

const HomeContent = (): JSX.Element => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [guestLoginText, setGuestLoginText] = useState<string>("ゲストログイン");
  const { setLoginFlag } = useContext(LoginContext);
  const navigate = useNavigate();

  const openSignUpModal = (): void => {
    setShowSignUpModal(true);
  }

  const hiddenSignUpModal = (): void => {
    setShowSignUpModal(false);
  }

  const openLoginModal = (): void => {
    setShowLoginModal(true);
  }

  const hiddenLoginModal = (): void => {
    setShowLoginModal(false);
  }

  const guestLogin = () => {
    const guestLoginButton = document.getElementById('guest_login_button');
    guestLoginButton?.classList.add('select-none');
    setGuestLoginText('ログイン中…');
    
    axios.get(createGuestUser)
    .then(res => {
      const guestEmail: string = res.data.email;
      
      axios.post(new_session, {
        email: guestEmail,
        password: GUEST_USER_DATA.PASSWORD,
      }, { withCredentials: true })
      .then(() => {
        guestLoginButton?.classList.remove('select-none');
        setGuestLoginText('ゲストログイン');
        setLoginFlag(true);
        navigate(sleepLogsURL);
      })
      .catch(e => {
        console.log(e)
        guestLoginButton?.classList.remove('select-none');
        setGuestLoginText('ゲストログイン');
      });
    })
    .catch(e => {
      console.log(e)
      guestLoginButton?.classList.remove('select-none');
      setGuestLoginText('ゲストログイン');
    });
  }

  return <>
    { showLoginModal && <LoginModal onClick={ hiddenLoginModal } /> }
    { showSignUpModal && <SignUpModal onClick={ hiddenSignUpModal } /> }

    <button className="w-full border border-gray-700 py-2 mb-2 rounded-md bg-gray-200 dark:bg-gray-500 lg:hidden" onClick={ openSignUpModal }>
      新規登録
    </button>
    <button className="w-full border border-gray-700 py-2 mb-2 rounded-md bg-gray-200 dark:bg-gray-500 lg:hidden" onClick={ openLoginModal }>
      ログイン
    </button>
    <button id="guest_login_button" className="w-full border border-gray-700 py-2 mb-8 rounded-md bg-gray-200 dark:bg-gray-500 lg:hidden" onClick={ guestLogin }>
      { guestLoginText }
    </button>
    <p className="border-2 border-red-300 dark:border-gray-200 bg-red-50 dark:bg-gray-500 rounded-md mb-8 p-4">
      コンテンツのアクセスにはログインが必要です。ログイン、または新規登録をお願いします。<br></br>ご登録されたくない場合は、ゲスト会員機能でログインできます。ゲスト会員様は、一部機能に制限を設けさせていただいております。
    </p>
    {
      AboutSection("Welcome to Suico", "Suicoは睡眠を記録・管理するためWebアプリケーションです。睡眠を記録して可視化したり、アラームプリセットを作成することができます。睡眠の改善にお役立てください。")
    }
  </>
}

export const Home = (): JSX.Element => {
  return(
    <MainContentInner content={ HomeContent() } />
  )
}