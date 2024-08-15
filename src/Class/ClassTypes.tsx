import { ActiveTab } from "./ClassSection";

export type CLassSectionState = {
	activeTab: ActiveTab;
	favCount: number;
	unFavCount: number;
	isLoading: boolean;
};
