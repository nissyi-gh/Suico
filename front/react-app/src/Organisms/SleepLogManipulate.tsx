import axios from 'axios';
import { useState } from 'react';
import { VscChromeClose, VscEllipsis, VscEdit, VscTrash } from 'react-icons/vsc';
import { sleepLogsAPI } from '../constants/urls';

export const SleepLogManipulate = ({ id } : { id : number }): JSX.Element => {
  const [show, setShow] = useState<boolean>(false);

  const deleteRequest = () => {
    axios.delete(`${sleepLogsAPI}/${id}`, { withCredentials: true})
    .then(res => console.log(res))
    .catch(e => console.log(e));
  }

  return (
    <>
      <VscEllipsis onClick={ () => setShow(true) } className="cursor-pointer" />
      { show ? <>
        <div className="sleep_log_manipulate flex justify-around border w-32 p-2 border-black absolute top-0 bg-gray-200 -left-24 z-20 rounded-md">
          <div className='flex flex-col justify-between items-center w-20'>
            <div className='flex items-center justify-around w-full cursor-pointer hover:bg-gray-500/25 mb-2'>
              <VscEdit />編集
            </div>
            <div className='flex items-center justify-around w-full cursor-pointer hover:bg-gray-500/25' onClick={ deleteRequest }>
              <VscTrash />削除
            </div>
          </div>
          <VscChromeClose onClick={ () => setShow(false) } className="cursor-pointer"/>
        </div>
      </> : <>
      </>
      }
    </>
  )

}