export const TEAM_CONFIRMATION_KEY = {
  development: '03e322e4-fe3d-43b8-a530-a2b9ff6a2783',
  qa: '26fb1b72-e3c2-41c5-bff2-2242d4476cc2',
  production: '898932e7-31d8-4f8c-a16a-5c1432e82476',
};
export const API_BASE_URL = {
  development: 'https://dev-kong.command-api.kw.com',
  qa: 'https://qa-kong.command-api.kw.com',
  production: 'https://kong.command-api.kw.com',
};
export const COOKIE_DOMAIN = 'localhost';
export const SESSION_NAME = 'command_session';
export const USER_DETAILS = 'user_details';
export const CAN_USE_DOM =
  typeof window !== 'undefined' &&
  typeof window.document !== 'undefined' &&
  typeof window.document.createElement !== 'undefined';
export const LOGOUT_URL = CAN_USE_DOM && `//${window.location.hostname}/login`;
