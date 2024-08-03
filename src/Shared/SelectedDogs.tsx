import { FavAndDogData } from "../types";

export const SelectedDogs = ({
	favAndDogData,
}: {
	favAndDogData: FavAndDogData;
}) => {
	const { fav, unFav, allDogs, favDogs, unFavDogs } = favAndDogData;

	if (fav === "active" && unFav === "") {
		return favDogs;
	}
	if (fav === "" && unFav === "active") {
		return unFavDogs;
	}
	return allDogs;
};
