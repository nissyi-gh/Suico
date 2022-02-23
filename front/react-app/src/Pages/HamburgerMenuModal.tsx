import { HamburgerMenu } from "../Organisms/HamburgerMenu"
import { Modal } from "../Templates/Modal"

export const HamburgerMenuModal = (props: { hiddenModalFunction: () => void }): JSX.Element => {
  return(
    <>
      { Modal(HamburgerMenu(props.hiddenModalFunction), 'gray') }
    </>
  )
}