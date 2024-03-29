import { useCallback } from 'react';
import type { ReactNode } from 'react';
import classnames from 'classnames';
import { useLocation, Link } from 'react-router-dom';
import { MdMenuBook, MdShare, MdChevronRight } from 'react-icons/md';
import { GiBarracks, GiTank } from 'react-icons/gi';
import { Helmet } from 'react-helmet';
import { Button, Layout, useToast } from '@fjlaubscher/matter';

// components
import LinkButton from '../LinkButton';

import styles from './AppLayout.module.scss';

interface Props {
  children: ReactNode;
  title: string;
  description?: string;
  image?: string;
  action?: ReactNode;
  isLoading?: boolean;
  onShareClick?: () => void;
}

const AppLayout = ({
  children,
  title,
  description,
  image,
  action,
  isLoading,
  onShareClick
}: Props) => {
  const toast = useToast();
  const { pathname } = useLocation();

  const handleShare = useCallback(async () => {
    try {
      const shareLink = `${window.location.origin}${pathname}`;
      const shareData: ShareData = {
        title: 'Barracks',
        text: title,
        url: shareLink
      };

      if (!navigator.canShare || !navigator.canShare(shareData)) {
        await navigator.clipboard.writeText(shareLink);
        toast({
          variant: 'success',
          text: 'Link copied to your clipboard'
        });
      } else {
        await navigator.share(shareData);
        toast({
          variant: 'success',
          text: 'Shared'
        });
      }
    } catch (ex: any) {
      // do nothing
    }
  }, [pathname, toast]);

  return (
    <Layout
      action={<div className={styles.navAction}>{action}</div>}
      title=""
      home={
        <Link className={styles.home} to="/">
          <GiBarracks />
        </Link>
      }
      menu={
        <>
          <LinkButton
            className={classnames(styles.action, pathname === '/' ? styles.active : undefined)}
            to="/"
          >
            <GiBarracks /> Home
            <MdChevronRight className={styles.chevron} />
          </LinkButton>
          <LinkButton
            className={classnames(
              styles.action,
              pathname.includes('/list') ? styles.active : undefined
            )}
            to="/lists"
          >
            <GiTank />
            Army Lists
            <MdChevronRight className={styles.chevron} />
          </LinkButton>
          <LinkButton
            className={classnames(
              styles.action,
              pathname.includes('/rules') ? styles.active : undefined
            )}
            to="/rules"
          >
            <MdMenuBook />
            Rules
            <MdChevronRight className={styles.chevron} />
          </LinkButton>
          <Button className={styles.action} onClick={onShareClick || handleShare}>
            <MdShare />
            Share
            <MdChevronRight className={styles.chevron} />
          </Button>
        </>
      }
      isLoading={isLoading}
    >
      <Helmet>
        <title>{title} | Barracks</title>
        <meta property="og:title" content={`${title} | Barracks`} />
        <meta property="description" content={description} />
        <meta property="og:description" content={description} />
        <meta
          property="og:image"
          content={image || 'https://barracks.francoislaubscher.dev/android-icon.png'}
        />
      </Helmet>
      {children}
    </Layout>
  );
};

export default AppLayout;
