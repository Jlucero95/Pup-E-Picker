import { useState } from "react";
import { DogCard } from "../Shared/DogCard";
import { Requests } from "../api";
import { Dog } from "../types";

export const ShowSelectedDogs = ({
	dogs,
	isTrashClickedProp,
}: {
	dogs: Dog[];
	isTrashClickedProp: ({ isTrashClicked }: { isTrashClicked: boolean }) => void;
}) => {
	const [isTrashClicked, setIsTrashClicked] = useState(false);
	return dogs.map((dog: Dog) => (
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
				Requests.deleteDog({ dog: dog });
				setIsTrashClicked(true);
				isTrashClickedProp({ isTrashClicked: isTrashClicked });
			}}
			onHeartClick={() => {}}
			onEmptyHeartClick={() => {}}
			isLoading={false}
		/>
	));
};
