// you can use this type for react children if you so choose
import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { SectionSelector } from "../Shared/Selectors";
import { useState } from "react";
import { baseUrl } from "../api";

export const FunctionalSection = () => {
	const [isFavActive, setIsFavActive] = useState("");
	const [isUnFavActive, setIsUnFavActive] = useState("");
	const [isCreateDogActive, setIsCreateDogActive] = useState("");

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
						activeClass={isFavActive}
						count={`${baseUrl}/favorited`.length}
						onClick={() => {
							setIsFavActive("active");
							setIsCreateDogActive("");
							setIsUnFavActive("");
							if (isFavActive === "active") setIsFavActive("");
						}}
					/>
					{/* This should display the unfavorited count */}
					<SectionSelector
						section="unfavorited"
						activeClass={isUnFavActive}
						count={`${baseUrl}/unfavorited`.length}
						onClick={() => {
							setIsUnFavActive("active");
							setIsCreateDogActive("");
							setIsFavActive("");
							if (isUnFavActive === "active") setIsUnFavActive("");
						}}
					/>
					<div
						className={`selector ${isCreateDogActive}`}
						onClick={() => {
							setIsCreateDogActive("active");
							setIsFavActive("");
							setIsUnFavActive("");
							if (isCreateDogActive === "active") setIsCreateDogActive("");
						}}
					>
						create dog
					</div>
				</div>
			</div>
			<div className="content-container">
				{isCreateDogActive === "" ? (
					<FunctionalDogs
						isFavActive={isFavActive}
						isUnFavActive={isUnFavActive}
					/>
				) : null}
				{isCreateDogActive === "active" ? <FunctionalCreateDogForm /> : null}
			</div>
		</section>
	);
};
