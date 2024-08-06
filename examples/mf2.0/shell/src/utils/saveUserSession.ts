/**
 * Import npm dependencies
 */
import Cookies from 'js-cookie';

/**
 * Import utility dependencies
 */
import { COOKIE_DOMAIN, SESSION_NAME } from './constants';

/**
 * saveUserSession
 * Save a OL session to storage and include the expires_at data
 * @param {object} session
 */
const saveUserSession = (
  session: {
    access_token: string;
    session_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at: number;
    is_locked?: boolean;
  },
  sameSite:
    | 'lax'
    | 'Lax'
    | 'strict'
    | 'Strict'
    | 'none'
    | 'None'
    | undefined = 'lax',
) => {
  // Retrieve the number of seconds to expiration
  const secondsToExpiration = session.expires_in;
  // Remove a grace period of 5 minutes and Convert it to milliseconds
  const msToExpiration = (secondsToExpiration - 300) * 1000;
  // Add that to the current time
  const expires_at = Date.now() + msToExpiration;
  // Add it to the session
  session.expires_at = expires_at;
  // Save it into a cookie
  Cookies.set(SESSION_NAME, JSON.stringify(session), {
    domain: COOKIE_DOMAIN,
    sameSite,
    secure: sameSite === 'none',
  });
};

export { saveUserSession };
