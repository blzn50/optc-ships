import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// public\icon\ship_0001_thumbnail.png
export function getShipThumbnail(shipId: string) {
  const id = ("000" + shipId).slice(-4);
  return `icon/ship_${id}_thumbnail.png`;
}

// public\full\ship_0001_full.png
export function getShipFullImage(shipId: string) {
  const id = ("0000" + shipId).slice(-4);
  return `full/ship_${id}_full.png`;
}
