import axios from 'axios';
import { useCallback, useContext, useRef, useState } from 'react';
import { VscChromeClose, VscEllipsis, VscEdit, VscTrash } from 'react-icons/vsc';
import { sleepLogsAPI } from '../constants/urls';
import { fetchSleepLogs } from '../Functions/Functions';
import { sleepLogsProviderContext } from '../providers/SleepLogsProvider';
import { SleepLogListItem } from '../types/types';
import { SleepLogEditerModal } from './SleepLogEditerModal';

export const SleepLogManipulate = ({ log } : { log: SleepLogListItem }): JSX.Element => {
  const { setSleepLogs, setSleepLogsData } = useContext(sleepLogsProviderContext);
  // JSXの表示・非表示を変更する
  const [show, setShow] = useState<boolean>(false);
  const manipulateElement = useRef(null);
  // useCallbackがshowに依存しないよう、Refで新たなStateを持たせる。
  const isShow = useRef(false);
  const [editerShow, setEditerShow] = useState<boolean>(false);

  // 確認したら該当のログを削除して、再度ログを取得する。
  const deleteRequest = () => {
    if (window.confirm("本当に削除しますか?")){
      axios.delete(`${ sleepLogsAPI }/${ log.sleepLogId }`, { withCredentials: true })
      .then(res => {
        fetchSleepLogs(setSleepLogs, setSleepLogsData);
        console.log(res);
      })
      .catch(e => console.log(e));
    }
  }

  const isShowToggle = useCallback((e: Event) => {
    if  (isShow.current && (e.target !== manipulateElement.current)) {
      setShow(false);
      isShow.current = false;
      document.removeEventListener('click', isShowToggle);
    } else {
      setShow(true);
      isShow.current = true;
    } 
  }, [])
  
  const showManipulate = () => {
    document.addEventListener('click', isShowToggle);
  }
  
  const closeManipulate = () => {
    setShow(false);
    isShow.current = false;
    document.removeEventListener('click', isShowToggle);
  }

  const closeEditer = () => {
    setEditerShow(false);
  }

  const logForEdit = {
    sleepLogId: log.sleepLogId,
    sleepAt: log.sleepAt,
    wakeAt: log.wakeAt,
    satisfaction: log.satisfaction
  }

  return (
    <>
      <VscEllipsis onClick={ showManipulate } className="cursor-pointer" />
      { show ? <>
        <div ref={ manipulateElement } className="sleep_log_manipulate flex justify-around border w-32 p-2 border-black absolute top-0 bg-gray-200 dark:bg-gray-600 -left-24 z-20 rounded-md shadow-md shadow-gray-700/75">
          <div className='flex flex-col justify-between items-center w-20'>
            <div className='flex items-center justify-around w-full cursor-pointer hover:bg-gray-500/25 hover:dark:bg-gray-400/25 mb-2' onClick={ () => setEditerShow(true) }>
              <VscEdit />編集
            </div>
            <div className='flex items-center justify-around w-full cursor-pointer hover:bg-gray-500/25 hover:dark:bg-gray-400/25' onClick={ deleteRequest }>
              <VscTrash />削除
            </div>
          </div>
          <VscChromeClose onClick={ closeManipulate } className="cursor-pointer hover:bg-gray-500/25 hover:dark:bg-gray-400/25"/>
        </div>
      </> : null}
      { editerShow ? <SleepLogEditerModal hideModalFunction={ closeEditer } log={ logForEdit } /> : null }
    </>
  )

}