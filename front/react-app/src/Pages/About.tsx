import { AboutSection } from "../Molecules/AboutSection"
import { MainContentInner } from "../Templates/MainContentInner"

const AboutContent = (): JSX.Element => {
  return (
    <>
      { AboutSection("Suicoとは?", 
        "日々の睡眠を記録し、グラフ化やデータ化することで睡眠の悩みを改善するために作成したWebアプリです"
      ) }
      <section className="mb-16 leading-relaxed">
        <h1 className="text-xl border-b-2 mb-2 pb-2 border-b-black dark:border-b-gray-200">日本は世界有数の睡眠不足大国!?</h1>
        <p className="mb-4">以下の記事では、日本の睡眠不足の実態が紹介されています。</p>
        <p className="mb-4">
          <a href="https://www.asahi.com/edua/article/14412470" className="border-b border-gray-400">「日本人の7割が睡眠不足？ 親子で知りたい、睡眠のリズムを整えるコツ - 朝日新聞EduA」</a>
        </p>
        <p>記事の中でも触れられていますが、日本人の間違った感覚として「睡眠不足でも頑張る人はかっこいい」と思われている風潮があると思います。（恥ずかしながら私もそう思っていた時期がありました。）</p>
        <p>しかし、実際には大きく生産性を落とし、健康を損なうだけで長期的に見たらメリットがない行為なのです。</p>
      </section>
      { AboutSection("睡眠の大事さ", "作者は以前、鉄道会社で運転士として勤務していました。鉄道会社の勤務は泊まりを伴う長時間勤務で、終電や始発から電車を動かすために3〜4時間の仮眠をとり、睡眠不足に耐えながら安全輸送を完遂する必要がありました。その中で、睡眠がいかに重要なのか気づく事ができるようになりました。") }
      {/* <img src="sheep_dark.png" alt="Sheep"/> */}
    </>
  )
}

export const About = (): JSX.Element => {
  return (
    <MainContentInner content={ AboutContent() } />
  )
}