import { ArcFetch } from "./commands/arcfetch";
import { Cd } from "./commands/cd";
import { Clear } from "./commands/clear";
import { Colors } from "./commands/colors";
import { Config } from "./commands/config";
import { Desktop } from "./commands/desktop";
import { Dir } from "./commands/dir";
import { Echo } from "./commands/echo";
import { Exec } from "./commands/exec";
import { Help } from "./commands/help";
import { History } from "./commands/history";
import { LogDump } from "./commands/logdump";
import { Logout } from "./commands/logout";
import { Mkdir } from "./commands/mkdir";
import { Read } from "./commands/read";
import { Reload } from "./commands/reload";
import { Reset } from "./commands/reset";
import { Rf } from "./commands/rf";
import { Ri } from "./commands/ri";
import { Rm } from "./commands/rm";
import { Set } from "./commands/set";
import { UDD } from "./commands/udd";
import { Users } from "./commands/users";
import { Vars } from "./commands/vars";
import { Ver } from "./commands/ver";
import { Verbose } from "./commands/verbose";
import type { Command, CommandStore } from "./interface";

export const defaultCommand: Command = {
  keyword: "default",
  exec: (cmd, _, term) => {
    if (cmd) term.std.Error(`${cmd}: command not found.`);
  },
  description: "Default command",
};

export const arcCommands: CommandStore = [
  ArcFetch,
  Cd,
  Clear,
  Desktop,
  Dir,
  Echo,
  Vars /* 
  Exit, */,
  Help,
  History,
  Logout,
  Mkdir,
  Rm,
  Reload,
  Ver,
  Reset,
  Rf,
  Ri,
  Users,
  Read,
  Set,
  Config,
  Exec,
  Verbose /* 
  Desktop, */,
];

export const gooseBumpsCommands: CommandStore = [Colors, UDD, LogDump];
