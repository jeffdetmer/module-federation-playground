import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Stack,
  StackDivider,
} from '@chakra-ui/react';
import { createLazyFileRoute } from '@tanstack/react-router';
import axios from 'axios';

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

export const Route = createLazyFileRoute('/')({
  component: () => <Index />,
});

const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [session, setSession] = useState({
    access_token: '',
    refresh_token: '',
    session_token: '',
    expires_in: 0,
    expires_at: 0,
  });
  const [loginResponse, setLoginResponse] = useState<string | undefined>();
  const [refreshTokenResponse, setRefreshTokenResponse] = useState<
    string | undefined
  >();
  const [sessionHtml, setSessionHtml] = useState<string | undefined>();

  useEffect(() => {
    const fetchHtml = async () => {
      const html = await codeToHtml(JSON.stringify(session, null, 2), {
        lang: 'json',
        theme: 'vitesse-dark',
      });
      setSessionHtml(html);
    };

    fetchHtml();
  }, [session]);

  // reimplementation of getQueryParameter without the need to pull in kw-utils
  const getQueryParameter = (_name: string, url: string) => {
    const name = _name.replace(/[[\]]/g, '\\$&');
    const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`);
    const results = regex.exec(url);
    if (!results) {
      return null;
    }
    if (!results[2]) {
      return '';
    }
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  };

  // reimplementation of commandAxios without the need to pull in kw-utils
  const initCommandAxios = () => {
    const commandAxios = axios.create({
      baseURL: 'https://qa-kong.command-api.kw.com',
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    });

    function refreshToken() {
      const { refresh_token } = session;
      return axios.post('/refresh-token', {
        refresh_token,
      });
    }

    commandAxios.interceptors.request.use(
      async (config) => {
        const { expires_at } = session;
        const currentTime = Date.now();
        if (!expires_at || currentTime >= Number(expires_at)) {
          refreshToken()
            .then((response) => {
              setSession(response.data.data);
              commandAxios.defaults.headers.Authorization = `Bearer ${response.data.data.access_token}`;
              return config;
            })
            .catch(() => {
              onLogout();
              return;
            });
        } else {
          return config;
        }
        return config;
      },
      (err) => Promise.reject(err),
    );
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
          if (
            getQueryParameter('disableAuthRedirect', destination) === 'true'
          ) {
            return Promise.reject(error);
          }
          originalRequest._retry = true;
          refreshToken()
            .then((response) => {
              const session = response.data.data;
              setSession(session);
              commandAxios.defaults.headers.common.Authorization = `Bearer ${session.access_token}`;
              originalRequest.headers.Authorization = `Bearer ${session.access_token}`;
              return axios(originalRequest);
            })
            .catch(() => {
              onLogout();
              return;
            });
        }
        return Promise.reject(error);
      },
    );
    return commandAxios;
  };
  const commandAxios = initCommandAxios();

  const onLogout = async () => {
    try {
      console.log('onLogout');
      await fetch(
        `https://qa-kong.command-api.kw.com/oidc/end-session?post_logout_redirect_uri=${encodeURI('http://localhost:3000/')}&id_token_hint=${session.access_token}`,
        {
          redirect: 'manual',
        },
      );
      setLoggedIn(false);
      setSession({
        access_token: '',
        refresh_token: '',
        session_token: '',
        expires_in: 0,
        expires_at: 0,
      });
    } catch (err) {
      console.error('error onLogout');
      throw err;
    }
  };

  const onLogin = async () => {
    try {
      console.log('onLogin');
      const login = await axios.post(
        'https://qa-kong.command-api.kw.com/login',
        {
          // TODO: manually add username and password and we'll later make a form for this
          username: 'DOP5000',
          password: 'Rocket$Launchers#9',
        },
      );

      const session = await login.data;
      const loginresponse = await codeToHtml(JSON.stringify(login, null, 2), {
        lang: 'json',
        theme: 'vitesse-dark',
      });
      setLoginResponse(loginresponse);
      setLoggedIn(true);
      setSession({
        ...session,
        expires_at: Date.now() + (session.expires_in - 300) * 1000,
      });
    } catch (err) {
      console.error('error onLogin');
      throw err;
    }
  };

  const onRefreshToken = async () => {
    try {
      console.log('onRefreshToken');
      const refresh = await commandAxios.post('/refresh-token', {
        refresh_token: session.refresh_token,
      });
      const refreshResponse = await codeToHtml(
        JSON.stringify(refresh, null, 2),
        {
          lang: 'json',
          theme: 'vitesse-dark',
        },
      );
      setSession({
        access_token: refresh.data.access_token,
        refresh_token: refresh.data.refresh_token,
        session_token: refresh.data.session_token,
        expires_in: refresh.data.expires_in,
        expires_at: Date.now() + (refresh.data.expires_in - 300) * 1000,
      });
      setRefreshTokenResponse(refreshResponse);
    } catch (err) {
      console.error('error onRefreshToken');
      throw err;
    }
  };

  return (
    <>
      <Stack direction="row" spacing={4}>
        <Button
          colorScheme="teal"
          variant="solid"
          isDisabled={loggedIn}
          onClick={onLogin}
        >
          Login
        </Button>
        <Button
          colorScheme="orange"
          variant="outline"
          isDisabled={!loggedIn}
          onClick={() => {
            Promise.all([onRefreshToken(), onRefreshToken()]);
          }}
        >
          Reset Token
        </Button>
        <Button
          colorScheme="red"
          variant="outline"
          isDisabled={!loggedIn}
          onClick={onLogout}
        >
          Logout
        </Button>
      </Stack>
      <Stack direction="column" spacing={4} overflow={'scroll'}>
        <Card size="lg" width={'1200px'}>
          <CardHeader>
            <Heading size="md">Session Data</Heading>
          </CardHeader>

          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Raw Response From Login
                </Heading>
                <Box
                  overflow={'auto'}
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                  dangerouslySetInnerHTML={{ __html: loginResponse || '' }}
                />
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Raw Response From Refresh Token
                </Heading>
                <Box
                  overflow={'auto'}
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                  dangerouslySetInnerHTML={{
                    __html: refreshTokenResponse || '',
                  }}
                />
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Session
                </Heading>
                <Box
                  overflow={'auto'}
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                  dangerouslySetInnerHTML={{
                    __html: sessionHtml || '',
                  }}
                />
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </Stack>
    </>
  );
};
