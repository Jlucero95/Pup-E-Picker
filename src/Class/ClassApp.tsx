/* eslint-disable no-mixed-spaces-and-tabs */
import { Component } from "react";
import { ClassSection } from "./ClassSection";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { ClassDogs } from "./ClassDogs";
import { CLassSectionState as ClassSectionState } from "./ClassTypes";

export class ClassApp extends Component {
	state: ClassSectionState = {
		activeTab: "none",
		favCount: 0,
		unFavCount: 0,
		isLoading: false,
	};

	handleFavCount = (favCount: number) => {
		this.setState({ favCount: favCount });
	};
	handleUnFavCount = (unFavCount: number) => {
		this.setState({ unFavCount: unFavCount });
	};

	render() {
		const { activeTab, favCount, unFavCount } = this.state;

		return (
			<div
				className="App"
				style={{ backgroundColor: "goldenrod" }}
			>
				<header>
					<h1>pup-e-picker (Class Version)</h1>
				</header>
				<ClassSection
					activeTab={(activeTab) => {
						this.setState({ activeTab: activeTab });
					}}
					favCount={favCount}
					unFavCount={unFavCount}
				>
					{activeTab === "create" ? (
						<ClassCreateDogForm />
					) : activeTab === "none" ||
					  activeTab === "favourite" ||
					  activeTab === "unFavourite" ? (
						<ClassDogs
							FavAndUnFavData={{
								activeTab: activeTab,
								favCount: this.handleFavCount,
								unFavCount: this.handleUnFavCount,
							}}
						/>
					) : null}
				</ClassSection>
			</div>
		);
	}
}
