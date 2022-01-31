import { getRandomIntInclusive } from "../Functions";


// Panel用、ランダムにパネルを配置
export const returnRandomPanels = (panelMax: number | undefined): number[] => {
  const panels: number[] = [];
  if (panelMax) {
    for (let i = 1; i <= panelMax; i++) {
      panels.push(i);
    }
  }

  const returnArray: number[] = [];
  while(panels[0]) {
    returnArray.push(panels.splice(getRandomIntInclusive(0, panels.length - 1), 1)[0]);
  }
  return returnArray;
}

// panelのカラーとホバー時のカーソルをもとに戻す。
export const reRenderPanleContent = (max: number): void => {
  for(let i = 1; i < max; i++) {
    const item = document.getElementById(i.toString());
    item!.classList.add("cursor-pointer");
    item!.classList.remove("text-gray-900");
  }
}
