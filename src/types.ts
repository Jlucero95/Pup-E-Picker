import { ActiveTab } from "./Class/ClassSection";

export type Dog = {
	id: string;
	image: string;
	description: string;
	isFavorite: boolean;
	name: string;
};

export type ClassDogsState = {
	allDogs: Dog[];
	favDogs: Dog[];
	unFavDogs: Dog[];
	isCardLoading: boolean;
};

export type FavAndUnFavData = {
	activeTab: ActiveTab;
	favCount: (favCount: number) => void;
	unFavCount: (unFavCount: number) => void;
};

export type FavAndDogData = {
	activeTab: ActiveTab;
	allDogs: Dog[];
	favDogs: Dog[];
	unFavDogs: Dog[];
};

export type DogAndActionData = {
	dogs: Dog[];
	isTrashClicked: ({ isTrashClicked }: { isTrashClicked: boolean }) => void;
	isHeartClicked: ({ isHeartClicked }: { isHeartClicked: boolean }) => void;
	isEmptyHeartClicked: ({
		isEmptyHeartClicked,
	}: {
		isEmptyHeartClicked: boolean;
	}) => void;
	isLoading: boolean;
};
