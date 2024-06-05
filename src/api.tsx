import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
	// should return a promise with all dogs in the database✅
	getAllDogs: (): Promise<Dog[]> =>
		fetch(`${baseUrl}/dogs`).then((dog) => dog.json()),

	// should create a dog in the database from a partial dog object
	// and return a promise with the result
	postDog: async ({ dog }: { dog: Omit<Dog, "id"> }) => {
		const data = await fetch(`${baseUrl}/dogs`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(dog),
		});
		return data.json;
	},

	// should delete a dog from the database
	deleteDog: ({ dog }: { dog: Dog }) => {
		return fetch(`${baseUrl}/dogs/${dog.id}`, {
			method: "DELETE",
		});
	},

	updateDog: async ({ dog }: { dog: Dog }) => {
		const favChange = dog.isFavorite ? false : true;
		const data = await fetch(`${baseUrl}/dogs/${dog.id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ isFavorite: favChange }),
		});
		return data.json;
	},

	// Just a dummy function for use in the playground
	dummyFunction: () => {},
};
