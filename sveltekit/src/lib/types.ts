export type GameData = {
	rawgId: number;
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

export type StatusData = {
	status: GameDataStatus;
	rating: GameDataRating;
};

export type Game = {
	background_image: string;
	description: string;
	developers: {
		name: string;
		slug: string;
	}[];
	genres: {
		name: string;
		slug: string;
	}[];
	id: number;
	metacritic: number;
	metacritic_url: string;
	name: string;
	platforms: {
		platform: {
			name: string;
			slug: string;
		};
	}[];
	publishers: {
		name: string;
		slug: string;
	}[];
	released: string;
	stores: {
		store: {
			domain: string;
			name: string;
			slug: string;
		};
	}[];
	tags: {
		name: string;
		slug: string;
	}[];
	tba: boolean;
	screenshots: {
		image: string;
	}[];
};
