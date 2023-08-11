import { Log } from "./console";
import { LogLevel } from "./console/interface";

export let ARCOS_MODE = "release";

export async function getMode() {
  Log(
    "ts/branding.ts: getMode",
    "Attempting to retrieve mode from /mode",
    LogLevel.info
  );

  try {
    const mode = await (await fetch("./mode")).text();

    ARCOS_MODE = mode.trim();
  } catch {
    ARCOS_MODE = "release";
  }
}
