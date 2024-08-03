/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from "react";
import { Requests } from "../api";
import { ShowSelectedDogsList } from "../Shared/ShowSelectedDogsList";
import { ClassDogsState, Dog, FavAndUnFavData } from "../types";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { SelectedDogs } from "../Shared/SelectedDogs";

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

		const selectedDogs = SelectedDogs({
			favAndDogData: {
				fav: isFavActive,
				unFav: isUnFavActive,
				allDogs,
				favDogs,
				unFavDogs,
			},
		});

		return (
			<>
				{isCreateActive === "active" ? (
					<ClassCreateDogForm
						isLoading={(isLoading) => {
							this.setState({ isCreateLoading: isLoading });
						}}
					/>
				) : (
					ShowSelectedDogsList({
						dogAndActionData: {
							dogs: selectedDogs,
							isTrashClicked: (isTrashClicked) => {
								if (isTrashClicked) this.setState({ isTrashClicked: true });
							},
							isEmptyHeartClicked: (isEmptyHeartClicked) => {
								if (isEmptyHeartClicked)
									this.setState({ isEmptyHeartClicked: true });
							},
							isHeartClicked: (isHeartClicked) => {
								if (isHeartClicked) this.setState({ isHeartClicked: true });
							},
							isLoading: isCardLoading,
						},
					})
				)}
			</>
		);
	}
}
