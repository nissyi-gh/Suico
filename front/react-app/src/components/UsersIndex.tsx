// import { useLocation } from 'react-router-dom';
// import { usersIndex } from '../urls/index';
// import axios from 'axios';
// import { UserInterface } from '../types/types'

export const UsersIndex = (): JSX.Element => {
  // const [json, setJson] = useState([]);
  // const location = useLocation();
  // console.log(location);

  // useEffect(() => {
  //   axios.get(usersIndex)
  //     .then((res) => setJson(res.data.users))
  //     .catch(e => console.log(e));
  // }, [])

  return (
    <>
      <p>ユーザー一覧</p>
      <ul>
          {/* {json.map((item: UserInterface, key: number) => (
            <li key={ key }>User_id: { item.id }, Name: { item.name }, Email: { item.email }</li>
          ))} */}
      </ul>
    </>
  )
}