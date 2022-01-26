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
} from "./urls";

export const App = (): JSX.Element => {
  return (
    <div className="h-full">
      <div className="w-2/3 h-full mx-auto my-0">
        <Router>
          <Header />
          <div className="border border-gray-500 h-1/3">
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