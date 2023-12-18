import { Color } from "@prisma/client";

export const COLOR_CLASS_NAME: Record<Color, string> = {
	gray: "bg-gray-500 hover:bg-gray-400",
	red: "bg-red-500 hover:bg-red-400",
	orange: "bg-orange-500 hover:bg-orange-400",
	amber: "bg-amber-500 hover:bg-amber-400",
	yellow: "bg-yellow-500 hover:bg-yellow-400",
	lime: "bg-lime-500 hover:bg-lime-400",
	green: "bg-green-500 hover:bg-green-400",
	emerald: "bg-emerald-500 hover:bg-emerald-400",
	teal: "bg-teal-500 hover:bg-teal-400",
	cyan: "bg-cyan-500 hover:bg-cyan-400",
	sky: "bg-sky-500 hover:bg-sky-400",
	blue: "bg-blue-500 hover:bg-blue-400",
	indigo: "bg-indigo-500 hover:bg-indigo-400",
	violet: "bg-violet-500 hover:bg-violet-400",
	purple: "bg-purple-500 hover:bg-purple-400",
	fuchsia: "bg-fuchsia-500 hover:bg-fuchsia-400",
	pink: "bg-pink-500 hover:bg-pink-400",
	rose: "bg-rose-500 hover:bg-rose-400",
};
