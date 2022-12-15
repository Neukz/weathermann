type TimeOfDay = 'night' | 'morning' | 'afternoon' | 'evening';

// Hours mapped to time of day
export const timeOfDay = new Map<string, TimeOfDay>([
	['00', 'night'],
	['09', 'morning'],
	['15', 'afternoon'],
	['21', 'evening']
]);
