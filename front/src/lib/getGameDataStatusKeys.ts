import { GameDataStatus, type GameDataStatusKey } from './types';

export default function getGameDataStatusKeys(): GameDataStatusKey[] {
	const statusKeys: GameDataStatusKey[] = Object.keys(GameDataStatus) as GameDataStatusKey[];
	statusKeys.splice(0, statusKeys.length / 2);

	return statusKeys;
}
