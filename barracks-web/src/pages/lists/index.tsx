import { useCallback, useState, useMemo } from 'react';
import { MdPostAdd } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { Alert, Grid, InputField, IconButton, Stack, Stat, useToast } from '@fjlaubscher/matter';
import { CredentialResponse, GoogleLogin } from '@react-oauth/google';
import { useLocalStorage, useDebounce } from 'usehooks-ts';
import { isBefore, isEqual, parseISO } from 'date-fns';
import jwtDecode from 'jwt-decode';

// components
import Avatar from '../../components/avatar';
import Layout from '../../components/layout';
import ListCard from '../../components/list/card';

// data
import { USER } from '../../data/storage';

// hooks
import { useLists } from '../../hooks/list';

import styles from './lists.module.scss';

const Lists = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const {
    data: lists,
    deleteByKey: deleteList,
    deleteAll: deleteAllLists,
    loading: loadingLists
  } = useLists();
  const [user, setUser] = useLocalStorage<Barracks.User | undefined>(USER, undefined);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 250);

  const handleOAuthError = useCallback(() => {
    toast({
      text: 'Error signing in.',
      variant: 'error'
    });
  }, [toast]);

  const handleListDelete = useCallback(
    async (key: string) => {
      await deleteList(key);
      toast({ variant: 'success', text: 'List deleted.' });
    },
    [deleteList, toast]
  );

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

  const handleSignOut = useCallback(async () => {
    setUser(undefined);
    await deleteAllLists();
    toast({ variant: 'success', text: 'Signed out successfully.' });
  }, [toast, deleteAllLists, setUser]);

  const searchedLists = useMemo(() => {
    if (lists) {
      const flattenedLists: Barracks.List[] = Object.keys(lists).map((key) => lists[key]);
      const filteredLists = debouncedSearchTerm
        ? flattenedLists.filter((l) =>
            l.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          )
        : flattenedLists;

      return filteredLists.sort((a, b) => {
        const dateA = parseISO(a.created);
        const dateB = parseISO(b.created);

        if (isEqual(dateA, dateB)) {
          return 0;
        }

        return isBefore(dateA, dateB) ? 1 : -1;
      });
    }

    return [];
  }, [lists, debouncedSearchTerm]);

  const hasLists = useMemo(() => (lists ? Object.keys(lists).length > 0 : false), [lists]);

  const { matches: isTabletOrLarger } = window.matchMedia('(min-width: 768px)');
  const syncText = loadingLists ? 'Syncing...' : 'Synced';

  return (
    <Layout
      title="Army Lists"
      action={
        <IconButton onClick={() => navigate(`/list`)}>
          <MdPostAdd />
        </IconButton>
      }
    >
      <Stack direction="column">
        {!user && (
          <Alert className={styles.alert} variant="info">
            You can sync your public lists across devices by signing in with Google.
          </Alert>
        )}
        <Stack className={styles.header} direction="row">
          <Stat title="Barracks" value="Army Lists" description={syncText} />
          {user ? (
            <Avatar user={user} onSignOut={handleSignOut} />
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
        <Grid className={styles.filters}>
          <InputField
            type="search"
            label="Search"
            onChange={(e) => setSearchTerm(e.currentTarget.value)}
            required
          />
        </Grid>
        {hasLists && (
          <Grid simple>
            {searchedLists.map((list) => (
              <ListCard
                key={list.key}
                list={list}
                onDeleteClick={() => handleListDelete(list.key)}
              />
            ))}
          </Grid>
        )}
      </Stack>
    </Layout>
  );
};

export default Lists;
