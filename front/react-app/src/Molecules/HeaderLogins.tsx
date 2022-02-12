import { useState, useContext } from "react";
import { LoginContext } from "../providers/LoginFlagProvider";
import { linkAtom, buttonAtom } from "../Atoms/form";
import { LoginModal } from "../Organisms/LoginModal";
import { SignUpModal } from "../Organisms/SignUpModal";
import axios from "axios";
import { delete_session, new_session, sleepLogsURL } from "../constants/urls";
import { GUEST_USER_DATA } from "../constants/constants";
import { AlarmModal } from "../Pages/AlarmModal";
import { showAlarmContext } from "../providers/ShowAlarmFlagProvider";
import { HeaderButtonSmall } from "./HeaderButton";
import { useNavigate } from "react-router-dom";

export const HerderLogins = (): JSX.Element => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  // const [showAlarmModal, setShowAlarmModal] = useState<boolean>(false);
  const { loginFlag, setLoginFlag } = useContext(LoginContext);
  const { showAlarmFlag, setShowAlarmFlag } = useContext(showAlarmContext);
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
    axios.post(new_session, {
      email: GUEST_USER_DATA.EMAIL,
      password: GUEST_USER_DATA.PASSWORD
    }, { withCredentials: true })
    .then(res => {
      console.log(res);
      setLoginFlag(true);
      navigate(sleepLogsURL);
    })
    .catch(e => console.log(e));
  }

  return (
    <>
      { showLoginModal ? <LoginModal onClick={ hideLoginModal } /> : <></> }
      { showSignUpModal ? <SignUpModal onClick={ hiddenSignUpModal } /> : <></> }
      { showAlarmFlag ? <AlarmModal onClick={ hiddenAlarmModal } /> : <></> }
      { loginFlag ? <>
          <div className="border-2 border-gray-400 bg-sky-100 p-2 h-full w-64 flex items-center justify-around">
            { buttonAtom("アラーム", "", openAlarmModal) }
            <div>
              { buttonAtom("ログアウト", "", clickLogout) }
              { linkAtom("#", "通知", "block") }
            </div>
          </div>
        </> : <>
          <div className="border-2 border-gray-400 bg-sky-100 p-2 h-full w-96 flex items-center justify-around">
            { HeaderButtonSmall("ゲストログイン", "", guestLogin) }
            { HeaderButtonSmall("新規登録", "", openSignUpModal) }
            { HeaderButtonSmall("ログイン", "", openLoginModal) }
          </div>
        </>}
    </>
  )
}