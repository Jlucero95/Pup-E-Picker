/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from "react";
import { Requests } from "../api";
import { ShowSelectedDogsList } from "../Shared/ShowSelectedDogsList";
import { Dog, FavAndUnFavData } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<FavAndUnFavData> {
	state = {
		allDogs: [],
		favDogs: [],
		unFavDogs: [],
		isTrashClicked: false,
		isHeartClicked: false,
		isEmptyHeartClicked: false,
		isLoading: false
	};

	componentDidMount() {
		this.refetchDogs();
	}

	componentDidUpdate() {
		if (
			this.state.isEmptyHeartClicked ||
			this.state.isHeartClicked ||
			this.state.isTrashClicked
		) {
			this.setState({
				isEmptyHeartClicked: false,
				isHeartClicked: false,
				isTrashClicked: false,
			});
			this.refetchDogs();

			if (this.state.allDogs.length === this.state.allDogs.length + 1) {
				this.refetchDogs();
			}
		}
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
		const { allDogs, favDogs, unFavDogs } = this.state;

		const { isFavActiveProp, isUnFavActiveProp } = this.props;

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
