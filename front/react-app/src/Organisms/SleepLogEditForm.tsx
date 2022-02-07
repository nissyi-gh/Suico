import { ModalClose } from "../Molecules/ModalClose";

export const SleepLogEditForm = ({ hideModalFunction, id } : { hideModalFunction: () => void, id: number }): JSX.Element => {

  return(
    <>
      { ModalClose(hideModalFunction, `睡眠ログ編集フォーム （ID: ${ id }）`)}
      <form className="border-2 border-white bg-amber-100 p-4 flex justify-center">
        <div className="w-5/6">
        </div>
      </form>
      <ul id="form_error"></ul>
    </>
  )
}