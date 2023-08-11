import { get } from "svelte/store";
import { Log } from "../console";
import { UserData, UserName } from "./interfaces";
import { committingUserData, setUserdata } from "./main";
import { LogLevel } from "../console/interface";

const source = "UserLogic: UserData watch";

let commitTimeout;

export function commitUserdata(v: UserData) {
  if (!v) return;

  clearTimeout(commitTimeout);

  committingUserData.set(true);

  if (get(UserName)) {
    const changed = setUserdata(v);

    unsetStatus();

    if (!changed) {
      Log(source, "Commit failed, setter returned false", LogLevel.error);
    }

    return;
  }

  unsetStatus();

  Log(source, "Not committing, no username", LogLevel.warn);
}

function unsetStatus() {
  commitTimeout = setTimeout(() => {
    committingUserData.set(false);
  }, 1500);
}
