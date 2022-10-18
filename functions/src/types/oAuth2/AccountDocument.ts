import { TwitchToken } from "./TwitchToken";

export type AccountDocument = {
  uid: string;
  username: string;
  displayName: string;
  email: string;
  avatar: string;
  token: TwitchToken;
};

