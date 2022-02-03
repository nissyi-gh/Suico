import {
  BrowserRouter as Router,
  Routes,
  Route,
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

export const App = (): JSX.Element => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-[url('../../public/yoake.jpg')] bg-cover">
      <div className="w-2/3 mx-auto my-0">
        <Router>
          <Header />
          <div className="border w-2/3 h-2/3 border-gray-600 border-t-0 bg-sky-100 fixed top-34 flex justify-center">
            <Routes>
              <>
                <Route path="/users" element={ <UsersIndex /> } />
                <Route path={ sleepLogsURL } element={ <SleepLogs /> } />
                <Route path={ alarmSettingsURL } element={ <AlarmSettings /> } />
                <Route path={ accountSettingsURL } element={ <AccountSettings /> } />
                <Route path={ aboutURL } element={ <About /> } />
                <Route path={ contactURL } element={ <Contact /> } />
                <Route path="*" element={ <NotFound /> } />
              </>
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  )
}