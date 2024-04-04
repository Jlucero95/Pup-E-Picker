// you can use this type for react children if you so choose
import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { SectionSelector } from "../Shared/Selectors";
import { useState } from "react";

export const FunctionalSection = () => {
	const [isFavActive, setIsFavActive] = useState("");
	const [isUnFavActive, setIsUnFavActive] = useState("");
	const [isCreateDogActive, setIsCreateDogActive] = useState("");
	const [favDogCount, setFavDogCount] = useState(0);
	const [unFavDogCount, setUnFavDogCount] = useState(0);

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
						count={favDogCount}
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
						count={unFavDogCount}
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
						favDogCount={setFavDogCount}
						unFavDogCount={setUnFavDogCount}
					/>
				) : (
					<FunctionalCreateDogForm />
				)}
			</div>
		</section>
	);
};
