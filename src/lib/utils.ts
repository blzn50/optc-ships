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

export function replaceAndSanitizeText(text: string) {
  return text
    .replaceAll(
      /\[?(STR|DEX|QCK|INT)\]?/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background $1">$1</span>',
    )
    .replaceAll(
      /\[?PSY\]?/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background text-black PSY">PSY</span>',
    )
    .replaceAll(
      /\[RCV\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-black RCV">RCV</span>',
    )
    .replaceAll(
      /\[SEMLA\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-white SEMLA">SEMLA</span>',
    )
    .replaceAll(
      /\[WANO\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-white WANO">WANO</span>',
    )
    .replaceAll(
      /\[RAINBOW\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background text-black RAINBOW">RAINBOW</span>',
    )
    .replaceAll(
      /\[EMPTY\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background EMPTY">EMPTY</span>',
    )
    .replaceAll(
      /\[BLOCK\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background BLOCK">BLOCK</span>',
    )
    .replaceAll(
      /\[BOMB\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background text-white BOMB">BOMB</span>',
    )
    .replaceAll(
      /\[SUPERBOMB\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background SUPERBOMB">SUPERBOMB</span>',
    )
    .replaceAll(
      /\[G\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-background text-black G">G</span>',
    )
    .replaceAll(
      /\[TND\]/g,
      '<span class="px-1 rounded text-xs font-semibold align-text-bottom text-white TND">TND</span>',
    );
}
