import { DogCard } from "../Shared/DogCard";
import { Component } from "react";
<<<<<<< HEAD
// import { dogPictures } from "../dog-pictures";
import { ClassDogsState, Dog, HandleDogInfo } from "../types";
import { Requests } from "../api";
import { ShowSelectedDogs } from "../Shared/ShowSelectedDogs";

// Right now these dogs are constant, but in reality we should be getting these from our server

export class ClassDogs extends Component<
	{ handleDogInfo: (handleDogInfo: HandleDogInfo) => void },
	ClassDogsState
> {
	state: ClassDogsState = {
		allDogs: [],
		favDogs: [],
		unFavDogs: [],
		isTrashClicked: false,
		isHeartClicked: false,
		isEmptyHeartClicked: false,
		favDogCount: 0,
		unFavDogCount: 0,
		isFavActive: "",
		isUnFavActive: "",
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
					favDogCount: this.state.favDogCount,
					unFavDogCount: this.state.unFavDogCount,
					isFavActive: "",
					isUnFavActive: "",
					isCreateDogActive: "",
				});
			});
	};
	render() {
		const { allDogs, favDogs, unFavDogs, isFavActive, isUnFavActive } =
			this.state;

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
=======
import { dogPictures } from "../dog-pictures";

// Right now these dogs are constant, but in reality we should be getting these from our server
export class ClassDogs extends Component {
  render() {
    return (
      <>
        <DogCard
          dog={{
            id: 1,
            image: dogPictures.BlueHeeler,
            description: "Example Description",
            isFavorite: false,
            name: "Cute Blue Heeler",
          }}
          key={1}
          onTrashIconClick={() => {
            alert("clicked trash");
          }}
          onHeartClick={() => {
            alert("clicked heart");
          }}
          onEmptyHeartClick={() => {
            alert("clicked empty heart");
          }}
          isLoading={false}
        />
        <DogCard
          dog={{
            id: 2,
            image: dogPictures.Boxer,
            description: "Example Description",
            isFavorite: false,
            name: "Cute Boxer",
          }}
          key={2}
          onTrashIconClick={() => {
            alert("clicked trash");
          }}
          onHeartClick={() => {
            alert("clicked heart");
          }}
          onEmptyHeartClick={() => {
            alert("clicked empty heart");
          }}
          isLoading={false}
        />
        <DogCard
          dog={{
            id: 3,
            image: dogPictures.Chihuahua,
            description: "Example Description",
            isFavorite: false,
            name: "Cute Chihuahua",
          }}
          key={3}
          onTrashIconClick={() => {
            alert("clicked trash");
          }}
          onHeartClick={() => {
            alert("clicked heart");
          }}
          onEmptyHeartClick={() => {
            alert("clicked empty heart");
          }}
          isLoading={false}
        />
        <DogCard
          dog={{
            id: 4,
            image: dogPictures.Corgi,
            description: "Example Description",
            isFavorite: false,
            name: "Cute Corgi",
          }}
          key={4}
          onTrashIconClick={() => {
            alert("clicked trash");
          }}
          onHeartClick={() => {
            alert("clicked heart");
          }}
          onEmptyHeartClick={() => {
            alert("clicked empty heart");
          }}
          isLoading={false}
        />
      </>
    );
  }
>>>>>>> parent of d40504a (Started on Class Component side)
}
