import { useMemo } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { Card, IconButton, Image, Modal, Stack, Stat } from '@fjlaubscher/matter';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

// components
import ArmyUnitCard from '../../components/army/unit-card';
import ContentsModal from '../../components/contents-modal';
import Layout from '../../components/layout';
import Section from '../../components/section';

// helpers
import useArmy from '../../helpers/use-army';

import styles from './army.module.scss';
import { capitalize, slugify } from '../../helpers/text';

const Army = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const { loading, army, units } = useArmy(key!);

  const contents = useMemo(() => {
    if (army && units) {
      return Object.keys(units).reduce(
        (items, type) => ({
          ...items,
          [capitalize(type)]: Object.keys(units[type]).map((role) => ({
            text: role,
            href: `#${type}-${slugify(role)}`
          }))
        }),
        {
          Rules: [{ text: army.name, href: `#rules` }]
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
      title="Army"
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
          <Stack className={styles.header} direction="column">
            <Image className={styles.image} src={army.image} alt={army.name} />
            <Stack id="rules" className={styles.rules} direction="column">
              <Stat title="Rules" value={army.name} />
              {army.rules.map((rule, i) => (
                <Card key={`army-rule-${i}`} title={rule.name}>
                  <p>{rule.description}</p>
                </Card>
              ))}
            </Stack>
          </Stack>
          {Object.keys(units).map((type) => (
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
