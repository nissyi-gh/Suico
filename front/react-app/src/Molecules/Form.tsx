import React, { useEffect } from "react";
import { inputAtom } from "../Atoms/form";
import { satisfactions } from "../constants/constants";
import { taskOptionCreate } from "../Functions/Alarm";
import { formatNumberDigit } from "../Functions/Functions";
import dayjs from "dayjs";
import "dayjs/locale/ja";
dayjs.locale('ja');

export const inputWithLabel = (itemName: string, type: string, name: string, id: string, defaultValue?: string): JSX.Element => {
  const inputCss: string = "border border-gray-600 w-3/5";
  const labelCss: string = "w-2/5 inline-block text-center";

  return (
    <>
      <div className="p-2">
        <label htmlFor={ id } className={ labelCss }>{ itemName }</label>
        { inputAtom(type, name, id, inputCss, defaultValue) }
      </div>
    </>
  )
}

export const submitButton = (text: string, clickFunction?: (e: React.FormEvent<HTMLInputElement>) => void) =>  {
  const css: string = "inline-block border border-black cursor-pointer bg-gray-200 p-2 m-4";

  return (
    <div className="text-center">
      <input type="submit" value={ text }  id="submit" className={ css } onClick={ clickFunction }/>
    </div>
  );
}

export const inputCheckBox = (spanText: string, name: string, id: string): JSX.Element  => {
  const labelCss: string = "inline-block";

  return (
    <>
      <div className="text-center">
        <label htmlFor={ id } className={ labelCss }>
          { inputAtom("checkbox", name, id, "")}
          <span>{ spanText }</span>
        </label>
      </div>
    </>
  )
}

const timerOptionCleate = (limit: number) => {
  const times = [];

  for (let i: number = 0; i < limit; i++ ) {
    times.push(i);
  }

  return (
    <>
      { times.map(item => {
        return <option key={ item }>{ formatNumberDigit(item) }</option>
      })}
    </>
  )
}

export const AlarmSetterWithLabel = (itemName: string, name: string, id: string, defaultTime?: dayjs.Dayjs): JSX.Element => {
  const selecterCSS: string = "border bg-black text-gray-100 w-1/6";
  const defaultHour: string = defaultTime ? formatNumberDigit(defaultTime?.hour()) : '' ;
  const defaultMin: string = defaultTime ? formatNumberDigit(defaultTime?.minute()) : '';
  
  return (
    <div className="text-gray-100 w-full">
      <label htmlFor={ id } className=" bg-black inline-block w-1/3">{ itemName }</label>
      <select name={ name } id={ `${ id }_hour` } className={ selecterCSS } defaultValue={ defaultHour } >
        { timerOptionCleate(24) }
      </select>
      <select name={ name } id={ `${ id }_min` } className={ selecterCSS } defaultValue={ defaultMin } >
        { timerOptionCleate(60) }
      </select>
    </div>
  )
}

export const TaskSelecterWithLabel = (itemName:string, name: string, id: string): JSX.Element => {
  useEffect(() => {
    const selector = document.getElementById(id) as HTMLSelectElement;
    taskOptionCreate(selector);
  }, [id])

  return (
    <div className="w-full">
      <label htmlFor={ id } className="inline-block w-1/3 text-gray-100">
        { itemName }
      </label>
      <select name={ name } id={ id } className="border bg-inherit text-gray-100 w-1/2"></select>
    </div>
  )
}

export const Satisfactionselector = (defaultValue?: number): JSX.Element => {
  const satisfactionsArray: (string | number)[][] = [
    [satisfactions.NULL.CHARACTER, "記録しない"],
    [satisfactions.BAD.NUMBER, satisfactions.BAD.CHARACTER],
    [satisfactions.SOSO.NUMBER, satisfactions.SOSO.CHARACTER],
    [satisfactions.GOOD.NUMBER, satisfactions.GOOD.CHARACTER],
    [satisfactions.BETTER.NUMBER, satisfactions.BETTER.CHARACTER],
    [satisfactions.BEST.NUMBER, satisfactions.BEST.CHARACTER]
  ]

  return (
    <>
      <select name="satisfaction" id="satisfaction" className="border zzzzm-2" defaultValue={ defaultValue }>
        { 
          satisfactionsArray.map( item => {
            return <option value={ item[0] } key={item[0] }> {item[1]} </option>
          })
        }
      </select>
    </>
  )
}

export const SatisfactionSelectorWithLabel = (defaultValue?: number): JSX.Element => {
  return (
    <div className="w-full">
      <label htmlFor="satisfaction" className="inline-block w-1/3">
        睡眠の満足度
      </label>
      { Satisfactionselector(defaultValue) }
    </div>
  )
}