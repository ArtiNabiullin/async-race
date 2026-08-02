export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerPage {
  winners: Winner[];
  totalCount: number;
}
