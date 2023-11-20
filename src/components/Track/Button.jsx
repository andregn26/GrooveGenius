const Button = ({ handleAddClick, handleRemoveClick, isSearchResults }) => {
	return (
		<>
			{isSearchResults ? (
				<button className=" flex justify-center items-center h-full p-2" onClick={handleAddClick}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 text-success"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth={1.5}
						stroke="currentColor">
						<path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
					</svg>
				</button>
			) : (
				<button className="flex justify-center items-center h-full p-2" onClick={handleRemoveClick}>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						className="h-4 w-4 text-error"
						fill="none"
						viewBox="0 0 24 24"
						stroke="currentColor">
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							d="M6 18L18 6M6 6l12 12"
						/>
					</svg>
				</button>
			)}
		</>
	);
};

export default Button;
