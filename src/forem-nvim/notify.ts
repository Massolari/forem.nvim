type LogLevel = "DEBUG" | "ERROR" | "INFO" | "TRACE" | "WARN" | "OFF";

const notify = (message: string, level: LogLevel): void => {
  vim.notify(message, vim.log.levels[level], { title: "Forem.nvim" });
};

export const error = (message: string): void => notify(message, "ERROR");

export const info = (message: string): void => notify(message, "INFO");
