/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { Dog, FavAndUnFavData } from "../types";
import { Requests } from "../api";
import { ShowSelectedDogsList } from "../Shared/ShowSelectedDogsList";
import { SelectedDogs } from "../Shared/SelectedDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";

// Right now these dogs are constant, but in reality we should be getting these from our server✅
export const FunctionalDogs = ({
	favAndUnFavData,
}: {
	favAndUnFavData: FavAndUnFavData;
}) => {
	const [allDogs, setAllDogs] = useState<Dog[]>([]);
	const [favDogs, setFavDogs] = useState<Dog[]>([]);
	const [unFavDogs, setUnFavDogs] = useState<Dog[]>([]);
	const [isTrashClicked, setIsTrashClicked] = useState<boolean>(false);
	const [isHeartClicked, setIsHeartClicked] = useState<boolean>(false);
	const [isEmptyHeartClicked, setIsEmptyHeartClicked] =
		useState<boolean>(false);
	const [isSubmitLoading, setIsSubmitLoading] = useState<boolean>(false);
	const [isCardLoading, setIsCardLoading] = useState<boolean>(false);

	const { isFavActive, isUnFavActive, isCreateActive, favCount, unFavCount } =
		favAndUnFavData;

	useEffect(() => {
		refetchDogs();
	}, []);

	const refetchDogs = () => {
		const favArr: Dog[] = [];
		const unFavArr: Dog[] = [];

		Requests.getAllDogs()
			.then((dogs: Dog[]) => {
				setAllDogs(dogs);
				dogs.map((dog: Dog) => {
					if (dog.isFavorite) {
						favArr.push(dog);
						setFavDogs(favArr);
					} else if (!dog.isFavorite) {
						unFavArr.push(dog);
						setUnFavDogs(unFavArr);
					}
				});
			})
			.finally(() => {
				setIsCardLoading(false);
				setIsSubmitLoading(false);
				favCount(favArr.length);
				unFavCount(unFavArr.length);
			});
	};

	if (isHeartClicked || isTrashClicked || isEmptyHeartClicked) {
		setIsCardLoading(true);
		setIsEmptyHeartClicked(false);
		setIsHeartClicked(false);
		setIsTrashClicked(false);
		refetchDogs();
	}

	if (isSubmitLoading) {
		refetchDogs();
	}

	const selectedDogs = SelectedDogs({
		favAndDogData: {
			fav: isFavActive,
			unFav: isUnFavActive,
			allDogs: allDogs,
			favDogs: favDogs,
			unFavDogs: unFavDogs,
		},
	});

	return (
		<>
			{isCreateActive === "active" ? (
				<FunctionalCreateDogForm
					isSubmitted={(isSubmitted) => {
						setIsSubmitLoading(isSubmitted);
					}}
				/>
			) : (
				ShowSelectedDogsList({
					dogAndActionData: {
						dogs: selectedDogs,
						isTrashClicked({ isTrashClicked }) {
							setIsTrashClicked(isTrashClicked);
						},
						isHeartClicked({ isHeartClicked }) {
							setIsHeartClicked(isHeartClicked);
						},
						isEmptyHeartClicked({ isEmptyHeartClicked }) {
							setIsEmptyHeartClicked(isEmptyHeartClicked);
						},

						isLoading: isCardLoading,
					},
				})
			)}
		</>
	);
};
