import { AboutSection } from "../Molecules/AboutSection"
import { MainContentInner } from "../Templates/MainContentInner"

const HomeContent = (): JSX.Element => {
  return <>
    {
      AboutSection("Welcome to Suico", "Suicoは睡眠を記録・管理するためWebアプリケーションです。睡眠を記録してグラフ化したり、アラームプリセットを作成することができます。")
    }
    <p className="border border-red-500">上記コンテンツのアクセスにはログインが必要です。ページ上部からログイン、または新規登録をお願いします。</p>
  </>
}

export const Home = (): JSX.Element => {
  return(
    <MainContentInner content={ HomeContent() } />
  )
}