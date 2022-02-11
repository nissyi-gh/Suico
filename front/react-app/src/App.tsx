import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { UsersIndex } from "./Pages/UsersIndex";
import { SleepLogs } from "./Pages/SleepLogs";
import { AlarmSettings } from "./Pages/AlarmSettings";
import { AccountSettings } from "./Pages/AccountSettings";
import { About } from "./Pages/About";
import { Contact } from "./Pages/Contact";
import { NotFound } from "./Pages/NotFound";
import { Header } from "./Organisms/Header";
import {
  sleepLogsURL,
  alarmSettingsURL,
  accountSettingsURL, 
  aboutURL, 
  contactURL
} from "./constants/urls";
import { Home } from "./Pages/Home";
import { useContext } from "react";
import { LoginContext } from "./providers/LoginFlagProvider";

export const App = (): JSX.Element => {
  const { loginFlag } = useContext(LoginContext);

  const LoginCheck = ({ component } : { component: JSX.Element }): JSX.Element => {  
    return loginFlag ? <>{ component }</> : <Navigate to="/" />
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[url('../../public/yoake.jpg')] bg-cover">
      <div className="w-2/3 mx-auto my-0">
        <Router>
          <Header />
          <div className="border w-2/3 h-2/3 border-gray-600 border-t-0 bg-sky-100 fixed top-34 flex justify-center">
            <Routes>
                <Route path="/users" element={ <UsersIndex /> } />
                <Route path={ sleepLogsURL } element={ <LoginCheck component={ <SleepLogs /> }/> } />
                <Route path={ alarmSettingsURL } element={ <LoginCheck component={ <AlarmSettings /> }/>  } />
                <Route path={ accountSettingsURL } element={ <LoginCheck component={ <AccountSettings /> }/> } />
                <Route path={ aboutURL } element={ <LoginCheck component={ <About /> }/>  } />
                <Route path={ contactURL } element={ <LoginCheck component={ <Contact /> }/>  } />
                <Route path="/" element={ <Home /> } />
                <Route path="*" element={ <NotFound /> } />
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  )
}