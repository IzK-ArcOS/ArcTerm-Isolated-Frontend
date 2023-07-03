import { get, writable } from "svelte/store";
import { loginUsingCreds } from "../api/getter";
import { ConnectedServer } from "../api/main";
import { UserData, UserName } from "../userlogic/interfaces";
import { getUsers } from "../userlogic/main";

export const loginUsername = writable<string>();

export async function loginOnMount() {
  const users = await getUsers();
  const remembered = localStorage.getItem("arcos-remembered-token");
  const server = get(ConnectedServer);

  if (remembered) {
    const userdata = await loginUsingCreds(remembered);
    const username = atob(remembered).split(":")[0];

    if (!userdata) {
      localStorage.removeItem("arcos-remembered-token");

      return;
    }

    loginUsername.set(username);

    UserData.set(userdata);
    UserName.set(username);
  }
}
