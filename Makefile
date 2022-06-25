FENNEL_SCRIPT=scripts/fennel
TESTS_INIT=tests/minimal_init.lua
TESTS_DIR=tests/

src_files = $(wildcard fnl/**/*.fnl)
out_files = $(src_files:fnl/%.fnl=lua/%.lua)
plugin_files = $(wildcard plugin/*.fnl)
plugin_out_files = $(plugin_files:plugin/%.fnl=plugin/%.lua)
test_init= $(wildcard tests/*.fnl)
test_files =$(wildcard tests/**/*.fnl)
test_out_files = $(test_files:tests/%.fnl=tests/%.lua)
test_out_init = $(test_init:tests/%.fnl=tests/%.lua)

compile: $(out_files) $(plugin_out_files)

lua/%.lua: fnl/%.fnl lua/
	$(FENNEL_SCRIPT) --compile $< > $@

plugin/%.lua: plugin/%.fnl plugin/
	$(FENNEL_SCRIPT) --compile $< > $@

lua/:
	mkdir -p lua/forem-nvim

tests/%.lua: tests/%.fnl tests/
	$(FENNEL_SCRIPT) --compile $< > $@

test: $(test_out_files) $(test_out_init)
	@nvim \
		--headless \
		--noplugin \
		-u ${TESTS_INIT} \
		-c "PlenaryBustedDirectory ${TESTS_DIR} { minimal_init = '${TESTS_INIT}' }"

.PHONY: test compile
