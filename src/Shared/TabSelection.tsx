import { ActiveTab } from "../Class/ClassSection";
import { SectionSelector } from "./Selectors";

export type HeaderProps = {
	activeTab: ActiveTab;
	favCount: number;
	unFavCount: number;
	onTabClick: (tab: ActiveTab) => void;
};

export const TabSelection = ({
	activeTab,
	favCount,
	unFavCount,
	onTabClick,
}: HeaderProps) => {
	return (
		<div className="selectors">
			{/* This should display the favorited count */}

			<SectionSelector
				activeClass={`${activeTab === "favourite" ? "active" : ""}`}
				count={favCount}
				onClick={() =>
					onTabClick(activeTab === "favourite" ? "none" : "favourite")
				}
				section="favorited"
			/>

			{/* This should display the unfavorited count */}

			<SectionSelector
				section="unfavorited"
				activeClass={`${activeTab === "unFavourite" ? "active" : ""}`}
				count={unFavCount}
				onClick={() =>
					onTabClick(activeTab === "unFavourite" ? "none" : "unFavourite")
				}
			/>
			<div
				className={`selector ${activeTab === "create" ? "active" : ""}`}
				onClick={() => onTabClick(activeTab === "create" ? "none" : "create")}
			>
				create dog
			</div>
		</div>
	);
};
