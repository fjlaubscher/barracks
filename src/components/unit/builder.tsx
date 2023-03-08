import { useCallback, useEffect, useMemo, useState } from 'react';
import { SelectField, Stack } from '@fjlaubscher/matter';
import { useRecoilState } from 'recoil';

// components
import NumberField from '../field/number';

// helpers
import { capitalize } from '../../helpers/text';

// state
import { ListUnitAtom } from '../../state/list';

import styles from './unit.module.scss';

interface Props {
  units: Barracks.Unit[];
}

interface SelectedOptions {
  [index: number]: number;
}

const UnitBuilder = ({ units }: Props) => {
  const [listUnit, setListUnit] = useRecoilState(ListUnitAtom);

  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [selectedVeterancyIndex, setSelectedVeterancyIndex] = useState(0);

  const unitOptions = useMemo(
    () => units.map((unit, i) => ({ value: i, description: unit.name } as matter.Option)),
    [units]
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

  const memoedListUnit = useMemo(() => {
    const unit = units[selectedUnitIndex];
    const profile = unit.profiles[selectedProfileIndex];
    const veterancy = Object.keys(profile.cost)[selectedVeterancyIndex];

    const options = Object.keys(selectedOptions).map((key) => {
      const index = parseInt(key);
      const amount = selectedOptions[index];
      const option = unit.options[index];

      return { option, amount } as Barracks.List.UnitOption;
    });

    return {
      key: '',
      unit,
      options,
      points: 0,
      profile,
      veterancy
    } as Barracks.List.Unit;
  }, [units, selectedUnitIndex, selectedProfileIndex, selectedVeterancyIndex, selectedOptions]);

  useEffect(() => {
    setListUnit(memoedListUnit);
  }, [memoedListUnit, setListUnit]);

  return (
    <Stack className={styles.form} direction="column">
      <SelectField
        label="Unit"
        name="unit"
        value={selectedUnitIndex}
        onChange={handleSelectedUnitChange}
        options={unitOptions}
      />
      {unitProfileOptions.length > 1 ? (
        <SelectField
          label="Profile"
          name="profile"
          value={selectedProfileIndex}
          onChange={setSelectedProfileIndex}
          options={unitProfileOptions}
        />
      ) : undefined}
      {unitVeterancyOptions.length > 1 ? (
        <SelectField
          label="Veterancy"
          name="veterancy"
          value={selectedVeterancyIndex}
          onChange={setSelectedVeterancyIndex}
          options={unitVeterancyOptions}
        />
      ) : undefined}
      {units[selectedUnitIndex].options.length > 0 ? <h3>Options</h3> : undefined}
      {units[selectedUnitIndex].options.map((o, i) => (
        <NumberField
          className={styles.option}
          key={`unit-${selectedUnitIndex}-${i}`}
          label={o.name}
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
