import { Modal } from "../Templates/Modal";
import { LoginForm } from "./LoginForm";

export const LoginModal = (props: { onClick: () => void }): JSX.Element => {
  return (
    <>
      { Modal(LoginForm(props.onClick), 'gray') }
    </>
  )
}