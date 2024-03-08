const loadModule = (module: string, source: string, directory?: string) => {
  const moduleDir = directory || `/tmp/${module}`;
  const directoryExists = vim.fn.isdirectory(moduleDir);

  if (directoryExists === 0) {
    vim.fn.system(["git", "clone", source, moduleDir]);
  }

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

const append = (option: any, value: any) => {
  option.append(option, value);
};

append(vim.opt.rtp, ".");
append(vim.opt.rtp, plenaryDir);
append(vim.opt.rtp, telescopeDir);
vim.cmd("runtime plugin/plenary.vim");
require("plenary.busted");
