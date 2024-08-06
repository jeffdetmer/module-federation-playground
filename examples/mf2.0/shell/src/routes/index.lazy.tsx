import commandAxios, { initCommandAxios } from '@/utils/commandAxios';
import { getUserSession } from '@/utils/getUserSession';
import { logout } from '@/utils/logout';
import { saveUserSession } from '@/utils/saveUserSession';
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
import Cookies from 'js-cookie';

import { useEffect, useState } from 'react';
import { codeToHtml } from 'shiki';

export const Route = createLazyFileRoute('/')({
  component: () => <Index />,
});

interface UserInfo {
  id: string;
  type: string;
  attributes: {
    first_name: string;
    last_name: string;
    email: string | null;
    phone: string;
    office_ids: number[];
    orgs: {
      org_id: number;
      org_key: string;
      org_name: string;
    }[];
  };
}
interface UserInfoResponse {
  data: UserInfo;
}

const Index = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [session, setSession] = useState(getUserSession());
  const [loginResponse, setLoginResponse] = useState<string | undefined>();
  const [refreshTokenResponse, setRefreshTokenResponse] = useState<
    string | undefined
  >();
  const [sessionHtml, setSessionHtml] = useState<string | undefined>();
  const [user, setUser] = useState<string | undefined>();

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

  const onLogout = async () => {
    try {
      console.log('onLogout');
      const commandAxios = initCommandAxios('production');
      commandAxios.get(
        `https://kong.command-api.kw.com/oidc/end-session?post_logout_redirect_uri=${encodeURI('http://localhost:3000/')}&id_token_hint=${session.access_token}`,
      );
      setLoggedIn(false);
      logout('/login');
    } catch (err) {
      console.error('error onLogout');
    }
  };

  const onLogin = async () => {
    try {
      console.log('onLogin');
      const login = await fetch('https://kong.command-api.kw.com/login', {
        method: 'POST',
        referrerPolicy: 'origin',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          // TODO: manually add username and password and we'll later make a form for this
          username: '',
          password: '',
        }),
      });

      const session = await login.json();
      const loginresponse = await codeToHtml(JSON.stringify(login, null, 2), {
        lang: 'json',
        theme: 'vitesse-dark',
      });

      setLoginResponse(loginresponse);
      setLoggedIn(true);
      await saveUserSession({
        ...session,
        expires_at: Date.now() + (session.expires_in - 300) * 1000,
        is_locked: false,
      });
      setSession(getUserSession());
    } catch (err) {
      console.error('error onLogin');
    }
  };

  const onRefreshToken = async () => {
    try {
      console.log('onRefreshToken');
      const commandAxios = initCommandAxios('production');
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
      setRefreshTokenResponse(refreshResponse);
      await saveUserSession({
        ...refresh.data,
        expires_at: Date.now() + (refresh.data.expires_in - 300) * 1000,
        is_locked: false,
      });
      setSession(getUserSession());
    } catch (err) {
      console.error('error onRefreshToken');
    }
  };

  const onUserInfo = async () => {
    try {
      console.log('onUserInfo');
      const userInfo = await commandAxios.get<UserInfoResponse>('/users/me', {
        headers: {
          'x-kwri-client-id': 'ui-console-login',
        },
      });
      Cookies.set('user_details', JSON.stringify(userInfo.data.data), {
        domain: 'localhost',
        sameSite: 'Lax',
        secure: false,
      });
      const userHtml = await codeToHtml(
        JSON.stringify(userInfo.data.data, null, 2),
        { lang: 'json', theme: 'vitesse-dark' },
      );
      setUser(userHtml);
    } catch (err) {
      console.error('error onUserInfo');
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
          colorScheme="purple"
          variant="outline"
          isDisabled={!loggedIn}
          onClick={onUserInfo}
        >
          Get User Info
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
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: using to integrate with the output of shiki's codeToHtml function
                  dangerouslySetInnerHTML={{ __html: loginResponse || '' }}
                />
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  Raw Response From Refresh Token
                </Heading>
                <Box
                  overflow={'auto'}
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: using to integrate with the output of shiki's codeToHtml function
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
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: using to integrate with the output of shiki's codeToHtml function
                  dangerouslySetInnerHTML={{
                    __html: sessionHtml || '',
                  }}
                />
              </Box>
              <Box>
                <Heading size="xs" textTransform="uppercase">
                  User Info
                </Heading>
                <Box
                  overflow={'auto'}
                  // biome-ignore lint/security/noDangerouslySetInnerHtml: using to integrate with the output of shiki's codeToHtml function
                  dangerouslySetInnerHTML={{
                    __html: user || '',
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
