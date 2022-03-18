import { useState, useContext } from "react";
import { LoginContext } from "../providers/LoginFlagProvider";
import { LoginModal } from "../Organisms/LoginModal";
import { SignUpModal } from "../Organisms/SignUpModal";
import axios from "axios";
import { createGuestUser, delete_session, new_session, notificationURL, sleepLogsURL } from "../constants/urls";
import { GUEST_USER_DATA } from "../constants/constants";
import { AlarmModal } from "../Pages/AlarmModal";
import { showAlarmContext } from "../providers/ShowAlarmFlagProvider";
import { useNavigate, Link } from "react-router-dom";
import { BsAlarm, BsSun, BsMoon } from 'react-icons/bs';
import { VscBell } from 'react-icons/vsc';
import { MdLogout } from 'react-icons/md';
import { DarkModeProps } from "../types/types";

export const HerderLogins = ({ isDark, toggleDarkClassForHtml } : DarkModeProps): JSX.Element => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  // const [showAlarmModal, setShowAlarmModal] = useState<boolean>(false);
  const { loginFlag, setLoginFlag } = useContext(LoginContext);
  const { showAlarmFlag, setShowAlarmFlag } = useContext(showAlarmContext);
  const [guestLoginText, setGuestLoginText] = useState<string>("ゲストログイン");
  const navigate = useNavigate();

  const openLoginModal = (): void => {
    setShowLoginModal(true);
  }

  const hideLoginModal = (): void => {
    setShowLoginModal(false);
  }

  const openSignUpModal = (): void => {
    setShowSignUpModal(true);
  }

  const hiddenSignUpModal = (): void => {
    setShowSignUpModal(false);
  }

  const openAlarmModal = (): void => {
    setShowAlarmFlag(true);
  }

  const hiddenAlarmModal = (): void => {
    setShowAlarmFlag(false);
  }

  const clickLogout = () => {
    axios.delete(delete_session , { withCredentials: true })
      .then(response => {
        setLoginFlag(false);
        navigate('/');
        console.log(response)
      })
      .catch(error => console.log(error))
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

  return (
    <>
      { showLoginModal ? <LoginModal onClick={ hideLoginModal } /> : <></> }
      { showSignUpModal ? <SignUpModal onClick={ hiddenSignUpModal } /> : <></> }
      { showAlarmFlag ? <AlarmModal onClick={ hiddenAlarmModal } /> : <></> }
      { loginFlag ? <>
          <div className="hidden lg:flex border-2 items-center justify-around border-gray-500 bg-sky-100 dark:bg-gray-600 p-1 h-full w-96 rounded-lg">
            <button className="h-full w-32 text-lg font-semibold rounded-lg border-2 border-amber-400 dark:border-gray-400 bg-amber-100 dark:bg-gray-500 hover:bg-amber-200" onClick={ openAlarmModal } >
              アラーム<BsAlarm className="inline-block mb-1 ml-2" />
            </button>
            <div className="w-28 h-full text-center flex flex-col justify-around leading-tight">
              <button className="inline-block w-full h-2/5 border border-gray-500 dark:border-gray-400 rounded-md bg-gray-100 dark:bg-gray-500 hover:bg-gray-300" onClick={ clickLogout } >
                ログアウト<MdLogout className="inline-block mb-1 ml-1" />
              </button>
              <Link to={ notificationURL } className="inline-block w-full h-2/5 border border-gray-500 dark:border-gray-400 rounded-md bg-gray-100 dark:bg-gray-500 hover:bg-gray-300">
                通知<VscBell className="inline-block mb-1 ml-1" />
              </Link>
            </div>
            <button onClick={ toggleDarkClassForHtml } className="border-2 border-gray-400 bg-amber-100 dark:bg-inherit dark:border-gray-300 w-16 h-full rounded-md">
              { isDark ? 
                <BsSun className='text-black inline-block hover:cursor-pointer w-full h-6' />
              :
                <BsMoon className='inline-block hover:cursor-pointer w-full h-6' />
              }
            </button>
          </div>
        </> : <>
          <div className="hidden lg:flex items-center justify-around border-2 border-gray-500 bg-sky-100 dark:bg-gray-600 rounded-md p-2 h-full w-96">
            <button id="guest_login_button" className="border border-gray-500 dark:border-gray-300 bg-gray-200 rounded-md dark:bg-gray-500 p-2 cursor-pointer" onClick={ guestLogin }>{ guestLoginText }</button>
            <button className="border border-gray-500 dark:border-gray-300 bg-gray-200 rounded-md dark:bg-gray-500 p-2 cursor-pointer" onClick={ openSignUpModal }>新規登録</button>
            <button className="border border-gray-500 dark:border-gray-300 bg-gray-200 rounded-md dark:bg-gray-500 p-2 cursor-pointer" onClick={ openLoginModal }>ログイン</button>
          </div>
        </>}
    </>
  )
}