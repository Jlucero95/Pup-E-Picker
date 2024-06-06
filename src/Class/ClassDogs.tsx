// import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
// import { dogPictures } from "../dog-pictures";
import { ClassDogsState, Dog } from "../types";
import { Requests } from "../api";
import { ShowSelectedDogs } from "../Shared/ShowSelectedDogs";

// Right now these dogs are constant, but in reality we should be getting these from our server

export class ClassDogs extends Component<
	Record<string, never>,
	ClassDogsState
> {
	state: ClassDogsState = {
		allDogs: [],
		favDogs: [],
		unFavDogs: [],
		isTrashClicked: false,
		isHeartClicked: false,
		isEmptyHeartClicked: false,
	};

	componentDidMount(): void {
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
		const { allDogs, favDogs, unFavDogs } = this.state;
		const { unFavDogCount, favDogCount, isFavActive, isUnFavActive } =
			this.props;

		return (
			<>
				{isFavActive === "" && isUnFavActive === "" ? (
					<ShowSelectedDogs
						dogs={allDogs}
						isTrashClickedProp={(isTrashClicked) => {
							this.setState(isTrashClicked);
						}}
						isEmptyHeartClickedProp={(isEmptyHeartClicked) => {
							this.setState(isEmptyHeartClicked);
						}}
						isHeartClickedProp={(isHeartClicked) => {
							this.setState(isHeartClicked);
						}}
					/>
				) : null}
				{isFavActive === "active" && isUnFavActive === "" ? (
					<ShowSelectedDogs
						dogs={favDogs}
						isTrashClickedProp={(isTrashClicked) => {
							this.setState(isTrashClicked);
						}}
						isEmptyHeartClickedProp={(isEmptyHeartClicked) => {
							this.setState(isEmptyHeartClicked);
						}}
						isHeartClickedProp={(isHeartClicked) => {
							this.setState(isHeartClicked);
						}}
					/>
				) : null}
				{isFavActive === "" && isUnFavActive === "active" ? (
					<ShowSelectedDogs
						dogs={unFavDogs}
						isTrashClickedProp={(isTrashClicked) => {
							this.setState(isTrashClicked);
						}}
						isEmptyHeartClickedProp={(isEmptyHeartClicked) => {
							this.setState(isEmptyHeartClicked);
						}}
						isHeartClickedProp={(isHeartClicked) => {
							this.setState(isHeartClicked);
						}}
					/>
				) : null}
			</>
		);
	}
}
