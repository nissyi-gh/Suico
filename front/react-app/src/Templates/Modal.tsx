export const Modal = (content: JSX.Element, type: 'gray' | 'black'): JSX.Element => {
  const overlayCSS: string = "fixed top-0 left-0 w-full h-full bg-gray-500/75 flex items-centet justify-center z-10";
  const contentCSS: string = "z-2 w-1/2 p-2 bg-gray-200";
  const blackOverLayCSS: string = "fixed top-0 left-0 w-full h-full bg-gray-900 flex items-centet justify-center z-10";
  const blackContentCSS: string = "z-2 w-1/2 p-2 bg-gray-500";

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