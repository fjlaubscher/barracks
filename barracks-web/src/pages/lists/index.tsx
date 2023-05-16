import { useCallback, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  Alert,
  IconButton,
  Stack,
  Stat,
  useAsync,
  useLocalStorage,
  useToast
} from '@fjlaubscher/matter';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

// components
import Avatar from '../../components/avatar';
import Layout from '../../components/layout';
import ListCard from '../../components/list/card';

// helpers
import { LISTS, USER } from '../../data/storage';
import { getPublicLists, deletePublicList } from '../../helpers/list';

import styles from './lists.module.scss';

const Lists = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [lists, setLists] = useLocalStorage<Barracks.List[]>(LISTS);
  const [user, setUser, deleteUser] = useLocalStorage<Barracks.User>(USER);
  const { matches: isTabletOrLarger } = window.matchMedia('(min-width: 768px)');

  const handleGoogleSignIn = useCallback(
    (credentials: CredentialResponse) => {
      if (credentials.credential) {
        const decodedUser = jwtDecode(credentials.credential) as { [key: string]: string };
        setUser({
          id: decodedUser.sub,
          name: decodedUser.name,
          avatar: decodedUser.picture
        });
        toast({ variant: 'success', text: 'Signed in with Google.' });
      }
    },
    [setUser]
  );

  const handleSyncLists = useCallback(async () => {
    if (user) {
      const publicLists = await getPublicLists(user.id);
      const privateLists = lists ? lists.filter((l) => !l.public) : [];
      const listsByUser = publicLists ? publicLists.map((l) => l.list) : [];
      setLists([...listsByUser, ...privateLists]);
    }

    return undefined;
  }, [user, lists, setLists]);

  const handleOAuthError = useCallback(() => {
    toast({
      text: 'Error signing in.',
      variant: 'error'
    });
  }, [toast]);

  const handleListDelete = useCallback(
    async (key: string) => {
      if (lists) {
        const list = lists.filter((l) => l.key === key)[0];
        if (list.public) {
          await deletePublicList(list.key);
        }

        setLists(lists.filter((l) => l.key !== key));
      }
    },
    [lists, setLists]
  );

  const { status, execute: syncLists } = useAsync(handleSyncLists, [], false);

  const hasLists = lists && lists.length > 0;

  useEffect(() => {
    syncLists();
  }, []);

  return (
    <Layout
      title="Army Lists"
      action={
        <IconButton onClick={() => navigate(`/list`)}>
          <FaPlus />
        </IconButton>
      }
      isLoading={status === 'pending'}
    >
      <Stack direction="column">
        <Alert className={styles.alert} variant="info">
          You can sync your public lists across devices by signing in with Google.
        </Alert>
        <Stack className={styles.header} direction="row">
          <Stat title="Barracks" value="Army Lists" />
          {user ? (
            <Avatar user={user} onSignOut={() => deleteUser()} />
          ) : (
            <GoogleLogin
              shape="circle"
              theme="outline"
              onSuccess={handleGoogleSignIn}
              onError={handleOAuthError}
              type={isTabletOrLarger ? 'standard' : 'icon'}
            />
          )}
        </Stack>
        {hasLists &&
          lists?.map((list) => (
            <ListCard key={list.key} list={list} onDeleteClick={() => handleListDelete(list.key)} />
          ))}
      </Stack>
    </Layout>
  );
};

export default Lists;
