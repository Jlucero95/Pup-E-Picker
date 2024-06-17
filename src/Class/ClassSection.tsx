// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ClassDogs } from "./ClassDogs";
import { ClassCreateDogForm } from "./ClassCreateDogForm";
import { HandleDogInfo } from "../types";

export type ClassSectionState = {
	handleDogInfo: HandleDogInfo;
};

export class ClassSection extends Component<
	Record<string, never>,
	ClassSectionState
> {
	state: ClassSectionState = {
		handleDogInfo: {
			isFavActive: "",
			isUnFavActive: "",
			isCreateDogActive: "",
			favDogCount: 0,
			unFavDogCount: 0,
		},
	};

<<<<<<< HEAD
	render() {
		const {
			favDogCount,
			unFavDogCount,
			isFavActive,
			isUnFavActive,
			isCreateDogActive,
		} = this.state.handleDogInfo;

		return (
			<section id="main-section">
				<div className="container-header">
					<div className="container-label">Dogs: </div>
=======
export class ClassSection extends Component {
  render() {
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">Dogs: </div>
>>>>>>> parent of d40504a (Started on Class Component side)

          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>

<<<<<<< HEAD
					<div className="selectors">
						{/* This should display the favorited count */}
						<div
							className={`selector ${isFavActive}`}
							onClick={() => {
								if (isFavActive === "") {
									this.setState({
										handleDogInfo: {
											isFavActive: "active",
											isUnFavActive: "",
											isCreateDogActive: "",
											favDogCount: favDogCount,
											unFavDogCount: unFavDogCount,
										},
									});
								} else {
									this.setState({
										handleDogInfo: {
											isFavActive: "",
											isUnFavActive: "",
											isCreateDogActive: "",
											favDogCount: favDogCount,
											unFavDogCount: unFavDogCount,
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
										handleFavorites: {
											isFavActive: "",
											isUnFavActive: "active",
											isCreateDogActive: "",
										},
									});
								} else {
									this.setState({
										handleFavorites: {
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
								if (isUnFavActive === "") {
									this.setState({
										handleFavorites: {
											isFavActive: "",
											isUnFavActive: "",
											isCreateDogActive: "active",
										},
									});
								} else {
									this.setState({
										handleFavorites: {
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
							handleDogInfo={(handleDogInfo) => {
								this.setState({
									handleDogInfo: handleDogInfo,
								});
							}}
						/>
					) : (
						<ClassCreateDogForm />
					)}
				</div>
			</section>
		);
	}
=======
          <div className="selectors">
            {/* This should display the favorited count */}
            <div className={`selector`} onClick={() => {}}>
              favorited ( 0 )
            </div>

            {/* This should display the unfavorited count */}
            <div className={`selector`} onClick={() => {}}>
              unfavorited ( 0 )
            </div>
            <div className={`selector active`} onClick={() => {}}>
              create dog
            </div>
          </div>
        </div>
        <div className="content-container"></div>
      </section>
    );
  }
>>>>>>> parent of d40504a (Started on Class Component side)
}
