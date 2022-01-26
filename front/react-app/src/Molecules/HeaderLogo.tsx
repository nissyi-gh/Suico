import { linkAtom } from "../Atoms/form";

export const HeaderLogo = (): JSX.Element => {
  return (
    <>
      { linkAtom("#", "ロゴ", "") }
    </>
  )
}