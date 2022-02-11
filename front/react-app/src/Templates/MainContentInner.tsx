export const MainContentInner = ({ content } : { content: JSX.Element }): JSX.Element => {
  return (
    <div className="w-full m-2 border border-amber-600 bg-amber-50 rounded-sm">
      <div className="w-2/3 h-full mx-auto overflow-y-scroll pt-8">
        { content }
      </div>
    </div>
  ) 
  
}