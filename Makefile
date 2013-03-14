
test:
	@./node_modules/.bin/mocha \
		--require should \
		--reporter spec \
		--timeout 10s \
		--bail

.PHONY: test
