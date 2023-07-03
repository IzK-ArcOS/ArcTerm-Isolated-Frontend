import { get } from "svelte/store";
import { Log, LogLevel } from "../console";
import { UserData, UserName } from "./interfaces";
import { committingUserData, setUserdata } from "./main";

const source = "UserLogic: UserData watch";

let commitTimeout;

export function commitUserdata(v: UserData) {
  if (!v) return;

  clearTimeout(commitTimeout);

  committingUserData.set(true);

  if (get(UserName)) {
    Log({
      level: LogLevel.info,
      msg: "Change Detected, committing",
      source,
    });

    const changed = setUserdata(v);

    unsetStatus();

    if (!changed) {
      Log({
        level: LogLevel.error,
        msg: "Commit failed, setter returned false",
        source,
      });
    }

    return;
  }

  unsetStatus();

  Log({
    level: LogLevel.warn,
    msg: "Not committing, no username",
    source,
  });
}

function unsetStatus() {
  commitTimeout = setTimeout(() => {
    committingUserData.set(false);
  }, 1500);
}
