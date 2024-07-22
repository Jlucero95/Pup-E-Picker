/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from "react";
import { Requests } from "../api";
import { ShowSelectedDogsList } from "../Shared/ShowSelectedDogsList";
import { ClassDogsState, Dog, FavAndUnFavData } from "../types";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component<
	{ FavAndUnFavData: FavAndUnFavData },
	ClassDogsState
> {
	state: ClassDogsState = {
		allDogs: [],
		favDogs: [],
		unFavDogs: [],
		isTrashClicked: false,
		isHeartClicked: false,
		isEmptyHeartClicked: false,
		isCardLoading: false,
		isCreateLoading: false,
		isCreateDogActive: false,
		isFavActive: false,
		isUnFavActive: false,
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
				isCardLoading: true,
				isEmptyHeartClicked: false,
				isHeartClicked: false,
				isTrashClicked: false,
			});
			this.refetchDogs();
		}
		if (this.state.isCreateLoading) {
			this.refetchDogs();
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
			.finally(() => {
				this.props.FavAndUnFavData.favCount(favArr.length);
				this.props.FavAndUnFavData.unFavCount(unFavArr.length);
				this.setState({ isCardLoading: false, isCreateLoading: false });
			});
	};

	render() {
		const { allDogs, favDogs, unFavDogs, isCardLoading } = this.state;

		const { isFavActive, isUnFavActive, isCreateActive } =
			this.props.FavAndUnFavData;

		let dogsToShow = allDogs;
		if (isFavActive === "active") {
			dogsToShow = favDogs;
		} else if (isUnFavActive === "active") {
			dogsToShow = unFavDogs;
		}

		return (
			<>
				{isCreateActive && isFavActive === "" && isUnFavActive === "" ? (
					<ClassCreateDogForm
						isLoading={(isLoading) => {
							this.setState({ isCreateLoading: isLoading });
						}}
					/>
				) : (
					ShowSelectedDogsList({
						dogs: dogsToShow,
						isTrashClickedProp: (isTrashClicked) => {
							if (isTrashClicked) this.setState({ isTrashClicked: true });
						},
						isEmptyHeartClickedProp: (isEmptyHeartClicked) => {
							if (isEmptyHeartClicked)
								this.setState({ isEmptyHeartClicked: true });
						},
						isHeartClickedProp: (isHeartClicked) => {
							if (isHeartClicked) this.setState({ isHeartClicked: true });
						},
						isLoading: isCardLoading,
					})
				)}
			</>
		);
	}
}
