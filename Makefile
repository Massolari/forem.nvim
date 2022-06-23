TESTS_INIT=tests/minimal_init.lua
TESTS_DIR=tests/

src_files = $(wildcard fnl/**/*.fnl)
out_files = $(src_files:fnl/%.fnl=lua/%.lua)

compile: $(out_files)

lua/%.lua: fnl/%.fnl lua/
	./fennel --compile $< > $@

lua/:
	mkdir -p lua/forem-nvim

test:
	@nvim \
		--headless \
		--noplugin \
		-u ${TESTS_INIT} \
		-c "PlenaryBustedDirectory ${TESTS_DIR} { minimal_init = '${TESTS_INIT}' }"

.PHONY: test compile
