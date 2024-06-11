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
	favDogCount: number;
  unFavDogCount: number;
	isFavActive:string;
  isUnFavActive:string;

};

export type HandleDogInfo ={
	isFavActive: string,
	isUnFavActive: string,
	favDogCount: number;
	unFavDogCount: number
	isCreateDogActive: string
}
