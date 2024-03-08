/**@noResolution*/
declare module "luassert.stub" {
  /**@noSelf*/
  interface Stub {
    new: (module: any, functionName: string) => any;
  }
  let exports: Stub
  export = exports
}

/**@noResolution*/
declare module "luassert.mock" {
  /**@noSelf*/
  interface Mock {
    new: (module: any, useStubs?: boolean) => any
  }
  let exports: Mock
  export = exports
}

declare type Mock = (module: any, useStubs?: boolean) => any;

/**@noResolution*/
declare module "luassert.match" {
  /**@noSelf*/
  interface Match {
    is_same: (value: any) => any;
  }
  const exports: Match;
  export = exports;
}

/**@noResolution*/
declare module "luassert.spy" {
  /**@noSelf*/
  interface Spy {
    new: (fn: () => any) => SpyValue;
    on: (table: any, method: string) => any;
  }
  const exports: Spy;
  export = exports;
}

declare type SpyValue = Record<string, never>;

declare namespace assert {
  export function stub(module: any): any;
  export function spy(spy: SpyValue): any;
  export function snapshot(this: any): Snapshot;
  export function is_true(value: boolean): void;
  const are: any;
}

declare type Snapshot = {
  revert: (this: Snapshot) => void;
};

declare function describe(description: string, suite: () => void): void;
declare function before_each(fn: () => void): void;
declare function after_each(fn: () => void): void;
declare function it(description: string, test: () => void): void;
