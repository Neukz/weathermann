import { useLocalStorage } from 'react-use';

export type Units = 'metric' | 'imperial';

export const useUnits = () => {
	const [units, setUnits] = useLocalStorage<Units>('units', 'metric');

	const toggleUnits = () => {
		setUnits(units === 'metric' ? 'imperial' : 'metric');
	};

	return [units, toggleUnits] as [Units, () => void];
};
