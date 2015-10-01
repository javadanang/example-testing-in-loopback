# Example-testing-in-LoopBack

Clone source code from repository:

```
$ git clone https://github.com/pnhung177/example-testing-in-loopback.git
```

Change to source code folder:

```
$ cd example-testing-in-loopback
```

## Run unit test

Checkout the branch of unit test

```
$ git fetch --tags
$ git checkout tags/v0.1.0-ut 
```

Install libraries using npm:

```
$ npm install
```

Run the test:

```
$ npm test
```

## Run functional test

Checkout the branch of functional test

```
$ git checkout tags/v0.1.0-at 
```

Install libraries (cucumberjs) using npm:

```
$ npm install
```

Run the test (both unit test and functional test):

```
$ npm test
```
