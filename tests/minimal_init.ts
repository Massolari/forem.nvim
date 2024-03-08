const append = (option: any, value: any) => {
  option.append(option, value);
};

const loadModule = (module: string, source: string, directory?: string) => {
  const moduleDir = directory || `/tmp/${module}`;
  const directoryExists = vim.fn.isdirectory(moduleDir);

  if (directoryExists === 0) {
    vim.fn.system(["git", "clone", source, moduleDir]);
  }

  append(vim.opt.rtp, moduleDir);

  return moduleDir;
};

const plenaryDir = os.getenv("PLENARY_DIR") || "/tmp/plenary.nvim";
loadModule(
  "plenary.nvim",
  "https://github.com/nvim-lua/plenary.nvim",
  plenaryDir,
);

const telescopeDir = loadModule(
  "telescope.nvim",
  "https://github.com/nvim-telescope/telescope.nvim",
);

append(vim.opt.rtp, ".");
vim.cmd("runtime plugin/plenary.vim");
vim.cmd("runtime plugin/telescope.lua");
require("plenary.busted");
