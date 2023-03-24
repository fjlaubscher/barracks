import { Stack, Stat } from '@fjlaubscher/matter';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

// components
import BackButton from '../../components/button/back';
import ContentsModal from '../../components/contents-modal';
import Layout from '../../components/layout';
import Section from '../../components/section';

// helpers
import { formatDate } from '../../helpers/date';
import { capitalize, slugify } from '../../helpers/text';
import useCore from '../../helpers/use-core';

import styles from './rules.module.scss';

const SpecialRules = () => {
  const { key } = useParams();
  const { data, loading } = useCore();
  const category = key ? capitalize(key) : '';

  const contents = useMemo(() => {
    if (key && data?.rules[key]) {
      return {
        [category]: data.rules[key].map((r) => ({
          text: r.name,
          href: `#${slugify(r.name)}`
        }))
      };
    }

    return { key: [] };
  }, [category, data, key]);

  return (
    <Layout title="Rules" isLoading={loading}>
      {key && data && (
        <Stack direction="column">
          <ContentsModal items={contents} />
          <Stat
            title="Rules"
            value={`${category.slice(0, category.length - 1)} Special Rules`}
            description={`Last updated: ${formatDate(data?.lastUpdated)}`}
          />
          <BackButton to="/rules" />
          {data.rules[key].map((r, i) => (
            <Section key={`rule-${i}`} id={slugify(r.name)} title={category} description={r.name}>
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
