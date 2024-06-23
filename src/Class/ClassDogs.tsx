/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from "react";

import { Dog, FavOrUnFavActive } from "../types";
import { Requests } from "../api";
import { ShowSelectedDogsList } from "../Shared/ShowSelectedDogsList";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<FavOrUnFavActive> {
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
		Requests.getAllDogs()
			.then((dogs: Dog[]) => {
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
			})
			.then(() => {
				this.props.favCountProp(favArr.length);
				this.props.unFavCountProp(unFavArr.length);
			});
	};

	render() {
		const {
			allDogs,
			favDogs,
			unFavDogs,
			isTrashClicked,
			isEmptyHeartClicked,
			isHeartClicked,
		} = this.state;

		const { isFavActiveProp, isUnFavActiveProp } = this.props;

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
				{isFavActiveProp === "" && isUnFavActiveProp === ""
					? ShowSelectedDogsList({
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
					  })
					: null}

				{isFavActiveProp === "active" && isUnFavActiveProp === ""
					? ShowSelectedDogsList({
							dogs: favDogs,
							isTrashClickedProp: (isTrashClicked) => {
								this.setState({ isTrashClicked });
							},
							isEmptyHeartClickedProp: (isEmptyHeartClicked) => {
								this.setState({ isEmptyHeartClicked });
							},
							isHeartClickedProp: (isHeartClicked) => {
								this.setState({ isHeartClicked });
							},
					  })
					: null}
				{isFavActiveProp === "" && isUnFavActiveProp === "active"
					? ShowSelectedDogsList({
							dogs: unFavDogs,
							isTrashClickedProp: (isTrashClicked) => {
								this.setState({ isTrashClicked });
							},
							isEmptyHeartClickedProp: (isEmptyHeartClicked) => {
								this.setState({ isEmptyHeartClicked });
							},
							isHeartClickedProp: (isHeartClicked) => {
								this.setState({ isHeartClicked });
							},
					  })
					: null}
			</>
		);
	}
}
