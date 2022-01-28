import { Link } from 'react-router-dom';

export const linkAtom = (url: string, text: string, css: string): JSX.Element => {
  return(
    <Link to={ url } key={ text } className={ css }>{ text }</Link>
  )
}

export const inputAtom = (type: string, name: string, id: string, css: string,  defaultValue?: string): JSX.Element => {
  return <input type={ type } name={ name } id={ id } defaultValue={ defaultValue } className={ css } />
}

export const buttonAtom = (text: string, css: string, onClickFunction?: () => void): JSX.Element => {
  return (
    <button onClick={ onClickFunction } className={ css }>{ text }</button>
  )
}