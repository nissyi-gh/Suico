import { usersIndex } from '../urls/index';
import axios from 'axios';
import { User } from '../types/types'
import { useState, useEffect } from 'react';

export const UsersIndex = (): JSX.Element => {
  const [json, setJson] = useState([]);

  useEffect(() => {
    axios.get(usersIndex)
      .then((res) => setJson(res.data.users))
      .catch(e => console.log(e));
  }, [])

  return (
    <>
      <p>ユーザー一覧</p>
      <ul>
          {json.map((item: User, key: number) => (
            <li key={ key }>User_id: { item.id }, Name: { item.name }, Email: { item.email }</li>
          ))}
      </ul>
    </>
  )
}