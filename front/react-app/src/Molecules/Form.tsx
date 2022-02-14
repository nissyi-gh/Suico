import { inputAtom } from "../Atoms/form";
import { satisfactions } from "../constants/constants";
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

const timerOptionCreate = (limit: number) => {
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
  const selecterCSS: string = "border w-1/3 text-center";
  const defaultHour: string = defaultTime ? formatNumberDigit(defaultTime?.hour()) : '' ;
  const defaultMin: string = defaultTime ? formatNumberDigit(defaultTime?.minute()) : '';
  

  return (
    <div className="w-full flex">
      <label htmlFor={ id } className="inline-block w-1/3">{ itemName }</label>
      <div className="w-2/3">
        <select name={ name } id={ `${ id }_hour` } className={ selecterCSS } defaultValue={ defaultHour } >
          { timerOptionCreate(24) }
        </select>
        <select name={ name } id={ `${ id }_min` } className={ selecterCSS } defaultValue={ defaultMin } >
          { timerOptionCreate(60) }
        </select>
      </div>
    </div>
  )
}

export const AlarmSetterWithLabelOnDark = (itemName: string, name: string, id: string, onChangeHour: any, onChangeMinute: any, defaultTime?: dayjs.Dayjs): JSX.Element => {
  const selecterCSS: string = "border w-1/3 bg-black text-center bg-white";
  const defaultHour: string = defaultTime ? formatNumberDigit(defaultTime?.hour()) : '' ;
  const defaultMin: string = defaultTime ? formatNumberDigit(defaultTime?.minute()) : '';
  

  return (
    <div className="w-full flex">
      <label htmlFor={ id } className="inline-block w-1/4">{ itemName }</label>
      <div className="w-3/4">
        <select name={ name } id={ `${ id }_hour` } className={ selecterCSS } value={ defaultHour } onChange={ onChangeHour } >
          { timerOptionCreate(24) }
        </select>
        <select name={ name } id={ `${ id }_min` } className={ selecterCSS } value={ defaultMin } onChange={ onChangeMinute } >
          { timerOptionCreate(60) }
        </select>
      </div>
    </div>
  )
}

export const ControlledAlarmSetterWithLabel = (itemName: string, name: string, id: string, onHourChange: any , onMinuteChange: any, defaultTime?: dayjs.Dayjs): JSX.Element => {
  const selecterCSS: string = "border w-fit text-center block px-2";
  const defaultHour: string = defaultTime ? formatNumberDigit(defaultTime?.hour()) : '' ;
  const defaultMin: string = defaultTime ? formatNumberDigit(defaultTime?.minute()) : '';
  

  return (
    <div className="w-full flex">
      <label htmlFor={ id } className="inline-block w-1/4">{ itemName }</label>
      <div className="w-3/4 flex">
        <select name={ name } id={ `${ id }_hour` } className={ selecterCSS } value={ defaultHour } onChange={ onHourChange } >
          { timerOptionCreate(24) }
        </select>
        <select name={ name } id={ `${ id }_min` } className={ selecterCSS } value={ defaultMin } onChange={ onMinuteChange } >
          { timerOptionCreate(60) }
        </select>
      </div>
    </div>
  )
}

// taskSelecterのOptionを生成
export const taskOptionCreate = () => {
  const setValues: string[] = ["ボタン", "かんたんな計算", "パネル選択"];

  return (
    <>
      { setValues.map((value) => {
        return <option key={ value }>{ value }</option>
      })}
    </>
  )
}

export const taskConverter = (select: string | number | undefined): string | undefined => {
  switch(select) {
    case 0:
      return "ボタン";
    case 1:
      return "かんたんな計算";
    case 2:
      return "パネル選択";
    default:
      return undefined;
  }
}

export const taskInverter = (select: string | number | undefined): number | undefined => {
  switch(select) {
    case "ボタン":
      return 0;
    case "かんたんな計算":
      return 1;
    case "パネル選択":
      return 2;
    default:
      return undefined;
  }
}

export const TaskSelecterWithLabel = (itemName:string, name: string, id: string): JSX.Element => {
  return (
    <div className="w-full">
      <label htmlFor={ id } className="inline-block w-1/4 text-center">
        { itemName }
      </label>
      <select name={ name } id={ id } className="border bg-inherit w-3/4">{ taskOptionCreate() }</select>
    </div>
  )
}

export const ControlledTaskSelecterWithLabel = (itemName:string, name: string, id: string, value: number | undefined, onChange: any): JSX.Element => {
  return (
    <div className="w-full">
      <label htmlFor={ id } className="inline-block w-1/4 text-center">
        { itemName }
      </label>
      <select name={ name } id={ id } className="border w-3/4" value={ taskConverter(value) } onChange={ onChange }>{ taskOptionCreate() }</select>
    </div>
  )
}

export const ControlledTaskSelecterWithLabelOnDark = (itemName:string, name: string, id: string, value: number | undefined, onChange: any): JSX.Element => {
  return (
    <div className="w-full">
      <label htmlFor={ id } className="inline-block w-1/4 text-center">
        { itemName }
      </label>
      <select name={ name } id={ id } className="border w-3/4 bg-black" value={ taskConverter(value) } onChange={ onChange }>{ taskOptionCreate() }</select>
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