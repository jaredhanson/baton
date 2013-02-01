var path = require('path')
  , fs = require('fs')
  , utils = require('./utils')
  , dirname = path.dirname
  , basename = path.basename
  , extname = path.extname
  , join = path.join
  , exists = fs.existsSync || path.existsSync;

function Template(name, options) {
  var engines = options.engines
    , defaultEngine = options.defaultEngine;
  
  this.name = name;
  this.root = options.root;
  var ext = this.ext = extname(name);
  if (!ext) name += (ext = this.ext = '.' + defaultEngine);
  this.engine = engines[ext] || (engines[ext] = require(ext.slice(1)));
  this.path = this.lookup(name);
}

Template.prototype.lookup = function(path) {
  var ext = this.ext;

  if (!utils.isAbsolute(path)) path = join(this.root, path);
  if (exists(path)) return path;
};

Template.prototype.render = function(options, fn) {
  var engine = this.engine;
  
  if ('function' != typeof engine.renderFile) throw new Error('file rendering not supported by "' + this.ext + '" engine');
  engine.renderFile(this.path, options, fn);
};


module.exports = Template;
