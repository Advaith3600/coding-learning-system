import type { ModuleDefinition } from "../types";
import { MODULE_1 } from "./m01";
import { MODULE_2 } from "./cu02";
import { MODULE_3 } from "./cu03";
import { MODULE_4 } from "./cu04";
import { MODULE_5 } from "./cu05";

export { MODULE_1, MODULE_2, MODULE_3, MODULE_4, MODULE_5 };

export const ALL_MODULES: readonly ModuleDefinition[] = [
  MODULE_1,
  MODULE_2,
  MODULE_3,
  MODULE_4,
  MODULE_5,
];
