import { useMemo } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { IconButton, Grid, Stack, Stat, capitalize, slugify, Image } from '@fjlaubscher/matter';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

// components
import ArmyUnitCard from '../../components/army/unit-card';
import BackButton from '../../components/button/back';
import Card from '../../components/card';
import ContentsModal from '../../components/contents-modal';
import Layout from '../../components/layout';
import Section from '../../components/section';

// helpers
import useArmy from '../../data/use-army';
import { formatDate } from '../../helpers/date';
import { speakText } from '../../helpers/speech-synthesis';

import styles from './rules.module.scss';

const Army = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const { loading, army, units } = useArmy(key!);

  const contents = useMemo(() => {
    if (army && units) {
      return Object.keys(units)
        .filter((k) => k !== 'lastUpdated')
        .reduce(
          (items, type) => ({
            ...items,
            [capitalize(type)]: Object.keys(units[type]).map((role) => ({
              text: role,
              href: `#${type}-${slugify(role)}`
            }))
          }),
          {
            Army: [{ text: army.name, href: `#army` }]
          }
        );
    }

    return undefined;
  }, [army, units]);

  if (!loading && !army) {
    return <Navigate to="/404" />;
  }

  return (
    <Layout
      title={army?.name || 'Army'}
      description={`View the Bolt Action units and rules of ${army?.name}.`}
      image={army ? `https://barracks.francoislaubscher.dev${army.image}` : undefined}
      action={
        <IconButton onClick={() => navigate(`/list?army=${key}`)}>
          <FaFileAlt />
        </IconButton>
      }
      isLoading={loading}
    >
      {army && contents && units && (
        <Stack direction="column">
          <ContentsModal items={contents} />
          <Stack direction="column">
            <div id="army" className={styles.hero}>
              <Stack direction="column">
                <Stat
                  title="Barracks"
                  value={army.name}
                  description={`Last updated: ${formatDate(units.lastUpdated)}`}
                />
                <BackButton to="/rules/armies" />
              </Stack>
              <Image className={styles.book} src={army.image} alt={army.name} />
            </div>
            <Section title="Army Special Rules" description={army.name}>
              <Grid className={styles.rulesGrid} simple>
                {army.rules.map((rule, i) => (
                  <Card
                    key={`army-rule-${i}`}
                    title={rule.name}
                    onSpeakClick={() => speakText(rule.description)}
                  >
                    <p>{rule.description}</p>
                  </Card>
                ))}
              </Grid>
            </Section>
          </Stack>
          {Object.keys(units)
            .filter((k) => k !== 'lastUpdated')
            .map((type) => (
              <Stack key={`unit-type-${type}`} direction="column">
                {Object.keys(units[type]).map((role, i) => (
                  <Section
                    id={`${type}-${slugify(role)}`}
                    key={`${type}-role-${i}`}
                    title={type}
                    description={role}
                  >
                    {units[type][role].map((unit, unitIndex) => (
                      <ArmyUnitCard key={`unit-${unitIndex}`} unit={unit} />
                    ))}
                  </Section>
                ))}
              </Stack>
            ))}
        </Stack>
      )}
    </Layout>
  );
};

export default Army;
