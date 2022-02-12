import { MainContentInner } from "../Templates/MainContentInner"

const ContactContent = (): JSX.Element => {
  return (
    <p>お問い合わせページ</p>
  )
}

export const Contact = (): JSX.Element => {
  return <MainContentInner content={ ContactContent() } />
}