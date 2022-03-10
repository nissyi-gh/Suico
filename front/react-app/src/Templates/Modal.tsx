export const Modal = (content: JSX.Element, type: 'gray' | 'black'): JSX.Element => {
  const overlayCSS: string = "fixed top-0 left-0 w-full h-full bg-gray-500/75 dark:bg-gray-900/75 flex items-center justify-center z-30";
  const contentCSS: string = "z-2 w-[32rem] h-fit max-h-full p-2 m-2 bg-sky-200 dark:bg-gray-500 rounded-md border border-gray-900 z-30 overflow-y-scroll";
  const blackOverLayCSS: string = "fixed top-0 left-0 w-full h-full bg-zinc-900 flex items-center justify-center z-30";
  const blackContentCSS: string = "z-2 w-[32rem] p-2 bg-zinc-900 z-30";

  return (
    <>
      { type === 'gray' ?
        <div className={ overlayCSS }>
          <div className={ contentCSS }>
            { content }
          </div>
        </div>
        :
        <div className={ blackOverLayCSS }>
          <div className={ blackContentCSS }>
            { content }
          </div>
        </div>
      }
    </>
  )
}