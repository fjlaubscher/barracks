import { useParams } from 'react-router-dom';

// components
import Section from '../../components/section';

// hooks
import { useList } from '../../hooks/list';

const PrintList = () => {
  const { key } = useParams();

  const { data: list, isOwner, loading: loadingList } = useList(key);

  if (!loadingList && list?.public === false && !isOwner) {
    return null;
  }

  return (
    <div>
      {list &&
        Object.keys(list.units).map((type) => (
          <div key={`unit-type-${type}`}>
            {Object.keys(list.units[type]).map((role, i) =>
              list.units[type][role].length > 0 ? (
                <Section key={`${type}-role-${i}`} title={type} description={role}>
                  {list.units[type][role].map((unit, i) => (
                    <p key={`unit-${i}`}>{unit.profile.name}</p>
                  ))}
                </Section>
              ) : undefined
            )}
          </div>
        ))}
    </div>
  );
};

export default PrintList;
