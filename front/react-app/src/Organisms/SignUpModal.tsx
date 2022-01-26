import { SignUpForm } from "./SignUpForm";
import { Modal } from "../Templates/Modal";

export const SignUpModal = (props: { onClick: () => void }): JSX.Element => {
  return (
    <>
      { Modal(SignUpForm(props.onClick)) }
    </>
  )
}