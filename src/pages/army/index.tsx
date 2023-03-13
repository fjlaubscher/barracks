import { useState } from 'react';
import { FaLayerGroup, FaFileAlt } from 'react-icons/fa';
import { Card, IconButton, Image, Modal, Stack, Stat } from '@fjlaubscher/matter';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

// components
import Layout from '../../components/layout';

// helpers
import useArmy from '../../helpers/use-army';

import styles from './army.module.scss';
import { capitalize, slugify } from '../../helpers/text';
import ArmyUnitCard from '../../components/army/unit-card';

const Army = () => {
  const { key } = useParams();
  const navigate = useNavigate();
  const { loading, army, units } = useArmy(key!);
  const [showContents, setShowContents] = useState(false);

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
      {army && units && (
        <Stack direction="column">
          <IconButton
            className={styles.contentsButton}
            onClick={() => setShowContents(!showContents)}
          >
            <FaLayerGroup />
          </IconButton>
          <Modal visible={showContents}>
            <ul className={styles.contents}>
              {Object.keys(units).map((type) => (
                <li key={`contents-${type}`}>
                  {capitalize(type)}
                  <ul>
                    {Object.keys(units[type]).map((role, i) => (
                      <li key={`contents-${type}-${i}`}>
                        <a
                          href={`#${type}-${slugify(role)}`}
                          onClick={() => setShowContents(false)}
                        >
                          {role}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </Modal>
          <Stack className={styles.header} direction="column">
            <Image className={styles.image} src={army.image} alt={army.name} />
            <Stack className={styles.rules} direction="column">
              <Stat title={army.name} value="Rules" />
              {army.rules.map((rule, i) => (
                <Card key={`army-rule-${i}`} title={rule.name}>
                  {rule.description}
                </Card>
              ))}
            </Stack>
          </Stack>
          {Object.keys(units).map((type) => (
            <Stack key={`unit-type-${type}`} direction="column">
              {Object.keys(units[type]).map((role, i) => (
                <div id={`${type}-${slugify(role)}`} key={`${type}-role-${i}`}>
                  <Stack direction="column">
                    <Stat className={styles.heading} title={type} value={role} />
                    {units[type][role].map((unit, unitIndex) => (
                      <ArmyUnitCard key={`unit-${unitIndex}`} unit={unit} />
                    ))}
                  </Stack>
                </div>
              ))}
            </Stack>
          ))}
        </Stack>
      )}
    </Layout>
  );
};

export default Army;
