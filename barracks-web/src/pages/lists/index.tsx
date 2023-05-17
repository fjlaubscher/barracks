import { useCallback, useEffect, useState } from 'react';
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
import { deletePublicList } from '../../data/use-list';
import usePublicLists from '../../data/use-public-lists';

import styles from './lists.module.scss';

const Lists = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [hasSynced, setHasSynced] = useState(false);
  const [lists, setLists, deleteLists] = useLocalStorage<Barracks.List[]>(LISTS);
  const [user, setUser, deleteUser] = useLocalStorage<Barracks.User>(USER);
  const { lists: publicLists, isLoading } = usePublicLists(user?.id);

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

  const handleSync = useCallback(() => {
    const privateLists = lists ? lists.filter((l) => !l.public) : [];
    const listsByUser = publicLists ? publicLists.map((l) => l.list) : [];

    setLists([...listsByUser, ...privateLists]);
    setHasSynced(true);
  }, [publicLists, lists, setLists]);

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
    [setUser, handleSync]
  );

  useEffect(() => {
    if (user && publicLists && !hasSynced) {
      handleSync();
    }
  }, [user, publicLists, hasSynced, handleSync]);

  const { matches: isTabletOrLarger } = window.matchMedia('(min-width: 768px)');
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
            <Avatar
              user={user}
              onSignOut={() => {
                deleteLists();
                deleteUser();
              }}
            />
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
