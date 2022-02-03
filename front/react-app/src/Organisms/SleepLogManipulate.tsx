import { useState } from 'react';
import { VscChromeClose, VscEllipsis, VscEdit, VscTrash } from 'react-icons/vsc';

export const SleepLogManipulate = (): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <>
      <VscEllipsis onClick={ () => setShow(true) } className="cursor-pointer" />
      { show ? <>
        <div className="sleep_log_manipulate flex justify-around border w-32 p-2 border-black absolute top-0 bg-gray-200 -left-24 z-20 rounded-md">
          <div className='flex flex-col justify-between items-center w-20'>
            <div className='flex items-center justify-around w-full cursor-pointer hover:bg-gray-500/25'><VscEdit />編集</div>
            <div className='flex items-center justify-around w-full cursor-pointer hover:bg-gray-500/25'><VscTrash />削除</div>
          </div>
          <VscChromeClose onClick={ () => setShow(false) } className="cursor-pointer"/>
        </div>
      </> : <>
      </>
      }
    </>
  )

}