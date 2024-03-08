/**@noResolution*/
declare module "luassert.stub" {
  function stub(module: any): any;
}

declare type Stub = (module: any, functionName: string) => any;

/**@noResolution*/
declare module "luassert.mock" {
  function mock(module: any): any;
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
  const are: any;
}

declare function describe(description: string, suite: () => void): void;
declare function before_each(fn: () => void): void;
declare function it(description: string, test: () => void): void;
