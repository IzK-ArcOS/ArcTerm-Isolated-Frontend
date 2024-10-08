import { getJsonHierarchy, setJsonHierarchy } from "$ts/hierarchy";
import { UserDataStore } from "$ts/stores/user";
import type { Command } from "../interface";

const BANNED = ["acc.enabled", "acc.admin", "devmode", "valid", "statusCode"];

export const SUD: Command = {
  keyword: "sud",
  async exec(cmd, argv, term) {
    if (!argv.length || argv.length < 2)
      return term.std.Error("Missing arguments");

    const hierarchy = argv[0];

    if (!hierarchy) return term.std.Error("Missing hierarchy");

    // Make it a little more safe
    if (BANNED.join("|").includes(hierarchy))
      return term.std.Error(`Not permitted to change data of [${hierarchy}]`);

    const udata = UserDataStore.get();
    const currentValue = getJsonHierarchy(udata, hierarchy);

    if (!currentValue && typeof currentValue === "undefined")
      return term.std.Error(`Can't find [UserData.${hierarchy}]!`);

    argv.shift(); // Remove the hierarchy from the arguments

    let newValue = argv.join(" ").trim();

    try {
      newValue = JSON.parse(newValue);
    } catch {
      // silently error
    }

    setJsonHierarchy(udata, hierarchy, newValue);

    UserDataStore.set(udata);

    if (term.std.verbose)
      term.std.writeColor(
        `Wrote [${
          newValue.toString().length
        } bytes] to [UserData.${hierarchy}]`,
        "blue"
      );
  },
  description: "Set UserData parameters",
};
