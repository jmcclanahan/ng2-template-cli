#!/usr/bin/env node
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var template = require('lodash.template');
var program = require('commander');

program.version('1.0.6').description('Generate component templates based off of the Angular 2 style guide').option('-t, --type <type>', 'Define the type of component you want to generate(eg. component,service,etc)').option('-n, --name <name>', 'Give your component a name').option('-p, --parent [parent]', 'Define a new relative path to generate your template at(this path is relative to ./src/app/)').parse(process.argv);

if (typeof program.type === 'undefined' || program.type.length <= 0 || program.name.length <= 0) {
  console.log('You must specify the type and name of the component to generate.');
  program.outputHelp();
  process.exit();
}

var parent = program.parent || '';
var _root = root('src', 'app', parent);

var COMPONENT = 'component';
var DIRECTIVE = 'directive';
var SERVICE = 'service';
var ENUM = 'enum';
var INTERFACE = 'interface';
var PIPE = 'pipe';

// Templates
var COMPONENT_TEMPLATE = path.resolve(__dirname, 'temp.component.tpl');
var COMPONENT_HTML_TEMPLATE = path.resolve(__dirname, 'temp.component.html.tpl');
var COMPONENT_CSS_TEMPLATE = path.resolve(__dirname, 'temp.component.css.tpl');
var COMPONENT_SPEC_TEMPLATE = path.resolve(__dirname, 'temp.component.spec.tpl');
var DIRECTIVE_TEMPLATE = path.resolve(__dirname, 'temp.directive.tpl');
var DIRECTIVE_SPEC_TEMPLATE = path.resolve(__dirname, 'temp.directive.spec.tpl');
var SERVICE_TEMPLATE = path.resolve(__dirname, 'temp.service.tpl');
var SERVICE_SPEC_TEMPLATE = path.resolve(__dirname, 'temp.service.spec.tpl');
var ENUM_TEMPLATE = path.resolve(__dirname, 'temp.enum.tpl');
var INTERFACE_TEMPLATE = path.resolve(__dirname, 'temp.tpl');
var PIPE_TEMPLATE = path.resolve(__dirname, 'temp.pipe.tpl');
var PIPE_SPEC_TEMPLATE = path.resolve(__dirname, 'temp.pipe.spec.tpl');

// Files To Create
var COMPONENT_FILE = path.resolve(_root, program.name, program.name + '.component.ts');
var COMPONENT_HTML_FILE = path.resolve(_root, program.name, program.name + '.component.html');
var COMPONENT_CSS_FILE = path.resolve(_root, program.name, program.name + '.component.css');
var COMPONENT_SPEC_FILE = path.resolve(_root, program.name, program.name + '.component.spec.ts');
var DIRECTIVE_FILE = path.resolve(_root, program.name + '.directive.ts');
var DIRECTIVE_SPEC_FILE = path.resolve(_root, program.name + '.directive.spec.ts');
var SERVICE_FILE = path.resolve(_root, program.name + '.service.ts');
var SERVICE_SPEC_FILE = path.resolve(_root, program.name + '.service.spec.ts');
var ENUM_FILE = path.resolve(_root, program.name + '.enum.ts');
var INTERFACE_FILE = path.resolve(_root, program.name + '.ts');
var PIPE_FILE = path.resolve(_root, program.name + '.pipe.ts');
var PIPE_SPEC_FILE = path.resolve(_root, program.name + '.pipe.spec.ts');

var files = new Map();
var options = {
  'name': program.name,
  'classifiedName': program.name.charAt(0).toUpperCase() + program.name.slice(1),
  'interfacePrefix': 'I'
};

switch (program.type) {
  case COMPONENT:
    files.set(COMPONENT_TEMPLATE, COMPONENT_FILE);
    files.set(COMPONENT_HTML_TEMPLATE, COMPONENT_HTML_FILE);
    files.set(COMPONENT_CSS_TEMPLATE, COMPONENT_CSS_FILE);
    files.set(COMPONENT_SPEC_TEMPLATE, COMPONENT_SPEC_FILE);
    break;
  case DIRECTIVE:
    files.set(DIRECTIVE_TEMPLATE, DIRECTIVE_FILE);
    files.set(DIRECTIVE_SPEC_TEMPLATE, DIRECTIVE_SPEC_FILE);
    break;
  case SERVICE:
    files.set(SERVICE_TEMPLATE, SERVICE_FILE);
    files.set(SERVICE_SPEC_TEMPLATE, SERVICE_SPEC_FILE);
    break;
  case ENUM:
    files.set(ENUM_TEMPLATE, ENUM_FILE);
    break;
  case INTERFACE:
    files.set(INTERFACE_TEMPLATE, INTERFACE_FILE);
    break;
  case PIPE:
    files.set(PIPE_TEMPLATE, PIPE_FILE);
    files.set(PIPE_SPEC_TEMPLATE, PIPE_SPEC_FILE);
    break;
  default:
    break;
}

createFiles();

function createFiles() {
  var dir = program.type === COMPONENT ? path.resolve(_root, program.name) : _root;

  mkdirp(dir, function (err) {
    if (err) {
      throw err;
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      var _loop = function _loop() {
        var _step$value = _slicedToArray(_step.value, 2);

        var key = _step$value[0];
        var value = _step$value[1];

        fs.readFile(key, "utf8", function (err, data) {
          if (err) {
            throw err;
          }
          var compiled = template(data);
          fs.appendFile(value, compiled(options));
        });
      };

      for (var _iterator = files[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        _loop();
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
  console.log('Success!');
}

function root(args) {
  args = [].concat(Array.prototype.slice.call(arguments)) || '';
  return path.join.apply(path, [process.cwd()].concat(_toConsumableArray(args)));
}