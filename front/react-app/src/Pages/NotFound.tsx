import { MainContentInner } from "../Templates/MainContentInner"

const NotFoundContent = (): JSX.Element => {
  return(
    <p>ページが存在しません。</p>
  )
}

export const NotFound = (): JSX.Element => {
  return <MainContentInner content={ NotFoundContent() } />
}