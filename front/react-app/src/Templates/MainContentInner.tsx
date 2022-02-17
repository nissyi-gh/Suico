export const MainContentInner = ({ content } : { content: JSX.Element }): JSX.Element => {
  return (
    <div className="w-full m-2 border border-amber-600 dark:border-gray-300 bg-amber-50 dark:bg-inherit rounded-md">
      <div className="w-2/3 h-full mx-auto overflow-y-scroll py-8">
        { content }
      </div>
    </div>
  ) 
  
}