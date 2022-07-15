import React from "react";

interface RatingStarsProps {
	rating: number;
}

const RatingStars = ({ rating }: RatingStarsProps) => {
	return (
		<div>
			<span className="text-md font-semibold">{rating.toFixed(1)}</span>
			<div className="rating rating-sm ml-2">
				{Array(5)
					.fill("radio")
					.map((_, index) => (
						<input
							key={index}
							type="radio"
							name="rating-2"
							className="mask mask-star-2 bg-orange-400"
							checked={index + 1 == rating}
						/>
					))}
			</div>
		</div>
	);
};

export default RatingStars;
