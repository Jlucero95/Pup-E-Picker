/* eslint-disable no-mixed-spaces-and-tabs */
// you can use `ReactNode` to add a type to the children prop
import { Component } from "react";
import { Link } from "react-router-dom";
import { ClassDogs } from "./ClassDogs";
import { CLassSectionState } from "./ClassTypes";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { TabSelection } from "../Shared/TabSelection";

export type ActiveTab = "favourite" | "unFavourite" | "create" | "none";

export class ClassSection extends Component {
	state: CLassSectionState = {
		activeTab: "none",
		favCount: 0,
		unFavCount: 0,
		isLoading: false,
	};

	handleTabClick = (tab: ActiveTab) => {
		this.setState({ activeTab: tab });
	};

	handleFavCount = (favCount: number) => {
		this.setState({ favCount: favCount });
	};
	handleUnFavCount = (unFavCount: number) => {
		this.setState({ unFavCount: unFavCount });
	};

	render() {
		const { favCount, unFavCount, activeTab } = this.state;

		return (
			<section id="main-section">
				<div className="container-header">
					<div className="container-label">Dogs: </div>

					<Link
						to={"/functional"}
						className="btn"
					>
						Change to Functional
					</Link>
					<TabSelection
						activeTab={activeTab}
						favCount={favCount}
						onTabClick={this.handleTabClick}
						unFavCount={unFavCount}
					/>
				</div>
				<div className="content-container">
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
				</div>
			</section>
		);
	}
}
