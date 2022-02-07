
import { Satisfactionselector } from "../Molecules/Form";
import { ModalClose } from "../Molecules/ModalClose";
import { SleepLogListItem } from "../types/types";

export const SleepLogEditForm = ({ hideModalFunction, log } : { hideModalFunction: () => void, log: SleepLogListItem }): JSX.Element => {
  console.log(log);

  return(
    <>
      { ModalClose(hideModalFunction, `睡眠ログ編集フォーム （ID: ${ log.sleepLogId }）`)}
      <form className="border-2 border-white bg-amber-100 p-4 flex justify-center">
        <div className="w-5/6">
          { Satisfactionselector(log.satisfaction) }
        </div>
      </form>
      <ul id="form_error"></ul>
    </>
  )
}