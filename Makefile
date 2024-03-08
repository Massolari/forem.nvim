TESTS_INIT=tests/minimal_init.lua
TESTS_DIR=tests/

plugin_files = $(wildcard plugin/*.ts)
plugin_out_files = $(plugin_files:plugin/%.ts=plugin/%.lua)
test_init= $(wildcard tests/*.ts)
test_files =$(wildcard tests/**/*.ts)
test_out_files = $(test_files:tests/%.ts=tests/%.lua)
test_out_init = $(test_init:tests/%.ts=tests/%.lua)


compile: node_modules
	mkdir -p lua/forem-nvim
	npx tstl
	npx tstl -p plugin/tsconfig.json
	npx tstl -p tests/tsconfig.json

node_modules: package.json
	@test -d node_modules || npm clean-install

test: compile
	@nvim \
		--headless \
		--noplugin \
		-u ${TESTS_INIT} \
		-c "PlenaryBustedDirectory ${TESTS_DIR} { minimal_init = '${TESTS_INIT}' }"

.PHONY: test compile
