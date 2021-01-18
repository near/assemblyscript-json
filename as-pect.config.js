module.exports = {
  /**
   * A set of globs passed to the glob package that qualify typescript files for testing.
   */
  include: ["assembly/__tests__/**/*.spec.ts"],
  /**
   * A set of globs passed to the glob package that quality files to be added to each test.
   */
  add: ["assembly/__tests__/**/*.include.ts"],
  /**
   * All the compiler flags needed for this test suite. Make sure that a binary file is output.
   */
  flags: {
    // "--debug": [],
    /** This is required. Do not change this. The filename is ignored, but required by the compiler. */
    "--binaryFile": ["output.wasm"],
    /** To enable wat file output, use the following flag. The filename is ignored, but required by the compiler. */
    "--textFile": ["output.wat"],
    "--runtime": ["stub"], // Acceptable values are: full, half, stub (arena), and none,
    "--baseDir": process.cwd(),
    // "--runPasses": ["dce"]
  },
  /**
   * A set of regexp that will disclude source files from testing.
   */
  disclude: [/node_modules/],
  /**
   * Add your required AssemblyScript imports here.
   */
  imports: {},
  /**
   * All performance statistics reporting can be configured here.
   */
  performance: {
    /** Enable performance statistics gathering. */
    enabled: false,
    /** Set the maximum number of samples to run for each test. */
    maxSamples: 10000,
    /** Set the maximum test run time in milliseconds. */
    maxTestRunTime: 2000,
    /** Set the number of decimal places to round to. */
    roundDecimalPlaces: 3,
    /** Report the median time in the default reporter. */
    reportMedian: true,
    /** Report the average time in milliseconds. */
    reportAverage: true,
    /** Report the standard deviation. */
    reportStandardDeviation: false,
    /** Report the maximum run time in milliseconds. */
    reportMax: false,
    /** Report the minimum run time in milliseconds. */
    reportMin: false,
    /** Report the variance. */
    reportVariance: false,
  },
  /**
   * Add a custom reporter here if you want one. The following example is in typescript.
   *
   * @example
   * import { TestReporter, TestGroup, TestResult, TestContext } from "as-pect";
   *
   * export class CustomReporter extends TestReporter {
   *   // implement each abstract method here
   *   public abstract onStart(suite: TestContext): void;
   *   public abstract onGroupStart(group: TestGroup): void;
   *   public abstract onGroupFinish(group: TestGroup): void;
   *   public abstract onTestStart(group: TestGroup, result: TestResult): void;
   *   public abstract onTestFinish(group: TestGroup, result: TestResult): void;
   *   public abstract onFinish(suite: TestContext): void;
   * }
   */
  // reporter: new CustomReporter(),
};
