import nock from 'nock';
import os from 'os';
import { mkdtemp, readFile, rmdir } from 'fs/promises';
import { join } from 'path';
import pageLoader from '../src';

let tmpDir;

beforeAll(() => {
  const prefix = join(os.tmpdir(), 'page-loader-');
  return mkdtemp(
    prefix,
    (err, directory) => {
      if (err) throw err;
      tmpDir = directory;
    });
});

afterAll(async () => {
  return rmdir(tmpDir, { recursive: true }, () => {
    tmpDir = undefined;
  });
});

test('correct store content', async () => {
  const url = 'https://ru.hexlet.io/courses';
  const expectedName = 'ru-hexlet-io-courses.html';
  const expectedContent = await readFile(join(__dirname, '__fixtures__/list.html'), 'utf-8');
  nock('https://ru.hexlet.io')
    .get('/courses')
    .reply(200, expectedContent);

  await pageLoader(url);
  const result = await readFile(join(tmpDir, expectedName), 'utf-8');
  expect(result).toBe(expectedContent);
});

test('fail without arg', () => {
  expect(pageLoader()).toThrow();
});
