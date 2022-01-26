import { inputAtom } from "../Atoms/form"

export const inputWithLabel = (itemName: string, type: string, name: string, id: string, defaultValue?: string): JSX.Element => {
  const inputCss: string = "border border-gray-600";
  const labelCss: string = "w-36 inline-block";

  return (
    <>
      <div className="p-2">
        <label htmlFor={ id } className={ labelCss }>{ itemName }</label>
        { inputAtom(type, name, id, inputCss, defaultValue) }
      </div>
    </>
  )
}