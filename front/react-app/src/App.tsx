import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { UsersIndex } from "./components/UsersIndex";

export const App = (): JSX.Element => {
  return (
    <Router>
      <div>
        ヘッダー
      </div>
      <Routes>
        <>
          <Route path="/users" element={ <UsersIndex /> } />
          <Route path="/" />
        </>
      </Routes>
    </Router>
  )
}