import { Stack, Stat } from '@fjlaubscher/matter';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

// components
import BackButton from '../../components/button/back';
import ContentsModal from '../../components/contents-modal';
import Layout from '../../components/layout';
import Section from '../../components/section';

// helpers
import { capitalize, slugify } from '../../helpers/text';
import useCore from '../../helpers/use-core';

import styles from './rules.module.scss';

const SpecialRules = () => {
  const { key } = useParams();
  const { data, loading } = useCore();

  const contents = useMemo(() => {
    if (key && data?.rules[key]) {
      return {
        [capitalize(key)]: data.rules[key].map((r) => ({
          text: r.name,
          href: `#${slugify(r.name)}`
        }))
      };
    }

    return { key: [] };
  }, [data, key]);

  return (
    <Layout title="Rules" isLoading={loading}>
      {key && data && (
        <Stack direction="column">
          <ContentsModal items={contents} />
          <Stat
            title="Special Rules"
            value={capitalize(key)}
            description="Last updated: 23 March 2023"
          />
          <BackButton to="/rules" />
          {data.rules[key].map((r, i) => (
            <Section key={`rule-${i}`} id={slugify(r.name)} title="Weapons" description={r.name}>
              <div
                className={styles.keywords}
                dangerouslySetInnerHTML={{ __html: r.description }}
              />
            </Section>
          ))}
        </Stack>
      )}
    </Layout>
  );
};

export default SpecialRules;
