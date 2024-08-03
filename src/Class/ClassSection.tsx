// you can use `ReactNode` to add a type to the children prop
import { Component } from "react";
import { Link } from "react-router-dom";
import { ClassDogs } from "./ClassDogs";
import { SectionSelector } from "../Shared/Selectors";
import { CLassSectionState } from "./ClassTypes";

export class ClassSection extends Component<CLassSectionState> {
	state: CLassSectionState = {
		isFavActive: "",
		isUnFavActive: "",
		isCreateDogActive: "",
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
		const {
			isCreateDogActive,
			isFavActive,
			isUnFavActive,
			favCount,
			unFavCount,
		} = this.state;

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

					<div className="selectors">
						{/* This should display the favorited count */}
						<SectionSelector
							section="favorited"
							activeClass={isFavActive}
							count={favCount}
							onClick={() => {
								this.setState({
									isFavActive: "active",
									isUnFavActive: "",
									isCreateDogActive: "",
								});
								if (isFavActive === "active") {
									this.setState({ isFavActive: "" });
								}
							}}
						/>

						{/* This should display the unfavorited count */}
						<SectionSelector
							section="unfavorited"
							activeClass={isUnFavActive}
							count={unFavCount}
							onClick={() => {
								this.setState({
									isFavActive: "",
									isUnFavActive: "active",
									isCreateDogActive: "",
								});
								if (isUnFavActive === "active") {
									this.setState({ isUnFavActive: "" });
								}
							}}
						/>
						<div
							className={`selector ${isCreateDogActive}`}
							onClick={() => {
								this.setState({
									isFavActive: "",
									isUnFavActive: "",
									isCreateDogActive: "active",
								});
								if (isCreateDogActive === "active")
									this.setState({ isCreateDogActive: "" });
							}}
						>
							create dog
						</div>
					</div>
				</div>
				<div className="content-container">
					{
						<ClassDogs
							FavAndUnFavData={{
								isFavActive: isFavActive,
								isUnFavActive: isUnFavActive,
								isCreateActive: isCreateDogActive,
								favCount: this.handleFavCount,
								unFavCount: this.handleUnFavCount,
							}}
						/>
					}
				</div>
			</section>
		);
	}
}
