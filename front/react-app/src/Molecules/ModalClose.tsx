import { VscChromeClose } from "react-icons/vsc";

export const ModalClose = ( hideModalFunction: () => void, title: string): JSX.Element => {
  return (
    <div className="flex justify-between mb-2 tracking-wide">
        <h2 className="text-xl inline-block">{ title }</h2>
        <div className="flex items-center justify-center mr-2 dark:text-gray-100 cursor-pointer">
          <VscChromeClose onClick={ hideModalFunction } />
        </div>
    </div>
  )
}