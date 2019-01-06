import test from 'ava';
import { setup, decamelize } from './helpers';

export async function defineTestsFromModule(moduleName: string) {
  try {
    const instance = await setup(moduleName);

    // TODO: Refactor into proper testing framework for AssemblyScript
    for (const tests in instance) {
        const testsInstance = instance[tests];

        if (testsInstance.setUp) {
            test.beforeEach(() => {
                testsInstance.setUp();
            });
        }
        if (testsInstance.tearDown) {
            test.afterEach(() => {
                testsInstance.tearDown();
            });
        }
        for (const testName of Object.keys(testsInstance).filter(it => !(["setUp", "tearDown"].indexOf(it) != -1))) {
            if (testName.startsWith("shouldAbort")) {  
                test(decamelize(testName), t => { t.throws(() => testsInstance[testName]()) });
            } else {
                test(decamelize(testName), t => t.truthy(testsInstance[testName]()));
            }
        }
    }
  } catch (e) {
    console.log("Error loading WebAssembly module:", e);
    throw e;
  }
};