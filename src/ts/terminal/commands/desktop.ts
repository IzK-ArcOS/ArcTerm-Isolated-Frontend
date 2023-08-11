import type { Command } from "../interface";

export const Desktop: Command = {
  keyword: "desktop",
  exec(cmd, argv, term) {
    return term.std.Error(
      "This command requires ArcOS. You can download it at [izk-arcos.nl] or visit it at [web.izk-arcos.nl]."
    );
  },
  description: "Switch to Desktop",
};
