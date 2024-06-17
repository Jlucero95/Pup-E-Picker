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
	handleDogCount: HandleDogCount;
	handleActiveState: HandleActiveState;
};

export type HandleActiveState = {
	isFavActive: string;
	isUnFavActive: string;
	isCreateDogActive: string;
};

export type ClassSectionState = {
	handleActiveState: HandleActiveState;
	handleDogCount: HandleDogCount;
};

export type HandleDogCount = {
	unFavDogCount: number;
	favDogCount: number;
};
