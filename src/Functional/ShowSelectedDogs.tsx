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
			onHeartClick={() => {}}
			onEmptyHeartClick={() => {}}
			isLoading={false}
		/>
	));
};
