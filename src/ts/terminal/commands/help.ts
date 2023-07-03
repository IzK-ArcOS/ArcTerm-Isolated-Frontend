import { switchExists } from "../argv";
import type { Command } from "../interface";
import type { ArcTerm } from "../main";
import { defaultCommand } from "../store";

export const Help: Command = {
  keyword: "help",
  exec(cmd, argv, term) {
    if (switchExists(argv, "count"))
      return term.std.writeColor(
        `ArcTerm has [${term.commands.length}] commands.`,
        "aqua"
      );

    if (argv[0]) return specific(argv[0], term);

    all(term);
  },
  description: "Display a list of built-in commands",
  syntax: "([command?])",
};

function all(term: ArcTerm) {
  const cmd = term.commands.sort((a, b) => {
    return b.keyword < a.keyword ? 1 : -1;
  });

  for (let i = 0; i < cmd.length; i++) {
    if (!cmd[i]) continue;

    const a = cmd[i].keyword.toUpperCase().padEnd(15, " ");
    const b = cmd[i].description;

    term.std.writeColor(`[${a}]${b}`, "orange");
  }
}

function specific(command: string, term: ArcTerm) {
  const c = term.commandHandler.getCommand(command);

  if (!c || c.keyword == defaultCommand.keyword)
    return term.std.Error(`${command}: command not found.`);

  term.std.writeColor(`[${c.keyword.toUpperCase()}]: ${c.description}`, "blue");

  term.std.writeLine("\n");

  term.std.writeColor(`Usage: [${c.keyword}] ${c.syntax || ""}`, "blue");
}
