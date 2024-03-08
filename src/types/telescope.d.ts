/** @noResolution */
declare module "telescope" {}
declare interface Picker {
  find: () => void;
}
/** @noResolution */
declare module "telescope.pickers" {
  const exports: Pickers;
  export = exports;
}
/** @noSelf **/
declare interface Pickers {
  new: (a: any, b: any) => Picker;
}
/** @noResolution */
declare module "telescope.finders" {
  const new_table: (a: any) => any;
}
/** @noResolution */
declare module "telescope.previewers" {
  const new_buffer_previewer: (a: any) => any;
}

declare interface SelectionAction {
  replace: (a: any) => any;
}
/** @noResolution */
declare module "telescope.actions" {
  const select_default: SelectionAction;
  const close: (a: number) => void;
}
/** @noResolution */
declare module "telescope.actions.state" {
  const get_selected_entry: (a: number) => any;
}
/** @noResolution */
declare module "telescope.config" {
  const values: any;
}
