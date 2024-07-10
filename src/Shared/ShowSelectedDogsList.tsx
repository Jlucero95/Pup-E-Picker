import { DogCard } from "./DogCard";
import { Requests } from "../api";
import { Dog } from "../types";
import { useState } from "react";

export const ShowSelectedDogsList = ({
	dogs,
	isTrashClickedProp,
	isHeartClickedProp,
	isEmptyHeartClickedProp,
}: {
	dogs: Dog[];
	isTrashClickedProp: ({ isTrashClicked }: { isTrashClicked: boolean }) => void;
	isHeartClickedProp: ({ isHeartClicked }: { isHeartClicked: boolean }) => void;
	isEmptyHeartClickedProp: ({
		isEmptyHeartClicked,
	}: {
		isEmptyHeartClicked: boolean;
	}) => void;
}) => {
	const [isLoading, setIsLoading] = useState(false);

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
				Requests.deleteDog({ dog: dog }).then(() => {
					setIsLoading(true);
					isTrashClickedProp({ isTrashClicked: true });
				});
			}}
			onHeartClick={() => {
				Requests.updateDog({ dog: dog }).then(() => {
					setIsLoading(true);
					isHeartClickedProp({ isHeartClicked: true });
				});
			}}
			onEmptyHeartClick={() => {
				Requests.updateDog({ dog: dog }).then(() => {
					setIsLoading(true);
					isEmptyHeartClickedProp({ isEmptyHeartClicked: true });
				});
			}}
			isLoading={isLoading}
		/>
	));
};
