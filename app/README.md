# Veranda Technical Documentation

## Development Environment

To install:
```
$ npm install
```

### Build

To build _only_ css:
```
$ npm run build-css
```

To build _only_ js:
```
$ npm run build-js
```

To build all:
```
$ npm run build
```

### Test

To validate code before committing:
```
$ npm test
```

#### Testing a Specific View
If a route has not been created for a view which you would like to test, you can use the wildcard debug endpoint:
```
http://server:PORT/debug/PATH_TO_VIEW_EJS
```

### Start

To start nodemon:
```
$ npm start
```

## File System

JavaScript, SASS, and EJS files are located in the src directory. These files are processed and bundled before being sent to the client. _Nearly_ all of development will occur in this directory.
