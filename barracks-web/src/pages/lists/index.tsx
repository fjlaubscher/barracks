import { useCallback, useEffect, useState, useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Alert, IconButton, Stack, Stat, useToast } from '@fjlaubscher/matter';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { useLocalStorage } from 'usehooks-ts';
import { isBefore, isEqual, parseISO } from 'date-fns';

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
  const [storedLists, setLists] = useLocalStorage<Barracks.List[] | undefined>(LISTS, undefined);
  const [user, setUser] = useLocalStorage<Barracks.User | undefined>(USER, undefined);
  const { lists: publicLists, isLoading } = usePublicLists(user?.id);

  const handleOAuthError = useCallback(() => {
    toast({
      text: 'Error signing in.',
      variant: 'error'
    });
  }, [toast]);

  const handleListDelete = useCallback(
    async (key: string) => {
      if (storedLists) {
        const list = storedLists.filter((l) => l.key === key)[0];
        if (list.public) {
          await deletePublicList(list.key);
        }

        setLists(storedLists.filter((l) => l.key !== key));
      }
    },
    [storedLists, setLists]
  );

  const handleSync = useCallback(() => {
    const privateLists = storedLists ? storedLists.filter((l) => !l.public) : [];
    const listsByUser = publicLists ? publicLists.map((l) => l.list) : [];

    setLists([...listsByUser, ...privateLists]);
    setHasSynced(true);
  }, [publicLists, storedLists, setLists]);

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

  const lists = useMemo(() => {
    return storedLists
      ? storedLists.sort((a, b) => {
          const dateA = parseISO(a.created);
          const dateB = parseISO(b.created);

          if (isEqual(dateA, dateB)) {
            return 0;
          }

          return isBefore(dateA, dateB) ? 1 : -1;
        })
      : [];
  }, [storedLists]);

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
                localStorage.removeItem(LISTS);
                localStorage.removeItem(USER);
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
