export type Artist = {
  id: string;
  images: { url: string }[];
  name: string;
};

export type HomeType = {
  authEndpoint: string;
  clientId: string;
  redirectUri : string;
  responseType: string
}

export type HomeProps = {
  token: string | null;
  setToken: (token: string) => void;
}

export interface LoginProps {
  authEndpoint: string;
  clientId: string;
  redirectUri: string;
  responseType: string | null;
}