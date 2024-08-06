/**
 * Import npm dependencies
 */
import Cookies from 'js-cookie';

import { CAN_USE_DOM, COOKIE_DOMAIN, LOGOUT_URL } from './constants';

/**
 * logout
 * Log the user out and return the login page
 * @param {string} redirectTo
 */
const logout = async (redirectTo: string) => {
  const accessToken = JSON.parse(
    Cookies.get('command_session') ?? '',
  )?.access_token;

  // Remove all cookies
  for (const cookieName of Object.keys(Cookies.get())) {
    const neededAttributes = { domain: COOKIE_DOMAIN };
    Cookies.remove(cookieName, neededAttributes);
  }

  // Clear service worker registrations
  if (CAN_USE_DOM) {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        for (const registration of registrations) {
          registration.unregister();
        }
      });
    }
  }

  // Clear all local storage data
  const frontdoorDashboardSessionStorageKey =
    'FrontDoor | Dashboard - Current View State';
  const welcomeMessage = localStorage.getItem('isWelcomeMessage');
  if (sessionStorage.getItem(frontdoorDashboardSessionStorageKey)) {
    sessionStorage.removeItem(frontdoorDashboardSessionStorageKey);
  }
  localStorage.clear();
  localStorage.setItem('isWelcomeMessage', welcomeMessage ?? '');
  // Redirect to logout
  const redirectBase = LOGOUT_URL;
  const redirectUrl = `${redirectBase}${
    redirectTo ? `?redirectTo=${redirectTo}` : ''
  }`;
  if (CAN_USE_DOM) {
    try {
      const url = window.location.hostname;
      const env = url.includes('qa')
        ? 'qa'
        : url.includes('dev')
          ? 'dev'
          : 'prod';
      await fetch(
        env === 'prod'
          ? `https://kong.command-api.kw.com/oidc/end-session?post_logout_redirect_uri=${encodeURIComponent(
              `https:${redirectUrl}`,
            )}&id_token_hint=${accessToken}`
          : `https://${env}-kong.command-api.kw.com/oidc/end-session?post_logout_redirect_uri=${encodeURIComponent(
              `https:${redirectUrl}`,
            )}&id_token_hint=${accessToken}`,
        {
          redirect: 'manual',
        },
      );
    } catch (error) {
      console.error(`Error logging out: ${(error as Error).message}`);
    }

    window.location = redirectUrl as unknown as Location;
  }
};

export { logout };
