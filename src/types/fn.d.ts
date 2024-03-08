/** @noSelf **/
interface fn {
  executable: (path: string | string[]) => 1 | 0 | -1;
  system: (cmd: string | string[], opts?: any) => any;
  json_decode: (json: string) => string;
  json_encode: (a: any) => string;
  getline: (lnum: string | number, end?: string | number) => string;
  line: (expr: string, winid?: number) => number;
  expand: (keywords: string, nosuf?: boolean, list?: boolean) => string;
  input: (prompt: string, text?: string, completion?: string) => string;
  getpos: (expr: string) => [number, number, number, number];
  setpos: (
    expr: string,
    list:
      | [number, number, number, number]
      | [number, number, number, number, number],
  ) => 0 | -1;
  isdirectory: (directory: string) => 0 | 1;
}
