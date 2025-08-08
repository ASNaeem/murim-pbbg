import { api } from '../lib/api';

export async function trainStat(token: string, stat: string) {
  return api('/character/train', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ stat }),
  });
}
