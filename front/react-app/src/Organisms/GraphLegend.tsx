type legendProps = {
  contents: string[],
  toggleWakeAt: () => void,
  toggleSleepIn: () => void,
  toggleSatisfaction: () => void
}

export const GraphLegend = ({ contents, toggleWakeAt, toggleSleepIn, toggleSatisfaction }: legendProps): JSX.Element => {
  const toggler = [toggleWakeAt, toggleSleepIn, toggleSatisfaction];

  const attachCSS = (content: string): string => {
    const commonCSS: string = "hover:cursor-pointer";

    switch(content) {
      case "起床時刻":
        return `text-amber-500 ${ commonCSS }`;
      case "就寝時刻":
        return `text-indigo-600 ${ commonCSS }`;
      case "満足度":
        return `text-green-600 ${ commonCSS }`;
      default:
        return "";
    }
  }

  return (
    <ul className="flex items-center justify-around border-t border-gray-800">
      { contents.map((content: string, index: number) => {
          return (
            <li key={ content }>
              <label htmlFor={ content } className={ attachCSS(content) } >
                <input type="checkbox" defaultChecked={ true } id={ content } onClick={ toggler[index] } className="mr-2"/>
                { content }
              </label>
            </li>
          )
        })
      }
    </ul>
  );
} 