const DEFAULT_API_LOCALHOST: string = 'http://localhost:3001/api/v1'

// user
export const usersIndex: string = `${DEFAULT_API_LOCALHOST}/users`; // GET
export const userCreate: string = `${DEFAULT_API_LOCALHOST}/users`; // POST
export const userURL: string = `${DEFAULT_API_LOCALHOST}/user`;
export const guestLogin: string = `/guest_login`;
export const signUp: string = `/sign_up`;
export const loginForm: string = `/login`;
export const logout: string = `/logout`;
export const sleepLogsURL: string = '/sleep_logs';
export const notifications: string = `/notifications`;

// alarm_settings
export const alarmPresetsIndexAPI: string = `${DEFAULT_API_LOCALHOST}/alarm_presets`;
export const alarmPresetsIndexURL: string = '/alarm_settings/presets';
export const alarmPresetsNewURL: string = '/alarm_settings/presets/new';


export const accountSettingsURL: string = `/account_settings`;
export const aboutURL: string = `/about`;
export const contactURL: string = `/contact`;

// sessions
export const new_session: string = `${DEFAULT_API_LOCALHOST}/login`;// GET, POST
export const delete_session: string = `${DEFAULT_API_LOCALHOST}/logout`; // DELETE
export const loggedIn: string = `${DEFAULT_API_LOCALHOST}/logged_in`; // GET

// sleep_logs
export const sleepLogsAPI: string = `${DEFAULT_API_LOCALHOST}/sleep_logs`// GET, POST, (add ID) GET, PATCH, PUT, DELETE
// export const sleepLogAPI: string = `${DEFAULT_API_LOCALHOST}/sleep_log`// GET, PATCH, PUT, DELETE
export const sleepLogURL: string = `/sleep_log`