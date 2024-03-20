import { Dog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
	// should return a promise with all dogs in the database✅
	getAllDogs: (): Promise<Dog[]> =>
		fetch(`${baseUrl}/dogs`).then((response) => response.json()),

	// should create a dog in the database from a partial dog object
	// and return a promise with the result
	postDog: () => {},

	// should delete a dog from the database
	deleteDog: () => {},

	updateDog: ({ dog }: { dog: Dog }) => {
		if (dog.isFavorite) {
			fetch(`${baseUrl}/favorited`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ dog }),
			}).then((data) => data.json);
		} else {
			fetch(`${baseUrl}/unfavorited`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ dog }),
			}).then((data) => data.json);
		}
	},

	// Just a dummy function for use in the playground
	dummyFunction: () => {
		console.log("dummy stuff");
	},
};
