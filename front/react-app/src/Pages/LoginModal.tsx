import { Modal } from "../Templates/Modal";
import { LoginForm } from "../Organisms/LoginForm";

export const LoginModal = (props: { onClick: () => void }): JSX.Element => {
  return (
    <>
      { Modal(LoginForm(props.onClick)) }
    </>
  )
}