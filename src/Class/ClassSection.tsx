// you can use `ReactNode` to add a type to the children prop
import { Component } from "react";
import { Link } from "react-router-dom";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { ClassSectionState } from "../types";

export class ClassSection extends Component<ClassSectionState> {
	state: ClassSectionState = {
		handleActiveState: {
			isFavActive: "",
			isUnFavActive: "",
			isCreateDogActive: "",
		},
		handleDogCount: {
			favDogCount: 0,
			unFavDogCount: 0,
		},
	};

	render() {
		const { isFavActive, isUnFavActive, isCreateDogActive } =
			this.state.handleActiveState;

		const { favDogCount, unFavDogCount } = this.state.handleDogCount;

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
						<div
							className={`selector ${isFavActive}`}
							onClick={() => {
								if (isFavActive === "") {
									this.setState({
										handleActiveState: {
											isFavActive: "active",
											isUnFavActive: "",
											isCreateDogActive: "",
										},
									});
								} else {
									this.setState({
										handleActiveState: {
											isFavActive: "",
											isUnFavActive: "",
											isCreateDogActive: "",
										},
									});
								}
							}}
						>
							favorited ({favDogCount})
						</div>

						{/* This should display the unfavorited count */}
						<div
							className={`selector ${isUnFavActive}`}
							onClick={() => {
								if (isUnFavActive === "") {
									this.setState({
										handleActiveState: {
											isFavActive: "",
											isUnFavActive: "active",
											isCreateDogActive: "",
										},
									});
								} else {
									this.setState({
										handleActiveState: {
											isFavActive: "",
											isUnFavActive: "",
											isCreateDogActive: "",
										},
									});
								}
							}}
						>
							unfavorited ({unFavDogCount})
						</div>
						<div
							className={`selector ${isCreateDogActive}`}
							onClick={() => {
								if (isCreateDogActive === "") {
									this.setState({
										handleActiveState: {
											isFavActive: "",
											isUnFavActive: "",
											isCreateDogActive: "active",
										},
									});
								} else {
									this.setState({
										handleActiveState: {
											isFavActive: "",
											isUnFavActive: "",
											isCreateDogActive: "",
										},
									});
								}
							}}
						>
							create dog
						</div>
					</div>
				</div>
				<div className="content-container">
					{isCreateDogActive === "" ? (
						<ClassDogs
							handleDogCount={(handleDogCount) => {
								this.setState({ handleDogCount: handleDogCount });
							}}
						/>
					) : (
						<ClassCreateDogForm />
					)}
				</div>
			</section>
		);
	}
}
