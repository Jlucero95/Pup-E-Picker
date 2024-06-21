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
		isTrashClicked: false,
		isHeartClicked: false,
		isEmptyHeartClicked: false,
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
		const { allDogs, isTrashClicked, isEmptyHeartClicked, isHeartClicked } =
			this.state;
		if (isEmptyHeartClicked || isHeartClicked || isTrashClicked) {
			this.setState({
				isEmptyHeartClicked: false,
				isHeartClicked: false,
				isTrashClicked: false,
			});
			this.refetchDogs();
		}
		return (
			<>
				{ShowSelectedDogs({
					dogs: allDogs,
					isTrashClickedProp: (isTrashClicked) => {
						this.setState({ isTrashClicked });
					},
					isEmptyHeartClickedProp: (isEmptyHeartClicked) => {
						this.setState({ isEmptyHeartClicked });
					},
					isHeartClickedProp: (isHeartClicked) => {
						this.setState({ isHeartClicked });
					},
				})}
			</>
		);
	}
}
