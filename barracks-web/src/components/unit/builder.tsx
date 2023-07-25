import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { SelectField, Stack, capitalize } from '@fjlaubscher/matter';
import { useRecoilState } from 'recoil';

// components
import NumberField from '../field/number';

// helpers
import { transformToListUnit } from '../../helpers/unit';

// state
import { UnitBuilderAtom } from '../../state/unit-builder';

import styles from './unit.module.scss';

type SelectedOptions = {
  [index: number]: number;
};

export interface Props {
  units: Barracks.Unit[];
  initialValues?: {
    unitIndex: number;
    profileIndex: number;
    veterancyIndex: number;
    options: SelectedOptions;
  };
}

const UnitBuilder = ({ units, initialValues }: Props) => {
  const [payload, setUnitBuilderPayload] = useRecoilState(UnitBuilderAtom);
  const { unit: listUnit } = payload;

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>(
    initialValues?.options || {}
  );
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(initialValues?.unitIndex || 0);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(
    initialValues?.profileIndex || 0
  );
  const [selectedVeterancyIndex, setSelectedVeterancyIndex] = useState(
    initialValues?.veterancyIndex || 0
  );

  const sortedUnits = useMemo(
    () =>
      units.sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      }),
    [units]
  );
  const unitOptions = useMemo(
    () => sortedUnits.map((unit, i) => ({ value: i, description: unit.name } as matter.Option)),
    [sortedUnits]
  );
  const unitProfileOptions = useMemo(
    () =>
      listUnit
        ? listUnit.unit.profiles.map(
            (profile, i) => ({ value: i, description: profile.name } as matter.Option)
          )
        : [],
    [listUnit]
  );
  const unitVeterancyOptions = useMemo(
    () =>
      listUnit
        ? Object.keys(listUnit.profile.cost).map(
            (veterancy, i) => ({ value: i, description: capitalize(veterancy) } as matter.Option)
          )
        : [],
    [listUnit]
  );

  const handleSelectedUnitChange = useCallback(
    (value: number) => {
      setSelectedUnitIndex(value);
      setSelectedProfileIndex(0);
      setSelectedVeterancyIndex(0);
      setSelectedOptions({});
    },
    [setSelectedUnitIndex, selectedProfileIndex, selectedVeterancyIndex, setSelectedOptions]
  );

  const handleUnitOptionChange = useCallback(
    (optionIndex: number, amount: number) => {
      const newSelectedOptions = { ...selectedOptions, [optionIndex]: amount };

      if (!amount) {
        delete newSelectedOptions[optionIndex];
      }

      setSelectedOptions(newSelectedOptions);
    },
    [selectedOptions, setSelectedOptions]
  );

  const memoedListUnit = useMemo(
    () =>
      transformToListUnit(
        sortedUnits[selectedUnitIndex],
        selectedProfileIndex,
        selectedVeterancyIndex,
        selectedOptions
      ),
    [sortedUnits, selectedUnitIndex, selectedProfileIndex, selectedVeterancyIndex, selectedOptions]
  );

  const handleSelectOnChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>, onChange: (value: number) => void) => {
      const value = parseInt(e.target.value);

      if (!isNaN(value)) {
        onChange(value);
      }
    },
    []
  );

  useEffect(() => {
    setUnitBuilderPayload({ ...payload, unit: memoedListUnit });
  }, [memoedListUnit, setUnitBuilderPayload]);

  return (
    <Stack className={styles.form} direction="column">
      <SelectField
        label="Unit"
        name="unit"
        value={selectedUnitIndex}
        onChange={(e) => handleSelectOnChange(e, handleSelectedUnitChange)}
        options={unitOptions}
        required
        data-testid="unit-builder-unit"
      />
      {unitProfileOptions.length > 1 ? (
        <SelectField
          label="Profile"
          name="profile"
          value={selectedProfileIndex}
          onChange={(e) => handleSelectOnChange(e, setSelectedProfileIndex)}
          options={unitProfileOptions}
          required
          data-testid="unit-builder-profile"
        />
      ) : undefined}
      {unitVeterancyOptions.length > 1 ? (
        <SelectField
          label="Veterancy"
          name="veterancy"
          value={selectedVeterancyIndex}
          onChange={(e) => handleSelectOnChange(e, setSelectedVeterancyIndex)}
          options={unitVeterancyOptions}
          required
          data-testid="unit-builder-veterancy"
        />
      ) : undefined}
      {sortedUnits[selectedUnitIndex].options.length > 0 ? <h3>Options</h3> : undefined}
      {sortedUnits[selectedUnitIndex].options.map((o, i) => (
        <NumberField
          className={styles.option}
          key={`unit-${selectedUnitIndex}-${i}`}
          label={`${o.name} (${o.cost[memoedListUnit.veterancy]} ${
            o.cost[memoedListUnit.veterancy] > 1 ? 'pts' : 'pt'
          })`}
          name={`unit-${selectedUnitIndex}-${i}`}
          maximum={o.max}
          value={selectedOptions[i] || 0}
          onChange={(value) => handleUnitOptionChange(i, value)}
        />
      ))}
    </Stack>
  );
};

export default UnitBuilder;
