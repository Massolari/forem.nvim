/** @noSelf **/
interface keymap {
  set: (
    this: void,
    mode: MapMode | MapMode[],
    lhs: string,
    rhs: string | (() => any),
    options?: MapOptions,
  ) => void;
}

type MapMode = "n" | "v" | "x" | "s" | "o" | "ic" | "i" | "l" | "c" | "t";

type MapOptions = {
  buffer?: number | boolean;
  remap?: boolean;
  desc?: string;
  callback?: () => any;
  nowait?: boolean;
  silent?: boolean;
  script?: boolean;
  expr?: boolean;
  unique?: boolean;
};
