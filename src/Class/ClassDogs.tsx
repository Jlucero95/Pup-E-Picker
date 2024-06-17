// import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
// import { dogPictures } from "../dog-pictures";
import {
	ClassDogsState,
	Dog,
	HandleDogCount,
	HandleActiveState,
} from "../types";
import { Requests } from "../api";
import { ShowSelectedDogs } from "../Shared/ShowSelectedDogs";

// Right now these dogs are constant, but in reality we should be getting these from our server

export class ClassDogs extends Component<
	{ handleDogCount: (handDogCount: HandleDogCount) => void },
	{ handleActiveState: HandleActiveState }
> {
	constructor(
		props:
			| { handleDogCount: (handDogCount: HandleDogCount) => void }
			| { handleActiveState: HandleActiveState}
	) {
		super(props);
		this.state.handleActiveState = {
			isCreateDogActive: "",
			isFavActive: "",
			isUnFavActive: "",
		};
		this.state.handleDogCount = {
			favDogCount: 0,
			unFavDogCount: 0,
		};
	}
	state: ClassDogsState = {
		allDogs: [],
		favDogs: [],
		unFavDogs: [],
		isTrashClicked: false,
		isHeartClicked: false,
		isEmptyHeartClicked: false,
		handleActiveState: {
			isCreateDogActive: "",
			isFavActive: "",
			isUnFavActive: "",
		},
		handleDogCount: {
			favDogCount: 0,
			unFavDogCount: 0,
		},
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
				this.setState({ favDogCount: favArr.length });
				this.setState({ unFavDogCount: unFavArr.length });
				this.props.handleDogInfo({
					isFavActive: "",
					isUnFavActive: "",
					isCreateDogActive: "",
				});
			});
	};

	render() {
		const {
			allDogs,
			favDogs,
			unFavDogs,
			isEmptyHeartClicked,
			isHeartClicked,
			isTrashClicked,
		} = this.state;

		const { isFavActive, isUnFavActive } = this.state.handleActiveState;

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
