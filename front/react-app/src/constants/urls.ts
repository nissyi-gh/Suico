const host_selector = (): string => {
  switch(process.env.NODE_ENV) {
    case 'production':
      return 'https://api.suico-portfolio.com/api/v1';
    default:
      return 'http://localhost:3001/api/v1';
  }
}

const DEFAULT_API_HOST: string = host_selector();

// user
export const usersIndex: string = `${DEFAULT_API_HOST}/users`; // GET
export const userCreate: string = `${DEFAULT_API_HOST}/users`; // POST
export const userURL: string = `${DEFAULT_API_HOST}/user`;
export const createGuestUser: string = `${DEFAULT_API_HOST}/guest`;
export const guestLogin: string = `/guest_login`;
export const signUp: string = `/sign_up`;
export const loginForm: string = `/login`;
export const logout: string = `/logout`;
export const sleepLogsURL: string = '/sleep_logs';

// notification
export const notifications: string = `/notifications`;
export const notificationAPI: string = `${DEFAULT_API_HOST}/notifications`

// alarm_settings
export const alarmPresetsAPI: string = `${DEFAULT_API_HOST}/alarm_presets`;
export const alarmPresetsIndexURL: string = '/alarm_presets';
// export const alarmPresetsNewURL: string = '/alarm_presets/new';


export const accountSettingsURL: string = `/account_settings`;
export const aboutURL: string = `/about`;
export const contactURL: string = `/contact`;
export const notificationURL: string = '/notification';

// sessions
export const new_session: string = `${DEFAULT_API_HOST}/login`;// GET, POST
export const delete_session: string = `${DEFAULT_API_HOST}/logout`; // DELETE
export const loggedIn: string = `${DEFAULT_API_HOST}/logged_in`; // GET

// sleep_logs
export const sleepLogsAPI: string = `${DEFAULT_API_HOST}/sleep_logs`// GET, POST, (add ID) GET, PATCH, PUT, DELETE
// export const sleepLogAPI: string = `${DEFAULT_API_HOST}/sleep_log`// GET, PATCH, PUT, DELETE
export const sleepLogURL: string = `/sleep_log`