import { AboutSection } from "../Molecules/AboutSection"
import { MainContentInner } from "../Templates/MainContentInner"

const HomeContent = (): JSX.Element => {
  return <>
    {
      AboutSection("Welcome to Suico", "Suicoは睡眠を記録・管理するためWebアプリケーションです。睡眠を記録してグラフ化したり、アラームプリセットを作成することができます。")
    }
  </>
}

export const Home = (): JSX.Element => {
  return(
    <MainContentInner content={ HomeContent() } />
  )
}