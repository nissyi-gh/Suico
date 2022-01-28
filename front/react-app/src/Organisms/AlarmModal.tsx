import { Modal } from "../Templates/Modal";
import { Alarm } from "./Alarm";

export const AlarmModal = (props: { onClick: () => void }): JSX.Element => {
  return (
    <>
      { Modal(Alarm(props.onClick)) }
    </>
  )
}