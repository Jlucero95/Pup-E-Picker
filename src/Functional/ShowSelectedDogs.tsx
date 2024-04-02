import { DogCard } from "../Shared/DogCard";
import { Dog } from "../types";

export const ShowSelectedDogs = ({ dogs }: { dogs: Dog[] }) => {
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
				alert("clicked trash");
			}}
			onHeartClick={() => {}}
			onEmptyHeartClick={() => {}}
			isLoading={false}
		/>
	));
};
