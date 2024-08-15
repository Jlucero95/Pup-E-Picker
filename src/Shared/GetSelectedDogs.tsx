import { FavAndDogData } from "../types";

export const getSelectedDogs = ({
	favAndDogData,
}: {
	favAndDogData: FavAndDogData;
}) => {
	const { activeTab, favDogs, unFavDogs, allDogs } = favAndDogData;

	if (activeTab === "favourite") {
		return favDogs;
	}
	if (activeTab === "unFavourite") {
		return unFavDogs;
	}

	return allDogs;
};
