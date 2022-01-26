import { Link } from 'react-router-dom';

export const linkAtom = (url: string, text: string, css: string): JSX.Element => {
  return(
    <Link to={ url } key={ text } className={ css }>{ text }</Link>
  )
}

export const inputAtom = (type: string): JSX.Element => {
  return <input type={ type } />
}

