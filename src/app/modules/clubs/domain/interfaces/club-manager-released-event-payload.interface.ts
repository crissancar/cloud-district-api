export interface ClubManagerReleasedEventPayload {
	club: {
		id: string;
		revisedBudget: string;
	};
	manager: {
		id: string;
	};
}
