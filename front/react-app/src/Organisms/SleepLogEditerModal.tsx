import { SignUpForm } from "./SignUpForm";
import { Modal } from "../Templates/Modal";

export const SleepLogEditerModal = (props: { onClick: () => void }): JSX.Element => {
  return (
    <>
      { Modal(SignUpForm(props.onClick), 'gray') }
    </>
  )
}