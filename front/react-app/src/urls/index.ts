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
export const alarmSettingsURL: string = '/alarm_settings';
export const accountSettingsURL: string = `/account_settings`;
export const aboutURL: string = `/about`;
export const contactURL: string = `/contact`;

// sessions
export const new_session: string = `${DEFAULT_API_LOCALHOST}/login`;// GET, POST
export const delete_session: string = `${DEFAULT_API_LOCALHOST}/logout`; // DELETE
export const loggedIn: string = `${DEFAULT_API_LOCALHOST}/logged_in`; // GET