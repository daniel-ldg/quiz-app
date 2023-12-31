import { generateHarmoniousColors } from "@/utils/ColorUtils";
import { AnimationProps, MotionProps, motion } from "framer-motion";
import { SVGProps, useMemo } from "react";

export interface BlobProps {
	size?: string;
	color?: string;
	svgProps?: Omit<SVGProps<SVGSVGElement>, "ref"> & Omit<MotionProps, keyof AnimationProps>;
	pathProps?: Omit<SVGProps<SVGPathElement>, "ref"> & Omit<MotionProps, keyof AnimationProps>;
}

const Blob: React.FC<BlobProps> = ({ size = "200px", color = "#e9580a", svgProps, pathProps }) => {
	const uniqueGradientId = `gradient-${color}`;
	const randomOrderBlobs = useMemo(() => [...blobs].sort(() => Math.random() - 0.5), []); // create a new array
	const rotation = useMemo(() => (Math.random() < 0.5 ? 360 : -360), []);
	const gradientTransition: AnimationProps["transition"] = {
		stopColor: { duration: 10, repeat: Infinity, repeatType: "reverse" },
	};
	const { primaryVariants, harmoniousVariants } = useMemo(() => generateHarmoniousColors(color), [color]);
	return (
		<motion.svg
			viewBox="0 0 700 700"
			width={size}
			height={size}
			animate={{ rotate: rotation }}
			transition={{ rotate: { ease: "linear", duration: 60, repeat: Infinity } }}
			{...svgProps}>
			<defs>
				<radialGradient id={uniqueGradientId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
					<motion.stop offset="0%" animate={{ stopColor: primaryVariants }} transition={gradientTransition} />
					<motion.stop
						offset="100%"
						animate={{ stopColor: harmoniousVariants }}
						transition={gradientTransition}
					/>
				</radialGradient>
			</defs>
			<motion.g transform="translate(350 350)" fill={`url(#${uniqueGradientId})`}>
				<motion.path
					d={initialBlob}
					animate={{
						d: randomOrderBlobs,
					}}
					transition={{
						d: {
							repeat: Infinity,
							repeatType: "reverse",
							duration: 30,
						},
					}}
					{...pathProps}
				/>
			</motion.g>
		</motion.svg>
	);
};

const initialBlob =
	"M134.9 -238C174.4 -210.8 205.9 -173.9 229.2 -132.6C252.5 -91.3 267.8 -45.7 266.5 -0.8C265.2 44.2 247.3 88.3 228.3 137C209.2 185.8 189 239 150.7 260.3C112.5 281.5 56.3 270.8 4 263.9C-48.3 257 -96.7 254.1 -135.3 233.1C-174 212.1 -203.1 173 -222.2 131.2C-241.4 89.3 -250.7 44.7 -250.6 0.1C-250.4 -44.5 -240.8 -89 -218.6 -125.5C-196.3 -162.1 -161.5 -190.6 -122.9 -218.4C-84.4 -246.1 -42.2 -273.1 2.7 -277.8C47.7 -282.6 95.3 -265.1 134.9 -238";

const blobs = [
	"M129.1 -227.3C170.3 -199.9 208.5 -171.2 232 -133.1C255.5 -95 264.3 -47.5 262 -1.3C259.7 44.8 246.3 89.7 228.9 138.4C211.6 187.1 190.2 239.7 151.3 268.1C112.5 296.5 56.3 300.8 6.2 290C-43.8 279.3 -87.7 253.5 -128.1 226C-168.5 198.5 -205.5 169.3 -225.8 131.3C-246 93.3 -249.6 46.7 -248.9 0.4C-248.1 -45.8 -243.1 -91.7 -225.3 -133.8C-207.4 -176 -176.7 -214.4 -137 -242.7C-97.3 -270.9 -48.7 -289 -2.3 -284.9C44 -280.9 88 -254.8 129.1 -227.3",
	"M134.9 -236.2C171.4 -212.5 195.3 -169.5 224.2 -127C253.1 -84.4 287.1 -42.2 299.3 7C311.4 56.2 301.9 112.5 270.9 151.6C240 190.7 187.8 212.7 139 234.3C90.3 255.8 45.2 276.9 0 276.9C-45.2 276.9 -90.3 255.8 -138 233.6C-185.6 211.5 -235.7 188.2 -266.6 149.1C-297.5 110 -309.3 55 -301.9 4.3C-294.5 -46.5 -268.1 -93 -238.5 -134.4C-208.9 -175.8 -176.2 -212.2 -135.9 -233.8C-95.7 -255.4 -47.8 -262.2 0.7 -263.3C49.2 -264.5 98.3 -260 134.9 -236.2",
	"M137.5 -250C176.1 -216 203.7 -174.7 225.2 -131.9C246.8 -89 262.4 -44.5 271.4 5.2C280.3 54.8 282.6 109.7 262.4 154.8C242.1 200 199.3 235.5 151.8 260.3C104.3 285 52.2 299 5 290.4C-42.2 281.7 -84.4 250.5 -122.5 220.3C-160.6 190.1 -194.6 161.1 -216.8 124.5C-239.1 88 -249.5 44 -255.2 -3.2C-260.8 -50.5 -261.6 -101 -242.2 -142.4C-222.8 -183.8 -183.1 -216.2 -139.4 -247.2C-95.7 -278.2 -47.8 -307.8 0.8 -309.3C49.5 -310.7 99 -284 137.5 -250",
	"M135.3 -229C177.6 -209.9 215.7 -178.2 247.7 -137.9C279.8 -97.7 305.9 -48.8 310 2.3C314 53.5 296 107 268.6 155.4C241.2 203.7 204.3 246.9 158 271.7C111.7 296.4 55.8 302.7 5.6 293C-44.7 283.4 -89.3 257.7 -132.3 231.1C-175.4 204.4 -216.7 176.7 -243.2 138C-269.7 99.3 -281.4 49.7 -287.1 -3.3C-292.8 -56.2 -292.5 -112.5 -264.8 -149C-237 -185.6 -181.8 -202.4 -133.1 -217.8C-84.4 -233.1 -42.2 -247.1 2.2 -250.8C46.5 -254.5 93 -248.1 135.3 -229",
	"M155.5 -271.5C198.5 -244.5 228.3 -196.8 246 -148C263.7 -99.3 269.4 -49.7 273.3 2.2C277.2 54.2 279.3 108.3 260.4 155C241.5 201.6 201.5 240.7 154.6 262.6C107.7 284.5 53.8 289.2 5.8 279.2C-42.2 269.1 -84.4 244.1 -126.7 219.6C-169 195 -211.4 170.7 -239.4 134.2C-267.5 97.7 -281.2 48.8 -284.4 -1.8C-287.6 -52.5 -280.2 -105 -257.9 -151.5C-235.5 -198 -198.3 -238.4 -152.8 -264C-107.3 -289.6 -53.7 -300.3 1.3 -302.5C56.2 -304.8 112.5 -298.5 155.5 -271.5",
	"M136 -225.1C182.1 -209.1 229.2 -184.3 250.8 -145.3C272.5 -106.3 268.8 -53.2 271.4 1.5C274.1 56.2 283.2 112.5 265.4 158.1C247.5 203.7 202.8 238.7 154 254.2C105.3 269.8 52.7 265.9 2.2 262.1C-48.3 258.4 -96.7 254.8 -139.1 235.6C-181.5 216.4 -218.1 181.7 -245.2 139.9C-272.4 98 -290.2 49 -284.3 3.4C-278.4 -42.2 -248.8 -84.4 -224.6 -131.3C-200.3 -178.2 -181.4 -229.8 -144.9 -251.4C-108.3 -273 -54.2 -264.5 -4.6 -256.5C45 -248.6 90 -241.2 136 -225.1",
	"M126 -226.6C167 -194.6 206.5 -168.3 239.7 -131.5C273 -94.7 300 -47.3 300.4 0.2C300.8 47.8 274.7 95.7 244.1 137.1C213.5 178.5 178.5 213.5 137.1 232.1C95.7 250.7 47.8 252.8 -4.2 260.1C-56.2 267.4 -112.5 279.9 -150.7 259.4C-189 239 -209.2 185.8 -228 137C-246.7 88.3 -263.8 44.2 -270.2 -3.7C-276.5 -51.5 -272.1 -103 -246.3 -139.5C-220.6 -176.1 -173.6 -197.6 -129 -227.6C-84.4 -257.5 -42.2 -295.7 0.2 -296C42.5 -296.3 85 -258.6 126 -226.6",
	"M158.8 -273.9C205.2 -248.4 241.6 -204.4 256.6 -155.7C271.7 -107 265.3 -53.5 257.2 -4.7C249.2 44.2 239.3 88.3 222 133.1C204.7 177.8 179.8 223.1 141.6 255.6C103.3 288 51.7 307.5 2.3 303.4C-47 299.4 -94 271.8 -141.9 245C-189.8 218.1 -238.7 192.1 -257.4 151.4C-276.1 110.7 -264.6 55.3 -253.6 6.3C-242.7 -42.7 -232.2 -85.3 -211.8 -123.1C-191.5 -161 -161.2 -193.9 -124.3 -224.9C-87.3 -255.9 -43.7 -285 6.3 -295.9C56.2 -306.8 112.5 -299.5 158.8 -273.9",
	"M124.2 -219.6C160.7 -194 190 -160.3 223.6 -122.3C257.1 -84.4 295.1 -42.2 306 6.3C317 54.8 300.9 109.7 268.1 148.9C235.3 188.2 185.6 211.9 138.2 233.5C90.7 255 45.3 274.5 -5.5 284C-56.2 293.4 -112.5 292.9 -154.8 268.3C-197.1 243.7 -225.4 195.1 -249.6 146.4C-273.8 97.7 -293.9 48.8 -298.4 -2.6C-302.9 -54 -291.7 -108 -262.1 -147.3C-232.4 -186.5 -184.2 -211 -137.4 -230.7C-90.7 -250.4 -45.3 -265.2 -0.8 -263.9C43.8 -262.6 87.7 -245.2 124.2 -219.6",
	"M157 -268.9C205.8 -243.9 249 -206.3 274.6 -159.4C300.2 -112.5 308.1 -56.3 300.9 -4.1C293.8 48 271.6 96 243.3 138.1C214.9 180.3 180.5 216.6 138.9 236.8C97.3 256.9 48.7 261 -2.4 265.1C-53.5 269.3 -107 273.7 -151.6 255.2C-196.2 236.8 -231.9 195.7 -249.2 149.3C-266.4 103 -265.2 51.5 -257.1 4.7C-249.1 -42.2 -234.1 -84.4 -211.5 -121.3C-188.8 -158.3 -158.4 -190 -121.9 -222.1C-85.3 -254.1 -42.7 -286.6 5.7 -296.5C54.2 -306.5 108.3 -294 157 -268.9",
];

export default Blob;
