import { linkAtom } from "../Atoms/form"

export const HerderLogins = (): JSX.Element => {
  return (
    <div className="border-2 border-gray-400 p-2">
      <div className="flex">
        { linkAtom("#", "ログイン", "") }
        <div>
          { linkAtom("#", "ログアウト", "block") }
          { linkAtom("#", "通知", "block") }
        </div>
      </div>
    </div>
  )
}