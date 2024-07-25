import { DogCard } from "./DogCard";
import { Requests } from "../api";
import { Dog } from "../types";

export const ShowSelectedDogsList = ({
	dogs,
	isTrashClicked,
	isHeartClicked,
	isEmptyHeartClicked,
	isLoading,
}: {
	dogs: Dog[];
	isTrashClicked: ({ isTrashClicked }: { isTrashClicked: boolean }) => void;
	isHeartClicked: ({ isHeartClicked }: { isHeartClicked: boolean }) => void;
	isEmptyHeartClicked: ({
		isEmptyHeartClicked,
	}: {
		isEmptyHeartClicked: boolean;
	}) => void;
	isLoading: boolean;
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
					isTrashClicked({ isTrashClicked: true });
				});
			}}
			onHeartClick={() => {
				Requests.updateDog({ dog: dog }).then(() => {
					isHeartClicked({ isHeartClicked: true });
				});
			}}
			onEmptyHeartClick={() => {
				Requests.updateDog({ dog: dog }).then(() => {
					isEmptyHeartClicked({ isEmptyHeartClicked: true });
				});
			}}
			isLoading={isLoading}
		/>
	));
};
