import { UserName } from "$ts/stores/user";
import type { Command } from "../interface";

export const Logout: Command = {
  keyword: "logout",
  exec(cmd, argv, term) {
    localStorage.removeItem("arcos-remembered-token");
    UserName.set(undefined);

    term.dispose();
    setTimeout(() => {
      term.initialize();
    });
  },
  description: "Logout ArcTerm Mode",
};
