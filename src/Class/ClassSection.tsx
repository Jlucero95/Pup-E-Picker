// you can use `ReactNode` to add a type to the children prop
import { Component } from "react";
import { Link } from "react-router-dom";
import { ClassDogs } from "./ClassDogs";
import { SectionSelector } from "../Shared/Selectors";
import { ClassCreateDogForm } from "./ClassCreateDogForm";

export class ClassSection extends Component<Record<string, never>> {
	state = {
		isFavActive: "",
		isUnFavActive: "",
		isCreateDogActive: "",
	};

	render() {
		const { isCreateDogActive, isFavActive, isUnFavActive } = this.state;

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
							count={0}
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
							count={0}
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
					{isCreateDogActive === "" ? (
						<ClassDogs
							isFavActiveProp={isFavActive}
							isUnFavActiveProp={isUnFavActive}
						/>
					) : (
						<ClassCreateDogForm />
					)}
				</div>
			</section>
		);
	}
}
