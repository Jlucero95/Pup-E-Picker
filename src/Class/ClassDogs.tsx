/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from "react";
import { Requests } from "../api";
import { showSelectedDogsList } from "../Shared/ShowSelectedDogsList";
import { ClassDogsState, Dog, FavAndUnFavData } from "../types";
import { getSelectedDogs } from "../Shared/GetSelectedDogs";

export class ClassDogs extends Component<
	{ FavAndUnFavData: FavAndUnFavData },
	ClassDogsState
> {
	state: ClassDogsState = {
		allDogs: [],
		favDogs: [],
		unFavDogs: [],
		isCardLoading: false,
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
			.finally(() => {
				this.props.FavAndUnFavData.favCount(favArr.length);
				this.props.FavAndUnFavData.unFavCount(unFavArr.length);
				this.setState({ isCardLoading: false });
			});
	};

	render() {
		const { allDogs, favDogs, unFavDogs, isCardLoading } = this.state;

		const { activeTab } = this.props.FavAndUnFavData;

		const selectedDogs = getSelectedDogs({
			favAndDogData: {
				activeTab,
				allDogs,
				favDogs,
				unFavDogs,
			},
		});

		return (
			<>
				{showSelectedDogsList({
					dogAndActionData: {
						dogs: selectedDogs,
						isTrashClicked: () => {
							this.setState({ isCardLoading: true });
							this.refetchDogs();
						},
						isEmptyHeartClicked: () => {
							this.setState({ isCardLoading: true });
							this.refetchDogs();
						},
						isHeartClicked: () => {
							this.setState({ isCardLoading: true });
							this.refetchDogs();
						},
						isLoading: isCardLoading,
					},
				})}
			</>
		);
	}
}
