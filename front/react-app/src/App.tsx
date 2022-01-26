import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { UsersIndex } from "./Pages/UsersIndex";
import { Header } from "./Organisms/Header";

export const App = (): JSX.Element => {
  return (
    <div>
      <div className="w-2/3 mx-auto my-0">
        <Router>
          <Header />
          <div className="border border-gray-500 h-2/3">
            <Routes>
              <>
                <Route path="/users" element={ <UsersIndex /> } />
                <Route path="/" />
              </>
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  )
}