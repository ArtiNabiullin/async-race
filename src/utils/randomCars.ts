import type { CarData } from "../models/car";

const CAR_BRANDS = [
  "Tesla",
  "Ford",
  "BMW",
  "Audi",
  "Toyota",
  "Honda",
  "Mercedes",
  "Lexus",
  "Volvo",
  "Nissan",
];

const CAR_MODELS = [
  "Model S",
  "Mustang",
  "X5",
  "A6",
  "Camry",
  "Civic",
  "E-Class",
  "RX",
  "XC90",
  "GT-R",
];

const getRandomItem = (items: string[]): string => {
  const randomIndex = Math.floor(Math.random() * items.length);

  return items[randomIndex] ?? "";
};

const createRandomColor = (): string => {
  const randomColor = Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, "0");

  return `#${randomColor}`;
};

export const createRandomCarData = (): CarData => {
  const brand = getRandomItem(CAR_BRANDS);
  const model = getRandomItem(CAR_MODELS);

  return {
    name: `${brand} ${model}`,
    color: createRandomColor(),
  };
};
