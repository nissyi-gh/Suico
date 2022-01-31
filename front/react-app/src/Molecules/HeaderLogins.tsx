import { useState, useContext } from "react";
import { LoginContext } from "../providers/LoginFlagProvider";
import { linkAtom, buttonAtom } from "../Atoms/form";
import { LoginModal } from "../Organisms/LoginModal";
import { SignUpModal } from "../Organisms/SignUpModal";
import axios from "axios";
import { delete_session } from "../constants/urls";
import { AlarmModal } from "../Pages/AlarmModal";

export const HerderLogins = (): JSX.Element => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);
  const [showAlarmModal, setShowAlarmModal] = useState<boolean>(false);
  const { loginFlag, setLoginFlag } = useContext(LoginContext);

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
    setShowAlarmModal(true);
  }

  const hiddenAlarmModal = (): void => {
    setShowAlarmModal(false);
  }

  const clickLogout = () => {
    axios.delete(delete_session , { withCredentials: true })
      .then(response => {
        setLoginFlag(false);
        console.log(response)
      })
      .catch(error => console.log(error))
  }

  return (
    <div className="border-2 border-gray-400 p-2">
      <div className="flex">
        { showLoginModal ? <LoginModal onClick={ hideLoginModal } /> : <></> }
        { showSignUpModal ? <SignUpModal onClick={ hiddenSignUpModal } /> : <></> }
        { showAlarmModal ? <AlarmModal onClick={ hiddenAlarmModal } /> : <></> }
        { loginFlag ? <>
          { buttonAtom("アラーム", "", openAlarmModal) }
          <div>
            { buttonAtom("ログアウト", "", clickLogout) }
            { linkAtom("#", "通知", "block") }
          </div>
        </> : <>
          { buttonAtom("新規登録", "", openSignUpModal) }
          { buttonAtom("ログイン", "", openLoginModal) }
        </>}
      </div>
    </div>
  )
}