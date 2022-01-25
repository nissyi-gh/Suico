import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Graph } from "./components/Graph";

export const App = (): JSX.Element => {
  return (
    <Router>
      <div>
        ヘッダー
      </div>
      <Routes>
        <>
          <Route path="/" element={ <Graph /> } />
        </>
      </Routes>
    </Router>
  )
}