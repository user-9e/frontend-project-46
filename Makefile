install: install-deps
		npx simple-git-hooks

install-deps:
		npm ci

gendiff:
		node bin/gendiff.js

publish:
		npm publish --dry-run

lint:
		npx eslint .

test:
		npm test

test-coverage:
		npm test -- --coverage --watchAll --coverageProvider=v8

.PHONY: test