import { AboutSection } from "../Molecules/AboutSection"
import { MainContentInner } from "../Templates/MainContentInner"

const HomeContent = (): JSX.Element => {
  return <>
    <p className="border-2 border-red-300 dark:border-gray-200 bg-red-50 dark:bg-gray-500 rounded-md mb-8 p-4">上記コンテンツのアクセスにはログインが必要です。ページ上部からログイン、または新規登録をお願いします。</p>
    {
      AboutSection("Welcome to Suico", "Suicoは睡眠を記録・管理するためWebアプリケーションです。睡眠を記録して可視化したり、アラームプリセットを作成することができます。睡眠の改善にお役立てください。")
    }
  </>
}

export const Home = (): JSX.Element => {
  return(
    <MainContentInner content={ HomeContent() } />
  )
}