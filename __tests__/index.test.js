import nock from 'nock';
import os from 'os';
import { mkdtemp, readFile, rmdir } from 'fs/promises';
import { join } from 'path';
import pageLoader, { buildName } from '../src';

let tmpDir = '';

beforeAll(() => {
  nock.disableNetConnect();
  const prefix = join(os.tmpdir(), 'page-loader-');
  return mkdtemp(prefix).then((directory) => {
    tmpDir = directory;
  });
});

afterAll(() => rmdir(tmpDir, { recursive: true })
  .then(() => { tmpDir = ''; }));

test('build file name', () => {
  const url = 'https://ru.hexlet.io/courses';
  const expectedName = 'ru-hexlet-io-courses.html';
  expect(buildName(url)).toBe(expectedName);
})

test('fail without arg', async () => {
  await expect(pageLoader()).rejects.toThrow();
});

test('correct store content', async () => {
  const url = 'https://ru.hexlet.io/courses';
  const expectedName = 'ru-hexlet-io-courses.html';
  const expectedContent = await readFile(join(__dirname, '__fixtures__/list.html'), 'utf-8');
  nock(/ru\.hexlet\.io/)
    .get(/\/courses/)
    .reply(200, expectedContent);

  const pathToResult = await pageLoader(url, tmpDir);
  const destPath = join(tmpDir, expectedName);
  expect(pathToResult).toBe(destPath);

  const result = await readFile(destPath, 'utf-8');
  expect(result).toBe(expectedContent);
});
