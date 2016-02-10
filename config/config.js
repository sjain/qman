var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
  development: {
    db: 'mongodb://localhost:27017/qman_development',
    root: rootPath,
    app: {
      name: 'Q-man DEV'
    }
  },
  test: {
    db: 'mongodb://localhost/qman_test',
    root: rootPath,
    app: {
      name: 'Q-man TEST'
    }
  },
  production: {
    db: 'mongodb://test:test@widmore.mongohq.com:10000/vote-express',
    root: rootPath,
    app: {
      name: 'Q-man PROD'
    }
  }
}