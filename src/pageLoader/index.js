import axios from 'axios';
import { join } from 'path';
import { writeFile } from 'fs/promises';

export const buildName = (link) => {
  const { hostname, pathname } = new URL(link);
  // todo search params, hash
  const path = `${pathname}.html`;
  return [...hostname.split('.'), ...path.split('/')]
    .filter((el) => el).join('-');
};

export default async (url, dest = __dirname) => {
  if (!url) throw new Error('require arg url');
  const { data } = await axios.get(url);
  const fileName = buildName(url);
  const path = join(dest, fileName);
  await writeFile(path, data);
  return path;
};
