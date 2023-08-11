import { get } from "svelte/store";
import { getDirectory } from "../../api/fs/directory";
import { Log } from "../../console";
import { ArcOSVersion } from "../../env/main";
import { UserName } from "../../userlogic/interfaces";
import { type Color, colors, type VariableStore } from "../interface";
import type { ArcTerm } from "../main";
import { getServer } from "../../api/server";
import { LogLevel } from "../../console/interface";

export function getArcTermStore(term: ArcTerm): VariableStore {
  Log(
    `ArcTerm ${term.referenceId}`,
    "Creating new ArcTermVariableStore",
    LogLevel.info
  );
  return {
    prompt: {
      get: () => term.env.prompt,
      set: async (v) => {
        term.env.prompt = v;

        await term.env.config.writeConfig();
      },
      canDelete: false,
      readOnly: false,
    },
    server: {
      get: () => getServer(),
      readOnly: true,
      canDelete: false,
    },
    username: {
      get: () => get(UserName),
      readOnly: true,
      canDelete: false,
    },
    version: {
      get: () => ArcOSVersion,
      readOnly: true,
      canDelete: false,
    },
    pwd: {
      get: () => (term.path || "./").replace("./", ""),
      set: async (v) => {
        const dir = await getDirectory(v);

        if (!dir)
          return term.std.Error(`pwd: Directory doesn't exist, falling back.`);

        term.path = v;
      },
      canDelete: false,
      readOnly: false,
    },
    color: {
      get: () => term.env.promptColor,
      set: async (v) => {
        if (!colors.includes(v))
          return term.std.Error("color is invalid, falling back.");

        term.env.promptColor = v as Color;

        await term.env.config.writeConfig();

        term.util.flushAccent();
      },
      canDelete: false,
      readOnly: false,
    },
    ref: {
      get: () => term.referenceId,

      readOnly: true,
      canDelete: false,
    },
  };
}
