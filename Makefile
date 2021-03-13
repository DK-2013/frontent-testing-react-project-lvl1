install:
	yarn

build:
	rm -rf dist
	yarn build

test:
	yarn test

publish:
	npm publish --dry-run

republish:
	npm publish --dry-run
	yarn link

lint:
	npx eslint .
