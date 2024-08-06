/**
 * Import npm dependencies
 */
import Cookies from 'js-cookie';

/**
 * Import utility dependencies
 */
import { SESSION_NAME } from './constants';

interface UserSession {
  access_token: string;
  refresh_token: string;
  session_token: string;
  expires_in: number;
  expires_at: number;
  is_locked?: boolean;
}

/**
 * getUserSession
 * Pull the user session out of the store
 */
const getUserSession = (): UserSession => {
  const sessionStr = Cookies.get(SESSION_NAME);
  if (sessionStr) {
    try {
      const session: UserSession = JSON.parse(sessionStr);
      return session;
    } catch (err) {
      console.error('Failed to parse session JSON:', err);
    }
  }
  return {
    access_token: '',
    refresh_token: '',
    session_token: '',
    expires_at: 0,
    expires_in: 0,
    is_locked: false,
  };
};

export { getUserSession, type UserSession };
