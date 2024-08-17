/* eslint-disable no-mixed-spaces-and-tabs */
// you can use `ReactNode` to add a type to the children prop
import { Component, ReactNode } from "react";
import { Link } from "react-router-dom";
import { CLassSectionState } from "./ClassTypes";
import { ActiveTab, TabSelection } from "../Shared/TabSelection";

type ClassSectionProps = {
	children: ReactNode;
	activeTab: (activeTab: ActiveTab) => void;
	favCount: number;
	unFavCount: number;
};

export class ClassSection extends Component<
	ClassSectionProps,
	CLassSectionState
> {
	state: CLassSectionState = {
		activeTab: "none",
		favCount: 0,
		unFavCount: 0,
		isLoading: false,
	};

	handleTabClick = (tab: ActiveTab) => {
		this.setState({ activeTab: tab });
		this.props.activeTab(tab);
		this.setState({
			favCount: this.props.favCount,
			unFavCount: this.props.unFavCount,
		});
	};

	render() {
		const { favCount, unFavCount, activeTab } = this.state;
		const { children } = this.props;

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
				<div className="content-container">{children}</div>
			</section>
		);
	}
}
export type { ActiveTab };
