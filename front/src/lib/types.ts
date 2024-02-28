export type GameData = {
	rawgId: string;
	title: string;
	status: GameDataStatus;
	rating: GameDataRating;
};

export enum GameDataStatus {
	None = 0,
	PlanToPlay = 1,
	Playing = 2,
	Completed = 3,
	Dropped = 4,
	OnHold = 5
}
export type GameDataStatusKey = keyof typeof GameDataStatus;

export const possibleRatings = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;
export type GameDataRating = (typeof possibleRatings)[number];
