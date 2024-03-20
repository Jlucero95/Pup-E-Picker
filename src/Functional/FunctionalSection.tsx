// you can use this type for react children if you so choose
// import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { SectionSelector } from "../Shared/Selectors";

export const FunctionalSection = () => {
	return (
		<section id="main-section">
			<div className="container-header">
				<div className="container-label">Dogs: </div>
				<Link
					to={"/class"}
					className="btn"
				>
					Change to Class
				</Link>
				<div className="selectors">
					{/* This should display the favorited count */}
					<SectionSelector
						section="favorited"
						activeClass=""
						count={12}
					/>
					{/* This should display the unfavorited count */}
					<SectionSelector
						section="unfavorited"
						activeClass=""
						count={25}
					/>
					<div
						className={`selector`}
						onClick={() => {}}
					>
						create dog
					</div>
				</div>
			</div>
			<div className="content-container">
				<FunctionalDogs />
				<FunctionalCreateDogForm />
			</div>
		</section>
	);
};
