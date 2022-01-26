import { useState } from "react";
import { linkAtom, buttonAtom } from "../Atoms/form";
import { LoginModal } from "../Pages/LoginModal";

export const HerderLogins = (): JSX.Element => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);

  const openLoginModal = (): void => {
    setShowLoginModal(true);
  }

  const hideLoginModal = (): void => {
    setShowLoginModal(false);
  }

  return (
    <div className="border-2 border-gray-400 p-2">
      <div className="flex">
        { showLoginModal ? <LoginModal onClick={ hideLoginModal } /> : <></> }
        { buttonAtom("ログイン", openLoginModal) }
        <div>
          { linkAtom("#", "ログアウト", "block") }
          { linkAtom("#", "通知", "block") }
        </div>
      </div>
    </div>
  )
}