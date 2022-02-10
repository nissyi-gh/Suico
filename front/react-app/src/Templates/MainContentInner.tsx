export const MainContentInner = ({ content } : { content: JSX.Element }): JSX.Element => {
  return (
    <div className="w-full m-2 border border-amber-600 bg-amber-50 rounded-sm">
      { content }
    </div>
  ) 
  
}