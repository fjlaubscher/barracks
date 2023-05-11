import { Stack, Stat, capitalize, slugify } from '@fjlaubscher/matter';
import { useMemo } from 'react';
import { useParams } from 'react-router-dom';

// components
import BackButton from '../../components/button/back';
import ContentsModal from '../../components/contents-modal';
import Layout from '../../components/layout';
import Section from '../../components/section';

// helpers
import useCore from '../../data/use-core';
import { formatDate } from '../../helpers/date';

import styles from './rules.module.scss';

const SpecialRules = () => {
  const { key } = useParams();
  const { data, loading } = useCore();
  const category = key ? capitalize(key) : '';

  const contents = useMemo(() => {
    if (key && data?.rules && data.rules[key]) {
      return {
        [category]: data.rules[key].map(
          (r) =>
            ({
              text: r.name,
              href: `#${slugify(r.name)}`
            } as Barracks.ItemLink)
        )
      };
    }

    return undefined;
  }, [category, data, key]);

  const categoryName = category.slice(0, category.length - 1);
  const title = `${categoryName} Special Rules`;

  return (
    <Layout title={title} description={`View the ${title}`} isLoading={loading}>
      {key && data && (
        <Stack direction="column">
          {contents && <ContentsModal items={contents} />}
          <Stat
            title="Barracks"
            value={title}
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
