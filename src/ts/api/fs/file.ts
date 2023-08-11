import axios from "axios";
import { get, writable } from "svelte/store";
import { Log } from "../../console";
import { LogLevel } from "../../console/interface";
import { UserToken } from "../../userlogic/interfaces";
import { ConnectedServer } from "../main";
import { generateParamStr } from "../params";
import { getAuthcode } from "../authcode";
import { getServer } from "../server";

export const abortFileReader = writable<boolean>(false);

export async function readFile(path: string): Promise<ArrayBuffer | false> {
  Log(
    "fs/file.ts: readFile",
    `Requesting file contents of "${path}" from ArcAPI`,
    LogLevel.info
  );

  const server = get(ConnectedServer);
  const authCode = getAuthcode(getServer());

  if (!server) return false;

  const init: RequestInit = {
    headers: {
      Authorization: `Bearer ${get(UserToken)}`,
    },
  };

  const controller = new AbortController();
  const params = generateParamStr({ ac: authCode, path: btoa(path) });

  try {
    let req = await fetch(`${server}/fs/file/get${params}`, {
      ...init,
      signal: controller.signal,
    });

    abortFileReader.set(false);

    abortFileReader.subscribe((v) => {
      if (!v) return;

      Log(
        "fs/file.ts: readFile",
        `Aborting readFile for "${path}" as requested by the user...`,
        LogLevel.error
      );

      controller.abort();

      abortFileReader.set(false);
    });

    if (req.status != 200) return false;

    const x = await req.blob();

    // Free up used memory
    req = null;

    return await x.arrayBuffer();
  } catch {
    return false;
  }
}

export async function writeFile(path: string, data: Blob): Promise<boolean> {
  Log("fs/directory.ts: writeFile", `Creating ${path}`);

  const server = get(ConnectedServer);
  const authCode = getAuthcode(getServer());

  if (!server) return false;

  const params = generateParamStr({ path: btoa(path), ac: authCode });

  const req = await axios.post(`${server}/fs/file/write${params}`, data, {
    headers: {
      Authorization: `Bearer ${get(UserToken)}`,
    },
  });

  return req.status == 200;
}
