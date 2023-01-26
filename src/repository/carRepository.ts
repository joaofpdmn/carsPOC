import { number } from "joi";
import { prisma } from "../config/database.js";

async function getCars() {
  return prisma.cars.findMany();
}

async function getCar(id: number) {
  const data = await prisma.cars.findFirst({
    where: {
      id: id
    },
  });
  return data;
}

async function getCarWithLicensePlate(licensePlate: string) {
  const data = await prisma.cars.findUnique({
    where: {
      licensePlate: licensePlate,
    },
  });
  return data;
}

async function createCar(model: string, licensePlate: string, year: number, color: string) {
  const newCar = await prisma.cars.create({
    data: {
      model: model,
      licensePlate: licensePlate,
      year: (year.toString()),
      color: color,
    },
  });
  console.log(newCar);
}

async function deleteCar(id: number) {
  await prisma.cars.delete({
    where: {
      id: id,
    },
  });
}

const carRepository = {
  getCar,
  getCarWithLicensePlate,
  getCars,
  createCar,
  deleteCar
}

export default carRepository;