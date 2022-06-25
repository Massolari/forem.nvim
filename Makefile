FENNEL_SCRIPT=scripts/fennel
TESTS_INIT=tests/minimal_init.lua
TESTS_DIR=tests/

src_files = $(wildcard fnl/**/*.fnl)
out_files = $(src_files:fnl/%.fnl=lua/%.lua)
test_files =$(wildcard tests/*.fnl)
test_out_files = $(test_files:tests/%.fnl=tests/%.lua)

compile: $(out_files)

lua/%.lua: fnl/%.fnl lua/
	$(FENNEL_SCRIPT) --compile $< > $@

lua/:
	mkdir -p lua/forem-nvim

tests/%.lua: tests/%.fnl tests/
	$(FENNEL_SCRIPT) --compile $< > $@

test: $(test_out_files)
	@nvim \
		--headless \
		--noplugin \
		-u ${TESTS_INIT} \
		-c "PlenaryBustedDirectory ${TESTS_DIR} { minimal_init = '${TESTS_INIT}' }"

.PHONY: test compile
