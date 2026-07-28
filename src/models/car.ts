export interface CarData {
  name: string;
  color: string;
}

export interface Car extends CarData {
  id: number;
}
