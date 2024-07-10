import { Component } from "react";
import { dogPictures } from "../dog-pictures";
import { Requests } from "../api";
import toast from "react-hot-toast";

const defaultSelectedImage = dogPictures.BlueHeeler;

export class ClassCreateDogForm extends Component {
	state = {
		dogName: "",
		dogDescription: "",
		dogPhoto: defaultSelectedImage,
		isLoading: false,
		submitDisabled: false,
		isSubmitted: false,
	};

	postDog = () => {
		this.setState({ submitDisabled: true });
		return Requests.postDog({
			dog: {
				name: this.state.dogName,
				image: this.state.dogPhoto,
				description: this.state.dogDescription,
				isFavorite: false,
			},
		})
			.then(() => {
				toast.success(`created ${this.state.dogName}`);
			})
			.finally(() => {
				if (this.state.isSubmitted) {
					this.setState({ submitDisabled: true });
				}
				this.resetForm();
			});
	};

	resetForm = () => {
		return this.setState({
			dogName: "",
			dogDescription: "",
			dogPhoto: defaultSelectedImage,
			submitDisabled: false,
			isLoading: false,
			isSubmitted: false,
		});
	};

	render() {
		const { dogDescription, dogName, dogPhoto, submitDisabled } = this.state;

		return (
			<form
				action=""
				id="create-dog-form"
				onSubmit={(e) => {
					e.preventDefault();
					this.setState({
						isSubmitted: true,
						isLoading: true,
					});
					this.postDog();
				}}
			>
				<h4>Create a New Dog</h4>
				<label htmlFor="name">Dog Name</label>
				<input
					type="text"
					onChange={(e) => {
						this.setState({ dogName: e.target.value });
					}}
					disabled={submitDisabled}
					value={dogName}
				/>
				<label htmlFor="description">Dog Description</label>
				<textarea
					name=""
					id=""
					cols={80}
					rows={10}
					onChange={(e) => {
						this.setState({ dogDescription: e.target.value });
					}}
					disabled={submitDisabled}
					value={dogDescription}
				/>
				<label htmlFor="picture">Select an Image</label>
				<select
					onChange={(e) => {
						this.setState({ dogPhoto: e.target.value });
					}}
					disabled={submitDisabled}
					value={dogPhoto}
				>
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
				<input
					type="submit"
					value="submit"
					disabled={submitDisabled}
				/>
			</form>
		);
	}
}
