/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import { ShowSelectedDogs } from "./ShowSelectedDogs";

// Right now these dogs are constant, but in reality we should be getting these from our server✅
export const FunctionalDogs = ({
	isFavActive,
	isUnFavActive,
	favDogCount,
	unFavDogCount,
}: {
	isFavActive: string;
	isUnFavActive: string;
	favDogCount: (count: number) => void;
	unFavDogCount: (count: number) => void;
}) => {
	const [allDogs, setAllDogs] = useState<Dog[]>([]);
	const [favDogs, setFavDogs] = useState<Dog[]>([]);
	const [unFavDogs, setUnFavDogs] = useState<Dog[]>([]);
	const [isTrashClicked, setIsTrashClicked] = useState<boolean>(false);

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
			.then(() => {
				favDogCount(favArr.length);
				unFavDogCount(unFavArr.length);
			});
	};

	if (isTrashClicked) {
		setAllDogs([]);
		setFavDogs([]);
		setUnFavDogs([]);
		setIsTrashClicked(false);
		refetchDogs();
	}

	return (
		<>
			{isFavActive === "" && isUnFavActive === ""
				? ShowSelectedDogs({
						dogs: allDogs,
						isTrashClickedProp({ isTrashClicked }) {
							setIsTrashClicked(isTrashClicked);
						},
				  })
				: null}
			{isFavActive === "active" && isUnFavActive === ""
				? ShowSelectedDogs({
						dogs: favDogs,
						isTrashClickedProp({ isTrashClicked }) {
							setIsTrashClicked(isTrashClicked);
						},
				  })
				: null}
			{isFavActive === "" && isUnFavActive === "active"
				? ShowSelectedDogs({
						dogs: unFavDogs,
						isTrashClickedProp({ isTrashClicked }) {
							setIsTrashClicked(isTrashClicked);
						},
				  })
				: null}
		</>
	);
};
