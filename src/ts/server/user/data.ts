import { Log } from "$ts/console";
import { Endpoints } from "$ts/stores/endpoint";
import { UserToken } from "$ts/stores/user";
import type { UserDataResponse } from "$types/response";
import type { UserData } from "$types/user";
import axios from "axios";
import { getServerUrl, makeTokenOptions } from "../util";

export async function getUserData(token?: string): Promise<UserData> {
  Log("server/user/data", "Getting UserData using <token>");

  const bearer = token || UserToken.get();
  const url = getServerUrl(Endpoints.UserData);

  if (!bearer || !url) return;

  try {
    const response = await axios.get<UserDataResponse>(
      url,
      makeTokenOptions(bearer)
    );

    if (response.status !== 200) return null;

    return response.data.properties;
  } catch {
    return null;
  }
}

export async function setUserData(data: UserData): Promise<boolean> {
  Log("server/user/data", "Committing UserData using <token>");

  const token = UserToken.get();
  const url = getServerUrl(Endpoints.UserData);

  if (!token || !url) return;

  try {
    const response = await axios.put(url, data, makeTokenOptions(token));

    return response.status === 200;
  } catch {
    return null;
  }
}
