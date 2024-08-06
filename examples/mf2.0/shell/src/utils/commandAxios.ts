import axios, { type AxiosResponse } from 'axios';
import memo from 'p-memoize';
import { API_BASE_URL, CAN_USE_DOM } from './constants';
import { getQueryParameter } from './getQueryParameter';
import { type UserSession, getUserSession } from './getUserSession';
import { logout } from './logout';
import { saveUserSession } from './saveUserSession';

/**
 * Pull the token out of local storage
 */
const { access_token } = getUserSession();

const initCommandAxios = (_env?: 'development' | 'qa' | 'production') => {
  let env: 'development' | 'qa' | 'production' | undefined =
    _env ?? 'development';
  if (!_env) {
    if (CAN_USE_DOM) {
      const url = window.location.hostname;
      env = url.includes('qa')
        ? 'qa'
        : url.includes('dev')
          ? 'development'
          : 'production';
    }
  }
  const baseApiUrl = API_BASE_URL[env];

  const commandAxios = axios.create({
    baseURL: baseApiUrl,
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  /**
   * Refresh token
   * Attempt to refresh the token on the server
   */
  const refreshToken = memo((refreshToken: string) => {
    return axios.post(`${baseApiUrl}/refresh-token`, {
      refresh_token: refreshToken,
    });
  });

  const checkLock = () => {
    const { is_locked } = getUserSession();
    return Boolean(is_locked);
  };

  /**
   * Request interceptor for checking if the token is going to expire
   * soon and refresh it if it will
   */
  commandAxios.interceptors.request.use(
    async (config) => {
      const {
        refresh_token,
        access_token,
        session_token,
        expires_at,
        expires_in,
      } = getUserSession();
      const currentTime = Date.now();
      if (!expires_at || currentTime >= expires_at) {
        if (checkLock()) {
          saveUserSession({
            refresh_token,
            access_token,
            session_token,
            expires_at,
            expires_in,
            is_locked: true,
          });
          refreshToken(refresh_token)
            .then((response: unknown) => {
              const session = (response as AxiosResponse<UserSession>).data;
              saveUserSession({ ...session, is_locked: false });
              commandAxios.defaults.headers.common.Authorization = `Bearer ${session.access_token}`;
              return config;
            })
            .catch(() => {
              logout(CAN_USE_DOM ? window.location.pathname : '');
              return;
            });
        }
      } else {
        //      await getRedirectToTeamConfirmationPage()
        return config;
      }

      return config;
    },
    (error) => Promise.reject(error),
  );

  /**
   * Error interceptor for refreshing token if receiving a 401. This is
   * a last resort
   */
  commandAxios.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;
      const destination = originalRequest?.url;
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        if (getQueryParameter('disableAuthRedirect', destination) === 'true') {
          return Promise.reject(error);
        }
        originalRequest._retry = true;
        const { refresh_token } = getUserSession();
        refreshToken(refresh_token)
          .then(async (response) => {
            const session = (response as AxiosResponse<UserSession>).data;
            await saveUserSession({ ...session, is_locked: false });
            commandAxios.defaults.headers.common.Authorization = `Bearer ${session.access_token}`;
            originalRequest.headers.Authorization = `Bearer ${session.access_token}`;
            return axios(originalRequest);
          })
          .catch((err) => {
            console.error(err);
            logout(CAN_USE_DOM ? window.location.pathname : '');
            return;
          });
      }
      return Promise.reject(error);
    },
  );

  return commandAxios;
};

const commandAxios = initCommandAxios();

export { initCommandAxios };
export default commandAxios;
