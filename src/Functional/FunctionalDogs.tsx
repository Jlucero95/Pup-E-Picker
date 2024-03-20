import { useEffect, useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";
import { Requests } from "../api";

// Right now these dogs are constant, but in reality we should be getting these from our server✅
export const FunctionalDogs = () => {
	const [allDogs, setAllDogs] = useState<Dog[]>([]);
	useEffect(() => {
		Requests.getAllDogs().then(setAllDogs);
	}, []);

	return (
		//  the "<> </>"" are called react fragments, it's like adding all the html inside
		// without adding an actual html element
		<>
			{allDogs.map((dog) => {
				{
					Requests.updateDog({
						dog: dog,
						endpoint: "favorited",
						favBoolean: dog.isFavorite,
					});
				}
				return (
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
							Requests.updateDog({
								dog: dog,
								endpoint: "favorited",
								favBoolean: dog.isFavorite,
							});
						}}
						onEmptyHeartClick={() => {
							Requests.updateDog({
								dog: dog,
								endpoint: "unfavorited",
								favBoolean: dog.isFavorite,
							});
						}}
						isLoading={false}
					/>
				);
			})}
		</>
	);
};
