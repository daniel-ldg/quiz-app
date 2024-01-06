import isHexColor from "validator/lib/isHexColor";

export const hexToRgb = (str: string): [number, number, number] => {
	const hex = str.startsWith("#") ? str : `#${str}`;

	if (!isHexColor(hex)) {
		throw new Error("String is not a hexadecimal color");
	}

	const r = parseInt(hex.slice(1, 3), 16);
	const g = parseInt(hex.slice(3, 5), 16);
	const b = parseInt(hex.slice(5, 7), 16);

	return [r, g, b];
};

export const generateHarmoniousColors = (
	hexColor: string
): { primaryVariants: string[]; harmoniousVariants: string[] } => {
	const originalColor = hexToRgb(hexColor);

	// Generate a lighter color for the original color
	const lighterColor = originalColor.map(c => Math.min(c + 20, 255)) as [number, number, number];

	// Generate a harmonious color that combines well with the original
	const harmoniousColor = originalColor.map((c, i) => {
		if (i === 0) {
			// Adjust the red component
			return Math.min(c + 30, 255);
		} else if (i === 1) {
			// Adjust the green component
			return Math.max(c - 30, 0);
		} else {
			// Adjust the blue component
			return Math.min(c + 30, 255);
		}
	}) as [number, number, number];

	// Generate a lighter version of the harmonious color
	const lighterHarmoniousColor = harmoniousColor.map(c => Math.min(c + 20, 255)) as [number, number, number];

	return {
		primaryVariants: [`rgb(${originalColor.join(", ")})`, `rgb(${lighterColor.join(", ")})`],
		harmoniousVariants: [`rgb(${harmoniousColor.join(", ")})`, `rgb(${lighterHarmoniousColor.join(", ")})`],
	};
};
