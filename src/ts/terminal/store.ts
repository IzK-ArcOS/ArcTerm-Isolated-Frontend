import { ArcFetch } from "./commands/arcfetch";
import { Cd } from "./commands/cd";
import { Clear } from "./commands/clear";
import { Colors } from "./commands/colors";
import { Config } from "./commands/config";
import { Desktop } from "./commands/desktop";
import { Dir } from "./commands/dir";
import { Echo } from "./commands/echo";
import { End } from "./commands/end";
import { Exec } from "./commands/exec";
import { Goose } from "./commands/goose";
import { Goto } from "./commands/goto";
import { Help } from "./commands/help";
import { History } from "./commands/history";
import { If } from "./commands/if";
import { LogDump } from "./commands/logdump";
import { Logout } from "./commands/logout";
import { Ls } from "./commands/ls";
import { Mkdir } from "./commands/mkdir";
import { Read } from "./commands/read";
import { Reload } from "./commands/reload";
import { Reset } from "./commands/reset";
import { Rf } from "./commands/rf";
import { Ri } from "./commands/ri";
import { Rm } from "./commands/rm";
import { Set } from "./commands/set";
import { UDD } from "./commands/udd";
import { UserAdd } from "./commands/useradd";
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
  Goose,
  If,
  Goto,
  End,
  UserAdd,
  Ls,
];

export const gooseBumpsCommands: CommandStore = [Colors, UDD, LogDump];
