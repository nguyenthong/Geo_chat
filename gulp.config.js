module.exports = function() {
  var client = './www/';
  var clientApp = client + 'js/';
  var clientAppjs = 'js/';

  var config = {
    alljs: [
      'js/**/*.js'
    ],
    client: client,
    index: 'index.html',
    js: [
        clientAppjs + '**/*.module.js',
        clientAppjs + '**/*.js',
        '!' + clientAppjs + '**/*.spec.js'
    ],

    /**
     * Bower and NPM locations
     */
    bower: {
        json: require('./bower.json'),
        directory: './www/lib/',
        ignorePath: '../..'
    }

  };

  config.getWiredepDefaultOptions = function() {
    var options = {
      bowerJson: config.bower.json,
      directory: config.bower.directory,
      ignorePath: config.bower.ignorePath
    };
    return options;
  };

  return config;
};
