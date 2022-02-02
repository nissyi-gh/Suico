type legendProps = {
  contents: string[],
  toggleWakeAt: () => void,
  toggleSleepIn: () => void,
  toggleSatisfaction: () => void
}

export const GraphLegend = ({ contents, toggleWakeAt, toggleSleepIn, toggleSatisfaction }: legendProps): JSX.Element => {
  const toggler = [toggleWakeAt, toggleSleepIn, toggleSatisfaction];

  return (
    <ul className="flex items-center justify-around border-t-2 border-gray-800">
      { contents.map((content: string, index: number) => {
          return (
            <li key={ content } >
              <input type="checkbox" defaultChecked={ true } id={ content } onClick={ toggler[index] } />
              <label htmlFor={ content }>{ content }</label>
            </li>
          )
        })
      }
    </ul>
  );
} 