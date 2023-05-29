import { useCallback, useEffect, useState, useMemo } from 'react';
import { FaPlus } from 'react-icons/fa';
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
import { LISTS, USER } from '../../data/storage';
import { deletePublicList } from '../../data/use-list';
import usePublicLists from '../../data/use-public-lists';

import styles from './lists.module.scss';

const Lists = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [storedLists, setStoredLists] = useLocalStorage<Barracks.List[] | undefined>(
    LISTS,
    undefined
  );
  const [user, setUser] = useLocalStorage<Barracks.User | undefined>(USER, undefined);
  const { lists: publicLists, isLoading } = usePublicLists(user?.id);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce<string>(searchTerm, 250);

  const handleOAuthError = useCallback(() => {
    toast({
      text: 'Error signing in.',
      variant: 'error'
    });
  }, [toast]);

  const handleListDelete = useCallback(
    (key: string) => {
      if (storedLists) {
        const list = storedLists.filter((l) => l.key === key)[0];
        if (list.public) {
          // deliberately ignore the promise
          deletePublicList(key);
        }

        setStoredLists(storedLists.filter((l) => l.key !== key));
        toast({ variant: 'success', text: 'List deleted.' });
      }
    },
    [storedLists, setStoredLists, toast]
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

  const handleSignOut = useCallback(() => {
    setUser(undefined);
    setStoredLists(undefined);
    toast({ variant: 'success', text: 'Signed out successfully.' });
  }, [toast, setStoredLists, setUser]);

  const handleListsSync = useCallback(
    (publicLists?: Barracks.PublicList[]) => {
      const privateLists = storedLists ? storedLists.filter((l) => !l.public) : [];
      const listsByUser = publicLists ? publicLists.map((l) => l.list) : [];

      setStoredLists([...privateLists, ...listsByUser]);
    },
    [storedLists, setStoredLists]
  );

  useEffect(() => {
    handleListsSync(publicLists);
  }, [publicLists]);

  const lists = useMemo(() => {
    if (storedLists) {
      const filteredLists = debouncedSearchTerm
        ? storedLists.filter((l) =>
            l.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
          )
        : storedLists;

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
  }, [storedLists, debouncedSearchTerm]);

  const { matches: isTabletOrLarger } = window.matchMedia('(min-width: 768px)');
  const hasLists = lists && lists.length > 0;
  const syncText = user ? (isLoading ? 'Syncing...' : 'Synced') : undefined;

  return (
    <Layout
      title="Army Lists"
      action={
        <IconButton onClick={() => navigate(`/list`)}>
          <FaPlus />
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
            {lists?.map((list) => (
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
