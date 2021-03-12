install:
	npm install

build:
	rm -rf dist
	npm run build

test:
	npm test

publish:
	npm publish --dry-run

republish:
	npm publish --dry-run
	npm link

lint:
	npx eslint .
