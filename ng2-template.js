#!/usr/bin/env node
const fs       = require('fs')
const path     = require('path')
const mkdirp   = require('mkdirp')
const template = require('lodash.template')
const program  = require('commander')

program
  .version('1.0.10')
  .description('Generate component templates based off of the Angular 2 style guide')
  .option('-t, --type <type>', 'Define the type of component you want to generate(eg. component,service,etc)')
  .option('-n, --name <name>', 'Give your component a name')
  .option('-p, --parent [parent]', 'Define a new relative path to generate your template at(this path is relative to ./src/app/)')
  .parse(process.argv)

if (typeof program.type === 'undefined' || program.type.length <= 0 || program.name.length <= 0) {
  console.log('You must specify the type and name of the component to generate.')
  program.outputHelp()
  process.exit()
}

const parent   = program.parent || ''
const _root    = root()

const COMPONENT = 'component'
const DIRECTIVE = 'directive'
const SERVICE   = 'service'
const ENUM      = 'enum'
const INTERFACE = 'interface'
const PIPE      = 'pipe'
const ROUTE     = 'route'
const MODULE    = 'module'

// Templates
const COMPONENT_TEMPLATE      = path.resolve(__dirname, 'temp.component.tpl')
const COMPONENT_HTML_TEMPLATE = path.resolve(__dirname, 'temp.component.html.tpl')
const COMPONENT_CSS_TEMPLATE  = path.resolve(__dirname, 'temp.component.css.tpl')
const COMPONENT_SPEC_TEMPLATE = path.resolve(__dirname, 'temp.component.spec.tpl')
const DIRECTIVE_TEMPLATE      = path.resolve(__dirname, 'temp.directive.tpl')
const DIRECTIVE_SPEC_TEMPLATE = path.resolve(__dirname, 'temp.directive.spec.tpl')
const SERVICE_TEMPLATE        = path.resolve(__dirname, 'temp.service.tpl')
const SERVICE_SPEC_TEMPLATE   = path.resolve(__dirname, 'temp.service.spec.tpl')
const ENUM_TEMPLATE           = path.resolve(__dirname, 'temp.enum.tpl')
const INTERFACE_TEMPLATE      = path.resolve(__dirname, 'temp.tpl')
const PIPE_TEMPLATE           = path.resolve(__dirname, 'temp.pipe.tpl')
const PIPE_SPEC_TEMPLATE      = path.resolve(__dirname, 'temp.pipe.spec.tpl')
const ROUTE_TEMPLATE          = path.resolve(__dirname, 'temp.routing.tpl')
const MODULE_TEMPLATE         = path.resolve(__dirname, 'temp.module.tpl')

// Files To Create
const COMPONENT_FILE      = path.resolve(_root, program.name, `${program.name}.component.ts`)
const COMPONENT_HTML_FILE = path.resolve(_root, program.name, `${program.name}.component.html`)
const COMPONENT_CSS_FILE  = path.resolve(_root, program.name, `${program.name}.component.css`)
const COMPONENT_SPEC_FILE = path.resolve(_root, program.name, `${program.name}.component.spec.ts`)
const DIRECTIVE_FILE      = path.resolve(_root, `${program.name}.directive.ts`)
const DIRECTIVE_SPEC_FILE = path.resolve(_root, `${program.name}.directive.spec.ts`)
const SERVICE_FILE        = path.resolve(_root, `${program.name}.service.ts`)
const SERVICE_SPEC_FILE   = path.resolve(_root, `${program.name}.service.spec.ts`)
const ENUM_FILE           = path.resolve(_root, `${program.name}.enum.ts`)
const INTERFACE_FILE      = path.resolve(_root, `${program.name}.ts`)
const PIPE_FILE           = path.resolve(_root, `${program.name}.pipe.ts`)
const PIPE_SPEC_FILE      = path.resolve(_root, `${program.name}.pipe.spec.ts`)
const ROUTE_FILE          = path.resolve(_root, `${program.name}.routing.ts`)
const MODULE_FILE         = path.resolve(_root, `${program.name}.module.ts`)

const files = new Map()
const options = {
  'name': program.name,
  'classifiedName': program.name.charAt(0).toUpperCase() + program.name.slice(1),
  'dasherizedName': program.name.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase(),
  'interfacePrefix': 'I'
}

switch(program.type) {
  case COMPONENT:
    files.set(COMPONENT_TEMPLATE, COMPONENT_FILE)
    files.set(COMPONENT_HTML_TEMPLATE, COMPONENT_HTML_FILE)
    files.set(COMPONENT_CSS_TEMPLATE, COMPONENT_CSS_FILE)
    files.set(COMPONENT_SPEC_TEMPLATE, COMPONENT_SPEC_FILE)
    break
  case DIRECTIVE:
    files.set(DIRECTIVE_TEMPLATE, DIRECTIVE_FILE)
    files.set(DIRECTIVE_SPEC_TEMPLATE, DIRECTIVE_SPEC_FILE)
    break
  case SERVICE:
    files.set(SERVICE_TEMPLATE, SERVICE_FILE)
    files.set(SERVICE_SPEC_TEMPLATE, SERVICE_SPEC_FILE)
    break
  case ENUM:
    files.set(ENUM_TEMPLATE, ENUM_FILE)
    break
  case INTERFACE:
    files.set(INTERFACE_TEMPLATE, INTERFACE_FILE)
    break
  case PIPE:
    files.set(PIPE_TEMPLATE, PIPE_FILE)
    files.set(PIPE_SPEC_TEMPLATE, PIPE_SPEC_FILE)
    break
  case ROUTE:
    files.set(ROUTE_TEMPLATE, ROUTE_FILE)
  case MODULE:
    files.set(MODULE_TEMPLATE, MODULE_FILE)
  default:
    break
}

createFiles()

function createFiles() {
  const dir = program.type === COMPONENT ? path.resolve(_root, program.name) : _root

  mkdirp(dir, function(err) {
    if (err) { throw err }

    for (let [key, value] of files) {
      fs.readFile(key, "utf8", function(err, data) {
        if (err) { throw err }
        const compiled = template(data)
        fs.appendFile(value, compiled(options))
      })
    }
  })
  console.log('Success!')
}

function root() {
  let cwd = process.cwd()

  if (fileExists('./package.json')) {
    return path.join(cwd, 'src', 'app', parent)
  } else {
    return path.join(cwd, parent)
  }
}

function fileExists(file) {
  try {
    return fs.statSync(file).isFile()
  } catch (e) {
    return false
  }
}
