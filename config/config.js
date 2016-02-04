var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'mongodb://localhost:27017/qman',
    root: rootPath,
    app: {
      name: 'Vote DEV'
    }
  },
  test: {
    db: 'mongodb://localhost/noobjs_test',
    root: rootPath,
    app: {
      name: 'Vote TEST'
    }
  },
  production: {
    db: 'mongodb://test:test@widmore.mongohq.com:10000/vote-express',
    root: rootPath,
    app: {
      name: 'Vote PROD'
    }
  }
}