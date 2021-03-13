import axios from 'axios';
import { join } from 'path';
import { writeFile } from 'fs/promises';

export const buildName = (link) => {
  const { hostname } = new URL(link);
  const idx = link.indexOf(hostname);
  const path = link.substr(idx);
  const baseName = path.replace(/[^\d\w]/g, '-');
  return `${baseName}.html`;
};

export default async (url, dest = __dirname) => {
  if (!url) throw new Error('require arg url');
  const { data } = await axios.get(url);
  const fileName = buildName(url);
  const path = join(dest, fileName);
  await writeFile(path, data);
  return path;
};
