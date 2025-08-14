import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type {
  ShipDetail,
  ShipInfo,
  ShipModificationEffect,
  ShipModificationEffectTable,
} from "@/types/Ship";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// public\icon\ship_0001_thumbnail.png
export function getShipThumbnail(shipId: string) {
  const id = ("000" + shipId).slice(-4);
  return `icon/ship_${id}_thumbnail.png`;
}

export function convertToPSTTimestamp() {
  const dateTime = new Date();
  dateTime.setHours(dateTime.getUTCHours() - 8);
  return dateTime.getTime();
}

/**
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format
 * @param dateString - format YYYY-MM-DDTHH:mm:ss.sss
 * @returns no. of milliseconds
 */
export function getPSTTimestamp(dateString: string) {
  return new Date(dateString + "-08:00").getTime();
}

// public\full\ship_0001_full.png
export function getShipFullImage(shipId: string) {
  const id = ("0000" + shipId).slice(-4);
  return `full/ship_${id}_full.png`;
}

export function replaceAndSanitizeEffect(text: string) {
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
    )
    .replaceAll(
      /\[(Straw Hat Pirates|Red-Haired Pirates|Bandits|Navy|Buggy Pirates|Baratie|Krieg Pirates|Arlong Pirates|Giant Pirate Crew|Spade Pirates|Drum Kingdom|Baroque Works|Alabasta Kingdom|Kami's Army|Jaya|Foxy Pirates|CP0|Galley-La Company|World Government|CP9|Ohara|Impel Down|Thriller Bark Pirates|Rumbar Pirates|Blackbeard Pirates|Revolutionary Army|Kuja Pirates|Whitebeard Pirates|Kamabakka Queendom|Buggy's Delivery|Neo Marines|Golden Lion Pirates|Bluejam Pirates|Fallen Monk Pirates|On-Air Pirates|Hawkins Pirates|Bonney Pirates|Kid Pirates|Heart Pirates|Firetank Pirates|Ryugu Kingdom|Sun Pirates|Flying Pirates|New Fish-Man Pirates|Dressrosa Kingdom|Donquixote Pirates|Tontatta Kingdom|Barto Club|Happosui Army|Beautiful Pirates|Gran Tesoro|World Economic Journal|Evil Black Drum Kingdom|Mokomo Dukedom|Germa 66|Big Mom Pirates|Roger Pirates|Kozuki Clan|Akazaya Nine|SWORD|Animal Kingdom Pirates|Kurozumi Clan|Rolling Pirates|Rocks Pirates|Alvida Pirates|Holy Knights|Windmill Village|CP8)\]/g,
      '<span class="pl-1 pr-[10px] rounded-s text-xs font-semibold inline-flex justify-center items-center align-text-bottom text-black [clip-path:polygon(0%_0%,100%_0%,93%_50%,100%_100%,0%_100%)] TAG_GROUP_1">$1</span>',
    )
    .replaceAll(
      /\[(Child|Fish-Man|Giant|Royalty|Seven Warlords of the Sea|Supernova|Worst Generation|Celestial Dragon|Merfolk|Scientist|Four Emperors|Navy Fleet Admiral|Navy Admiral|Navy Vice Admiral|Cross Guild|Tontatta|Homies|Sweet Three General|Mink|Tobi Roppo|Lead Performer|Vegapunk|Seraphim|Five Elders)\]/g,
      '<span class="pl-1 pr-[10px] rounded-s text-xs font-semibold inline-flex justify-center items-center align-text-bottom text-white [clip-path:polygon(0%_0%,100%_0%,93%_50%,100%_100%,0%_100%)] TAG_GROUP_2">$1</span>',
    )
    .replaceAll(
      /\[(Logia-type|Paramythia-type|Zoan-type|Mythical Zoan-type|Ancient Zoan-type)\]/g,
      '<span class="pl-1 pr-[10px] rounded-s text-xs font-semibold inline-flex justify-center items-center align-text-bottom text-white [clip-path:polygon(0%_0%,100%_0%,93%_50%,100%_100%,0%_100%)] TAG_GROUP_3">$1</span>',
    )
    .replaceAll(
      /\[(East Blue Arc|Alabasta Arc|Skypiea Arc|Davy Back Fight Arc|Water Seven Arc|Enies Lobby Arc|Thriller Bark Arc|Sabaody Archipelago Arc|Amazon Lily Arc|Great Prison Impel Down Arc|Marineford Paramount War Arc|Fish-Man Island Arc|Punk Hazard Arc|Dressrosa Arc|Zou Arc|Whole Cake Island Arc|Reverie Arc|Land of Wano Arc|Egghead Arc|)\]/g,
      '<span class="pl-1 pr-[10px] rounded-s text-xs font-semibold inline-flex justify-center items-center align-text-bottom text-white [clip-path:polygon(0%_0%,100%_0%,93%_50%,100%_100%,0%_100%)] TAG_GROUP_4">$1</span>',
    );
}

export function replaceAndSanitizeSpecial(text: string) {
  return text
    .replace(
      /\[THRESHOLD_DAMAGE_CUT\]/,
      '<img class="w-5 h-5 inline" src="/threshold_damagecut.png" alt="threshold damage cut" />',
    )
    .replace(
      /\[ATK_UP\]/,
      '<img class="w-5 h-5 inline" src="/atk_up.png" alt="attack up"  />',
    )
    .replace(
      /\[EOT_HEAL\]/,
      '<img class="w-5 h-5 inline" src="/eot_heal.png" alt="eot heal"  />',
    )
    .replace(
      /\[EOT_HEAL_TO_DAMAGE\]/,
      '<img class="w-5 h-5 inline" src="/heal_slot_to_damage.png" alt="eot heal slot to damage"  />',
    );
}

export function flattenShipData(shipInfo: ShipInfo) {
  const shipDetail: ShipDetail[] = [];
  for (let index = 0; index < shipInfo.effect.length; index++) {
    const tempDetail = {
      effect: shipInfo.effect[index],
      ...(shipInfo.superCola && { superColaCount: shipInfo.superCola[index] }),
      ...(shipInfo.cola && { colaCount: shipInfo.cola[index] }),
      ...(shipInfo.cd && { cd: shipInfo.cd[index] }),
      ...(shipInfo.period && { period: shipInfo.period[index] }),
      ...(shipInfo.special && { special: shipInfo.special[index] }),
    };
    shipDetail.push(tempDetail);
  }
  return shipDetail;
}

export function flattenShipModificationData(
  modificationInfo: ShipModificationEffectTable,
) {
  const modificationDetail: ShipModificationEffect[] = [];
  for (let index = 0; index < modificationInfo.phase.length; index++) {
    const tempModificationDetail = {
      phase: modificationInfo.phase[index],
      effect: modificationInfo.effect[index],
      special: modificationInfo.special[index],
      cd: modificationInfo.cd[index],
    };
    modificationDetail.push(tempModificationDetail);
  }
  return modificationDetail;
}
