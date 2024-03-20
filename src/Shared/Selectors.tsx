export const SectionSelector = ({
	section,
	count,
	activeClass,
	onClick,
}: {
	section: string;
	count: number;
	activeClass: string | null;
	onClick: (event: React.MouseEvent<HTMLElement>) => void;
}) => {
	return (
		<>
			<div
				className={`selector ${activeClass}`}
				onClick={onClick}
			>
				{section} ({count})
			</div>
		</>
	);
};
