import { useCallback } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Alert, IconButton, Stack, Stat, useLocalStorage, useToast } from '@fjlaubscher/matter';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';

// components
import Avatar from '../../components/avatar';
import Layout from '../../components/layout';
import ListCard from '../../components/list/card';

// helpers
import { LISTS, USER } from '../../data/storage';
import { deletePublicList } from '../../data/use-public-list';
import usePublicLists from '../../data/use-public-lists';

import styles from './lists.module.scss';

const Lists = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { isLoading } = usePublicLists();

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

  const hasLists = lists && lists.length > 0;

  return (
    <Layout
      title="Army Lists"
      action={
        <IconButton onClick={() => navigate(`/list`)}>
          <FaPlus />
        </IconButton>
      }
      isLoading={isLoading}
    >
      <Stack direction="column">
        {!user && (
          <Alert className={styles.alert} variant="info">
            You can sync your public lists across devices by signing in with Google.
          </Alert>
        )}
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
