#!/usr/bin/bash
set -e
set -x

cd utils/testsuite_helper
yarn && yarn build

git clone https://github.com/ashutoshvarma/JSONTestSuite.git testsuite

# replace with newly build wasm
rm testsuite/parsers/test_as_json/index.wasm
cp build/index.wasm testsuite/parsers/test_as_json/index.wasm

# run tests
echo '["Assemblyscript-JSON"]' > filter.json 
python3 testsuite/run_tests.py --filter=filter.json 