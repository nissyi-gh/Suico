import { AboutSection } from "../Molecules/AboutSection"
import { MainContentInner } from "../Templates/MainContentInner"

const AboutContent = (): JSX.Element => {
  return (
    <div className="w-2/3 h-full mx-auto overflow-y-scroll pt-8">
      { AboutSection("Suicoとは?", 
          "睡眠から生活を良くしたい、そういった思いでこのアプリを作成しました。「睡（すい）眠から生活や人生を向（こう）上させる」という思いを込めてSuicoと名付けました。"
      )}
      { AboutSection("睡眠の大事さ", "作者は以前、鉄道会社で運転士として勤務していました。鉄道会社の勤務は泊まりを伴う長時間勤務で、終電や始発から電車を動かすために3〜4時間の仮眠をとり、睡眠不足に耐えながら安全輸送を完遂する必要がありました。")}
      { AboutSection("Suicoとは?", 
          "睡眠から生活を良くしたい、そういった思いでこのアプリを作成しました。「睡（すい）眠から生活や人生を向（こう）上させる」という思いを込めてSuicoと名付けました。"
      )}
      { AboutSection("睡眠の大事さ", "作者は以前、鉄道会社で運転士として勤務していました。鉄道会社の勤務は泊まりを伴う長時間勤務で、終電や始発から電車を動かすために3〜4時間の仮眠をとり、睡眠不足に耐えながら安全輸送を完遂する必要がありました。")}
      { AboutSection("Suicoとは?", 
          "睡眠から生活を良くしたい、そういった思いでこのアプリを作成しました。「睡（すい）眠から生活や人生を向（こう）上させる」という思いを込めてSuicoと名付けました。"
      )}
      { AboutSection("睡眠の大事さ", "作者は以前、鉄道会社で運転士として勤務していました。鉄道会社の勤務は泊まりを伴う長時間勤務で、終電や始発から電車を動かすために3〜4時間の仮眠をとり、睡眠不足に耐えながら安全輸送を完遂する必要がありました。")}
      { AboutSection("Suicoとは?", 
          "睡眠から生活を良くしたい、そういった思いでこのアプリを作成しました。「睡（すい）眠から生活や人生を向（こう）上させる」という思いを込めてSuicoと名付けました。"
      )}
      { AboutSection("睡眠の大事さ", "作者は以前、鉄道会社で運転士として勤務していました。鉄道会社の勤務は泊まりを伴う長時間勤務で、終電や始発から電車を動かすために3〜4時間の仮眠をとり、睡眠不足に耐えながら安全輸送を完遂する必要がありました。")}
      <img src="sheep_dark.png" alt="Sheep"/>
    </div>
  )
}

export const About = (): JSX.Element => {
  return (
    <MainContentInner content={ AboutContent() } />
    )
  }