import { api } from '../lib/api';

export async function getCharacter(token: string) {
  return api('/character/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getUserProfile(token: string) {
  // This is a placeholder. If you want to expose more user info, add a backend endpoint.
  // For now, we assume all info is in character/me.
  return getCharacter(token);
}
