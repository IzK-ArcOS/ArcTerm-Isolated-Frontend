import type { Command } from "../interface";

export const Desktop: Command = {
  keyword: "desktop",
  exec(cmd, argv, term) {
    return term.std.Error(
      "This command requires ArcOS. Please download it at [izk-arcos.nl]."
    );
  },
  description: "Switch to Desktop",
};
