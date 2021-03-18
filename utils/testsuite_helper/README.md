# testsuite_helper

This module is primarily used to expose `JSON.parse` through a CLI environment for testing purpose.

### Return codes :-
- 0 - If successfully parsed the input
- 2 - Can't read the file properly

(It needs `wasmtime` to execute) 

## Build
```
yarn
yarn build
```

## Run
```
yarn start --dir FOLDER JSON_FILE_NAME
```
or
```
wasmtime build/index.wasm --dir FOLDER JSON_FILE_NAME
```

