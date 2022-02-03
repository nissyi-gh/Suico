import { buttonAtom } from "../Atoms/form"

export const HeaderButtonSmall = (text: string, css: string, onClickFunction: () => void) => {
  return (
    <div className="border border-black p-2 bg-gray-300">
      { buttonAtom(text, css, onClickFunction) }
    </div>
  )
}