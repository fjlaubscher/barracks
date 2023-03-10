import { useCallback } from 'react';
import classnames from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { FaListAlt, FaShareAlt } from 'react-icons/fa';
import { GiBarracks, GiTank } from 'react-icons/gi';
import { Helmet } from 'react-helmet';
import { Button, Layout, useToast } from '@fjlaubscher/matter';

// components
import LinkButton from '../button/link';

import styles from './layout.module.scss';

interface Props {
  children: React.ReactNode;
  title: string;
  description?: string;
  image?: string;
  action?: React.ReactNode;
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
  const { pathname } = useLocation();
  const toast = useToast();

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
      toast({
        variant: 'error',
        text: ex.message || 'Unable to share'
      });
    }
  }, [pathname, toast]);

  return (
    <Layout
      action={action}
      title={title}
      home={
        <Link className={styles.home} to="/">
          <GiBarracks />
        </Link>
      }
      menu={
        <>
          <LinkButton
            leftIcon={<GiBarracks />}
            className={classnames(styles.action, pathname === '/' ? styles.active : undefined)}
            to="/"
          >
            Home
          </LinkButton>
          <LinkButton
            leftIcon={<GiTank />}
            className={classnames(
              styles.action,
              pathname.includes('/arm') ? styles.active : undefined
            )}
            to="/armies"
          >
            Armies
          </LinkButton>
          <LinkButton
            leftIcon={<FaListAlt />}
            className={classnames(
              styles.action,
              pathname.includes('/list') ? styles.active : undefined
            )}
            to="/lists"
          >
            Lists
          </LinkButton>
          <Button
            leftIcon={<FaShareAlt />}
            className={styles.action}
            onClick={onShareClick || handleShare}
          >
            Share
          </Button>
        </>
      }
      isLoading={isLoading}
    >
      <Helmet>
        <title>{title} | Barracks</title>
        <meta property="og:title" content={`${title} | Crusader`} />
        {description && <meta name="description" content={description} />}
        {description && <meta property="og:description" content={description} />}
        {image && <meta property="og:image" content={image} />}
      </Helmet>
      {children}
    </Layout>
  );
};

export default AppLayout;
