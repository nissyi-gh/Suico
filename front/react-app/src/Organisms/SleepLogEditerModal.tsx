import { SleepLogEditForm } from "./SleepLogEditForm";
import { Modal } from "../Templates/Modal";

export const SleepLogEditerModal = ({ hideModalFunction, id } : { hideModalFunction: () => void, id: number }): JSX.Element => {
  return (
    <>
      { Modal(SleepLogEditForm({ hideModalFunction, id }), 'gray') }
    </>
  )
}