export const SectionSelector = ({
	section,
	count,
	activeClass,
}: {
	section: string;
	count: number;
	activeClass: string | null;
}) => {
	return (
		<>
			<div
				className={`selector ${activeClass}`}
				onClick={() => {}}
			>
				{section} ({count})
			</div>
		</>
	);
};
