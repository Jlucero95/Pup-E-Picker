import { Dog } from "../types";

export const SelectedDogs = ({
	fav,
	unFav,
	allDogs,
	favDogs,
	unFavDogs,
}: {
	fav: string;
	unFav: string;
	allDogs: Dog[];
	favDogs: Dog[];
	unFavDogs: Dog[];
}) => {
	if (fav === "active" && unFav === "") {
		return favDogs;
	}
	if (fav === "" && unFav === "active") {
		return unFavDogs;
	}
	return allDogs;
};
