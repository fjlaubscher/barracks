import { useCallback, useMemo, useState } from 'react';
import { Button, SelectField, Stack } from '@fjlaubscher/matter';
import { FaSave } from 'react-icons/fa';

// components
import NumberField from '../field/number';

import styles from './unit.module.scss';
import UnitCard from './card';

interface Props {
  units: Barracks.Unit[];
  onSubmit: (listUnit: Omit<Barracks.List.Unit, 'key' | 'points'>) => void;
}

interface SelectedOptions {
  [index: number]: number;
}

const UnitForm = ({ units, onSubmit }: Props) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const [selectedUnitIndex, setSelectedUnitIndex] = useState(0);
  const [selectedProfileIndex, setSelectedProfileIndex] = useState(0);
  const [selectedVeterancyIndex, setSelectedVeterancy] = useState(0);

  const selectedUnit = useMemo(() => units[selectedUnitIndex], [units, selectedUnitIndex]);
  const selectedUnitProfile = useMemo(
    () => selectedUnit.profiles[selectedProfileIndex],
    [selectedUnit, selectedProfileIndex]
  );
  const selectedVeterancy = useMemo(
    () => Object.keys(selectedUnitProfile.cost)[selectedVeterancyIndex],
    [selectedUnitProfile, selectedVeterancyIndex]
  );
  const selectedUnitOptions = useMemo(
    () =>
      Object.keys(selectedOptions).map((key) => {
        const index = parseInt(key);
        const amount = selectedOptions[index];
        const option = selectedUnit.options[index];

        return { option, amount } as Barracks.List.UnitOption;
      }),
    [selectedOptions]
  );

  const unitOptions = useMemo(
    () => units.map((unit, i) => ({ value: i, description: unit.name } as matter.Option)),
    [units]
  );
  const unitProfileOptions = useMemo(
    () =>
      selectedUnit.profiles.map(
        (profile, i) => ({ value: i, description: profile.name } as matter.Option)
      ),
    [selectedUnit]
  );

  const handleSubmit = useCallback(() => {
    const unitWithoutPoints: Omit<Barracks.List.Unit, 'key' | 'points'> = {
      unit: selectedUnit,
      profile: selectedUnitProfile,
      options: selectedUnitOptions,
      veterancy: selectedVeterancy
    };

    onSubmit(unitWithoutPoints);
  }, [selectedUnit, selectedOptions, onSubmit]);

  return (
    <Stack className={styles.form} direction="column">
      <UnitCard
        listUnit={{
          options: selectedUnitOptions,
          profile: selectedUnitProfile,
          unit: selectedUnit,
          veterancy: selectedVeterancy,
          points: 0
        }}
      />
      <SelectField
        label="Unit"
        name="unit"
        value={selectedUnitIndex}
        onChange={setSelectedUnitIndex}
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
      {selectedUnit.options.map((o, i) => (
        <NumberField
          className={styles.option}
          key={`unit-${selectedUnitIndex}-${i}`}
          label={o.name}
          name={`unit-${selectedUnitIndex}-${i}`}
          maximum={o.max}
          value={selectedOptions[i] || 0}
          onChange={(value) => setSelectedOptions({ ...selectedOptions, [i]: value })}
        />
      ))}
      <Button leftIcon={<FaSave />} onClick={handleSubmit}>
        Save
      </Button>
    </Stack>
  );
};

export default UnitForm;
