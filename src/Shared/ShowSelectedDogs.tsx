import { DogCard } from "./DogCard";
import { Requests } from "../api";
import { Dog } from "../types";

export const ShowSelectedDogs = ({
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
					isTrashClickedProp({ isTrashClicked: true });
				});
			}}
			onHeartClick={() => {
				Requests.updateDog({ dog: dog }).then(() => {
					isHeartClickedProp({ isHeartClicked: true });
				});
			}}
			onEmptyHeartClick={() => {
				Requests.updateDog({ dog: dog }).then(() => {
					isEmptyHeartClickedProp({ isEmptyHeartClicked: true });
				});
			}}
			isLoading={false}
		/>
	));
};
