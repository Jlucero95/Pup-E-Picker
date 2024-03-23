/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server✅
export const FunctionalDogs = ({
	isFavActive,
	isUnFavActive,
}: {
	isFavActive: string;
	isUnFavActive: string;
}) => {
	const [allDogs, setAllDogs] = useState<Dog[]>([]);
	const [favDogs, setFavDogs] = useState<Dog[]>([]);
	const [unFavDogs, setUnFavDogs] = useState<Dog[]>([]);

	useEffect(() => {
		Requests.getAllDogs({ endpoint: "dogs" }).then((dog) => {
			setAllDogs(dog);
		});
		Requests.getAllDogs({ endpoint: "favorited" }).then((dog) => {
			setFavDogs(dog);
		});
		Requests.getAllDogs({ endpoint: "unfavorited" }).then((dog) => {
			setUnFavDogs(dog);
		});
	}, []);
	return (
		//  the "<> </>"" are called react fragments, it's like adding all the html inside
		// without adding an actual html element
		<>
			{isFavActive !== "active" && isUnFavActive !== "active"
				? allDogs.map((dog: Dog) => (
						<DogCard
							dog={{
								id: dog.id,
								image: dog.image,
								description: dog.description,
								isFavorite: dog.isFavorite,
								name: dog.name,
							}}
							key={dog.id}
							onTrashIconClick={() => {
								alert("clicked trash");
							}}
							onHeartClick={() => {
								Requests.updateDog({ dog: dog });
							}}
							onEmptyHeartClick={() => {
								Requests.updateDog({ dog: dog });
							}}
							isLoading={false}
						/>
				  ))
				: null}
			{isFavActive === "active" && isUnFavActive === ""
				? favDogs.map((dog: Dog) => (
						<DogCard
							dog={{
								id: dog.id,
								image: dog.image,
								description: dog.description,
								isFavorite: dog.isFavorite,
								name: dog.name,
							}}
							key={dog.id}
							onTrashIconClick={() => {
								alert("clicked trash");
							}}
							onHeartClick={() => {
								Requests.updateDog({ dog: dog });
							}}
							onEmptyHeartClick={() => {
								Requests.updateDog({ dog: dog });
							}}
							isLoading={false}
						/>
				  ))
				: null}
			{isUnFavActive === "active" && isFavActive === ""
				? unFavDogs.map((dog: Dog) => (
						<DogCard
							dog={{
								id: dog.id,
								image: dog.image,
								description: dog.description,
								isFavorite: dog.isFavorite,
								name: dog.name,
							}}
							key={dog.id}
							onTrashIconClick={() => {
								alert("clicked trash");
							}}
							onHeartClick={() => {
								Requests.updateDog({ dog: dog });
							}}
							onEmptyHeartClick={() => {
								Requests.updateDog({ dog: dog });
							}}
							isLoading={false}
						/>
				  ))
				: null}
		</>
	);
};
