import { MotionProps, motion } from "framer-motion";
import { useMemo } from "react";
import { Tailwindest } from "tailwindest";

const BlurBackground = () => {
	const animations = useMemo(() => genNonOverlappingAnimation(3, 10), []);
	return (
		<div className="absolute -z-50 top-0 bottom-0 left-0 right-0 overflow-hidden">
			<MotionCircle
				height="h-48"
				width="w-48"
				color="bg-blue-500"
				initial={{ x: 0, y: 0, scale: 0 }}
				animate={animations.at(0)}
				transition={{ duration: 40, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
			/>
			<MotionCircle
				height="h-48"
				width="w-48"
				color="bg-orange-500"
				initial={{ x: 0, y: 0, scale: 0 }}
				animate={animations.at(1)}
				transition={{ duration: 45, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
			/>
			<MotionCircle
				height="h-48"
				width="w-48"
				color="bg-green-500"
				initial={{ x: 0, y: 0, scale: 0 }}
				animate={animations.at(2)}
				transition={{ duration: 50, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
			/>
		</div>
	);
};

interface CircleProps extends MotionProps {
	width: Required<Tailwindest["width"]>;
	height: Required<Tailwindest["height"]>;
	color: Required<Tailwindest["backgroundColor"]>;
}

const MotionCircle: React.FC<CircleProps> = ({ width, height, color, ...motionProps }) => {
	const className = `absolute top-0 bottom-0 left-0 right-0 m-auto rounded-full filter blur-xl opacity-20 ${width} ${height} ${color}`;
	return <motion.div className={className} {...motionProps}></motion.div>;
};

const isOverlapping = (circleA: CircleAnimation, circleB: CircleAnimation, step: number) => {
	// Assuming a fixed radius for simplicity
	const radius = 24; // Adjust based on your actual circle size
	const distance = Math.sqrt(
		Math.pow(circleA.x[step] - circleB.x[step], 2) + Math.pow(circleA.y[step] - circleB.y[step], 2)
	);
	return distance < radius * 2;
};

const generateRandomValue = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

const adjustValue = (previous: number, min: number, max: number, maxChange: number) => {
	let newValue = previous + generateRandomValue(-maxChange, maxChange);
	return Math.min(Math.max(newValue, min), max);
};

type CircleAnimation = {
	x: number[];
	y: number[];
	scale: number[];
};

const genNonOverlappingAnimation = (numCircles: number, numSteps: number): Array<CircleAnimation> => {
	const animateProps: Array<CircleAnimation> = [];

	for (let i = 0; i < numCircles; i++) {
		let newPath: CircleAnimation;
		let hasOverlap;
		do {
			hasOverlap = false;
			const startX = generateRandomValue(-300, 300);
			const startY = generateRandomValue(-200, 200);
			const startScale = generateRandomValue(4, 12) / 10;

			newPath = {
				x: [startX],
				y: [startY],
				scale: [startScale],
			};

			for (let step = 1; step < numSteps; step++) {
				newPath.x.push(adjustValue(newPath.x[step - 1], -300, 300, 50)); // maxChange is the maximum change in position
				newPath.y.push(adjustValue(newPath.y[step - 1], -200, 200, 50));
				newPath.scale.push(adjustValue(newPath.scale[step - 1], 0.4, 1.2, 0.2));
			}

			// Check for overlap with existing paths
			for (let step = 0; step < numSteps; step++) {
				for (let j = 0; j < animateProps.length; j++) {
					if (isOverlapping(newPath, animateProps[j], step)) {
						hasOverlap = true;
						break;
					}
				}
				if (hasOverlap) break;
			}
		} while (hasOverlap);

		animateProps.push(newPath);
	}
	return animateProps;
};

export default BlurBackground;
