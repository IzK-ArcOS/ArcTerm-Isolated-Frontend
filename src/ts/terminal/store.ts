import { ArcFetch } from "./commands/arcfetch";
import { Cd } from "./commands/cd";
import { Clear } from "./commands/clear";
import { Colors } from "./commands/colors";
import { Config } from "./commands/config";
import { Dir } from "./commands/dir";
import { Echo } from "./commands/echo";
import { End } from "./commands/end";
import { Err } from "./commands/err";
import { Exec } from "./commands/exec";
import { Goose } from "./commands/goose";
import { Goto } from "./commands/goto";
import { GUD } from "./commands/gud";
import { Help } from "./commands/help";
import { History } from "./commands/history";
import { If } from "./commands/if";
import { InDesktop } from "./commands/indesktop";
import { LogDump } from "./commands/logdump";
import { Logout } from "./commands/logout";
import { Ls } from "./commands/ls";
import { Mkdir } from "./commands/mkdir";
import { QuotaCommand } from "./commands/quota";
import { Read } from "./commands/read";
import { Reload } from "./commands/reload";
import { Reset } from "./commands/reset";
import { Rf } from "./commands/rf";
import { Ri } from "./commands/ri";
import { Rm } from "./commands/rm";
import { Servers } from "./commands/servers";
import { Set } from "./commands/set";
import { SleepCommand } from "./commands/sleep";
import { SUD } from "./commands/sud";
import { UDD } from "./commands/udd";
import { UserAdd } from "./commands/useradd";
import { Users } from "./commands/users";
import { Vars } from "./commands/vars";
import { Ver } from "./commands/ver";
import { Verbose } from "./commands/verbose";
import type { CommandStore } from "./interface";

export const COLOR_CHAR = "§";

export const arcCommands: CommandStore = [
  ArcFetch,
  Cd,
  Clear,
  Dir,
  Echo,
  Vars,
  Help,
  History,
  Ls,
  Mkdir,
  Logout,
  Rm,
  Reload,
  InDesktop,
  Ver,
  Reset,
  Rf,
  Ri,
  Users,
  Read,
  Set,
  Config,
  Exec,
  Verbose,
  Servers,
  If,
  Goto,
  End,
  Goose,
  UserAdd,
  SUD,
  GUD,
  SleepCommand,
  QuotaCommand,
];

/**
 * For security purposes, this Array will be obscured & undocumented.
 *
 * The ArcOS Team can reference internal Object Documentation UUID #b9a48ed8-5171-4ecb-ba5f-8601fd8b4243 for
 * more information about this chunk of the ArcTerm implementation. Any questions asked by externals cannot and will
 * not be answered.
 *
 * The Team can use Reference f1543394846c when asking the Board about this code.
 */
export const gooseBumpsCommands: CommandStore = [Colors, UDD, LogDump, Err];
