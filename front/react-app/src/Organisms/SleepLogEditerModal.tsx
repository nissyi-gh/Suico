import { SleepLogEditForm } from "./SleepLogEditForm";
import { Modal } from "../Templates/Modal";
import { SleepLogListItem } from "../types/types";

export const SleepLogEditerModal = ({ hideModalFunction, log } : { hideModalFunction: () => void, log: SleepLogListItem }): JSX.Element => {
  return (
    <>
      { Modal(SleepLogEditForm({ hideModalFunction, log}), 'gray') }
    </>
  )
}