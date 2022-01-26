import { inputAtom } from "../Atoms/form"

export const inputWithLabel = (itemName: string, type: string, name: string, id: string, defaultValue?: string): JSX.Element => {
  const inputCss: string = "border border-gray-600";

  return (
    <>
      <label htmlFor={ id } className="block py-2">
        { itemName }
        { inputAtom(type, name, id, inputCss ,defaultValue) }
      </label>
    </>
  )
}