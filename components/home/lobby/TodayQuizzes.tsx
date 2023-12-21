import useSWRImmutable from "swr/immutable";
import React from "react";
import { GetTodayQuizzesResponse } from "@/pages/api/quiz/today";
import { Fetcher } from "swr";

interface Props {
	selected?: string;
	onSelect: (id: string) => void;
}

const fetcher: Fetcher<GetTodayQuizzesResponse> = (url: string) => fetch(url).then(res => res.json());

const TodayQuizzes: React.FC<Props> = ({ selected, onSelect }) => {
	const { data, error, mutate, isLoading, isValidating } = useSWRImmutable("/api/quiz/today", fetcher, {
		revalidateOnMount: true,
	});

	const retryFetch = () => {
		mutate();
	};

	const loadingCard = <div className="p-4 m-2 rounded-lg bg-gray-100">Cargando...</div>;
	const errorCard = (
		<div className="p-4 m-2 rounded-lg bg-red-100">
			<p>Error al cargar los quizzes. Por favor, intenta de nuevo.</p>
			<button onClick={retryFetch} className="mt-2 py-2 px-4 rounded bg-blue-500 text-white hover:bg-blue-700">
				Reintentar
			</button>
		</div>
	);
	const noQuizzesCard = (
		<div className="p-4 m-2 rounded-lg bg-yellow-100">No hay quizzes disponibles en este momento.</div>
	);
	const quizzesCards = data?.quizzes.map(quiz => (
		<div
			key={quiz.id}
			onClick={() => onSelect(quiz.id)}
			className={`p-2 m-2 rounded-lg cursor-pointer hover:bg-gray-100 border ${
				selected === quiz.id ? "ring-2 ring-blue-500" : ""
			}`}>
			<h4 className="text-md font-semibold">{quiz.name}</h4>
			{quiz.description && <p className="text-sm">{quiz.description}</p>}
		</div>
	));

	const validatingOverlay = (
		<div className="absolute w-full h-full bg-black/20 backdrop-blur-lg grid place-items-center">
			<span className="loading loading-ring loading-lg"></span>
		</div>
	);

	return (
		<div className="flex flex-col">
			<h3 className="font-semibold">Selecciona un quiz</h3>
			<div className={`relative h-28 ${isValidating ? "overflow-hidden" : "overflow-auto"}`}>
				{error && errorCard}
				{isLoading && loadingCard}
				{isValidating && !isLoading && validatingOverlay}
				{data?.quizzes.length === 0 ? noQuizzesCard : quizzesCards}
			</div>
		</div>
	);
};

export default TodayQuizzes;
