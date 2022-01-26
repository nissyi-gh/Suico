import { useState } from "react";
import { linkAtom, buttonAtom } from "../Atoms/form";
import { LoginModal } from "../Organisms/LoginModal";
import { SignUpModal } from "../Organisms/SignUpModal";

export const HerderLogins = (): JSX.Element => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showSignUpModal, setShowSignUpModal] = useState<boolean>(false);

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

  return (
    <div className="border-2 border-gray-400 p-2">
      <div className="flex">
        { showLoginModal ? <LoginModal onClick={ hideLoginModal } /> : <></> }
        { showSignUpModal ? <SignUpModal onClick={ hiddenSignUpModal } /> : <></> }
        { buttonAtom("新規登録", "", openSignUpModal) }
        { buttonAtom("ログイン", "", openLoginModal) }
        <div>
          { linkAtom("#", "ログアウト", "block") }
          { linkAtom("#", "通知", "block") }
        </div>
      </div>
    </div>
  )
}