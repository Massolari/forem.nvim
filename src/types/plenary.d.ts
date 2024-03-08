/** @noResolution */
declare module "plenary.curl" {
  const put: any;
  const post: any;
}
declare interface Job {
  start: () => void;
  result: () => string[];
}
/** @noResolution */
declare module "plenary.job" {
  let exports: {
    new: (options: any) => Job;
  };
  export = exports;
}

/** @noResolution */
declare module "plenary.busted" {}
