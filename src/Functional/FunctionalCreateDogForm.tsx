import { useState } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";

// use this as your default selected image
const defaultSelectedImage = dogPictures.BlueHeeler;

export const FunctionalCreateDogForm = () => {
	const [dogName, setDogName] = useState("");
	const [dogDescription, setDogDescription] = useState("");
	const [dogPhoto, setDogPhoto] = useState("");
	return (
		<form
			action=""
			id="create-dog-form"
			onSubmit={(e) => {
				e.preventDefault();
				Requests.postDog({
					dog: {
						image: dogPhoto,
						description: dogDescription,
						isFavorite: true,
						name: dogName,
					},
				});
				setDogName("");
				setDogDescription("");
				setDogPhoto(defaultSelectedImage);
			}}
		>
			<h4>Create a New Dog</h4>
			<label htmlFor="name">Dog Name</label>
			<input
				type="text"
				disabled={false}
				onChange={(e) => {
					setDogName(e.target.value);
				}}
			/>
			<label htmlFor="description">Dog Description</label>
			<textarea
				name=""
				id=""
				cols={80}
				rows={10}
				disabled={false}
				onChange={(e) => {
					setDogDescription(e.target.value);
				}}
			></textarea>
			<label htmlFor="picture">Select an Image</label>
			<select id="">
				{Object.entries(dogPictures).map(([label, pictureValue]) => {
					return (
						<option
							value={pictureValue}
							key={pictureValue}
						>
							{label}
						</option>
					);
				})}
			</select>
			<input type="submit" />
		</form>
	);
};
