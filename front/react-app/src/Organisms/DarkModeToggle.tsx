import { BsSun, BsMoon } from 'react-icons/bs';
import { DarkModeProps } from '../types/types';



export const DarkMordToggle = ({ isDark, toggleDarkClassForHtml } : DarkModeProps) => {
  return (
    <>
      <div className='md:hidden bg-inherit h-full text-center'>
        <div className='flex w-fit cursor-pointer' onClick={ toggleDarkClassForHtml }>
          <p className='select-none'>
            { isDark ? 
                <BsSun className='text-black inline-block hover:cursor-pointer w-fit h-6' />
              :
                <BsMoon className='inline-block hover:cursor-pointer w-fit h-6' />
            }
          </p>
        </div>
      </div>
    </>
  )
}