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
	isSubmitted: boolean;
};

export type FavAndUnFavData = {
	isFavActiveProp: string;
	isUnFavActiveProp: string;
	favCountProp: (favCount: number) => void;
	unFavCountProp: (unFavCount: number) => void;
};
