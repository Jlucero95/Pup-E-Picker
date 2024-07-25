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
	isTrashClicked: boolean;
	isHeartClicked: boolean;
	isEmptyHeartClicked: boolean;
	isCardLoading: boolean;
	isCreateLoading: boolean;
};

export type FavAndUnFavData = {
	isFavActive: string;
	isUnFavActive: string;
	isCreateActive: string;
	favCount: (favCount: number) => void;
	unFavCount: (unFavCount: number) => void;
};
