import { Component } from "react";
import { Dog } from "../types";
import { Requests } from "../api";
import { ShowSelectedDogs } from "../Functional/ShowSelectedDogs";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component {
	state = {
		allDogs: [],
		favDogs: [],
		unFavDogs: [],
	};

	componentDidMount() {
		this.refetchDogs();
	}

	refetchDogs = () => {
		const favArr: Dog[] = [];
		const unFavArr: Dog[] = [];
		Requests.getAllDogs().then((dogs: Dog[]) => {
			this.setState({ allDogs: dogs });
			dogs.map((dog: Dog) => {
				if (dog.isFavorite) {
					favArr.push(dog);
					this.setState({ favDogs: favArr });
				} else if (!dog.isFavorite) {
					unFavArr.push(dog);
					this.setState({ unFavDogs: unFavArr });
				}
			});
		});
		// .then(() => {
		// 	favDogCount(favArr.length);
		// 	unFavDogCount(unFavArr.length);
		// });
	};

	render() {
		const { allDogs } = this.state;
		return (
			<>
				{ShowSelectedDogs({
					dogs: allDogs,
					isTrashClickedProp({ isTrashClicked }) {
						isTrashClicked;
						// setIsTrashClicked(isTrashClicked);
					},
					isHeartClickedProp({ isHeartClicked }) {
						isHeartClicked;
						// setIsHeartClicked(isHeartClicked);
					},
					isEmptyHeartClickedProp({ isEmptyHeartClicked }) {
						isEmptyHeartClicked;
						// setIsEmptyHeartClicked(isEmptyHeartClicked);
					},
				})}
			</>
		);
	}
}
