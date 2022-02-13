type AlarmPresetsListItemType = {
  title: string,
  wakeAt: string,
  task: string
}

export const AlarmPresetsListItem = (): JSX.Element => {
  const itemsArray: AlarmPresetsListItemType[] = []

  for (let i = 0; i < 50; i++) {
    itemsArray.push({
      title: '例 出勤用',
      wakeAt: '7:00',
      task: '計算'
    })
  }

  return (
    <>
      { itemsArray.map((item: AlarmPresetsListItemType, index: number) => {
          return (
            <li key={ index } className="w-full flex justify-between">
              <p className="w-1/3 border">{ item.title }</p>
              <p className="w-1/3 border">{ item.wakeAt }</p>
              <p className="w-1/3 border">{ item.task }</p>  
            </li>
          )
        })
      }
    </>
  )
}