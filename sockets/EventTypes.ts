import { Player, Question } from "@prisma/client";

export interface AnswerSent {
	questionId: string;
	answer: string;
}

export enum ServerDisconnectReason {
	unexpectedHandshakeQuery,
	lobbyNotFound,
	playerIdAlreadyInLobby,
}

export interface QuestionSent extends Omit<Question, "correctAnswer"> {
	questionId: string;
	timerStart: EpochTimeStamp;
	timerStop: EpochTimeStamp;
	questionNumber: number;
	totalQuestions: number;
}

export interface AnswerFeedback {
	questionId: string;
	isCorrect: boolean;
	score: number;
}

export interface PlayerScoreUpdate extends Pick<Player, "id"> {
	score: number;
	increased: number;
	streak: number;
}

export interface ScoreboardUpdate {
	players: PlayerScoreUpdate[];
}

export enum PlayerUpdateType {
	join,
	left,
	reconect,
	updateProfile,
}

export interface LobbyPlayers {
	players: Player[];
}

export interface LobbyPlayersUpdate extends LobbyPlayers {
	update: {
		player: Player;
		type: PlayerUpdateType;
	};
}

export interface ServerToClientEvents {
	lobbyPlayersUpdate: (playersUpdate: LobbyPlayersUpdate) => void;
	startingMatch: (startTime: EpochTimeStamp) => void;
	displayQuestion: (question: QuestionSent) => void;
	answerFeedback: (answer: AnswerFeedback) => void;
	scoreboardUpdate: (scoreboard: ScoreboardUpdate) => void;
	endingMatch: () => void;
	disconnectByGameServer: (reason: ServerDisconnectReason) => void;
}

export interface ClientToServerEvents {
	getLobbyPlayers: (response: (players: LobbyPlayers) => void) => void;
	hostStartMatch: () => void;
	sendAnswer: (answer: AnswerSent, ack: (isOnTime: boolean) => void) => void;
	updateProfile: (player: Omit<Player, "id">) => void;
}

export interface InterServerEvents {}
