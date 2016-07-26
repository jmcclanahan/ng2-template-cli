# NG2-Template-Cli
Command line tool to generate components based off of the official Angular 2 style guide

# Installation
`npm install ng2-template-cli -g`

**NOTE:** You can also install it local to your project but you will only be able to use it from npm scripts.
# Usage
* If you are in the root of your project the cli will generate all files/folders in the ./src/app directory by default. You can use the `--parent(-p)` flag to change this.
* If you are in any other folder other than the root it will use the current working directory to generate the files/folders. `--parent(-p)` will be relative to the current working directory.
```
  Usage: ng2t [options]

  Generate component templates based off of the Angular 2 style guide

  Options:

    -h, --help             output usage information
    -V, --version          output the version number
    -t, --type <type>      Define the type of component you want to generate(eg. component,service,etc)
    -n, --name <name>      Give your component a name
    -p, --parent [parent]  Define a new relative path to generate your template at(this path is relative to ./src/app/ if you are in the root of your project. Otherwise it uses the current working directory)
```
# Examples
From the command line:
*Generate an enum with the name first*
```
$ ng2t -t enum -n first
// or
$ ng2t --type enum --name first
```
*Generate a component in src/app/common. This assumes you are in the root of your project*
```
$ ng2t -t component -n first -p common
// or
$ ng2t --type component --name first --parent common
```
You can also do the above examples as npm scripts in your package.json:

*Generate an enum with the name first*
```
"generate:enum": "ng2t -t enum"
// then from the command line
$ npm run generate:enum -- -n first
```

# Components
The following angular component types and their corresponding files can be generated using this cli:
* Component
  * folder name
    * name.component.ts
    * name.component.html
    * name.component.css
    * name.component.spec.ts
* Directive
  * name.directive.ts
  * name.directive.spec.ts
* Service
  * name.service.ts
  * name.service.spec.ts
* Enum
  * name.enum.ts
* Interface
  * name.ts
* Pipe
  * name.pipe.ts
  * name.pipe.spec.ts

# API
**`-t, --type`**

Define the type of component you want to generate(eg. component,service,etc)

* **This flag is required**
* Valid options
  * component
  * directive
  * service
  * enum
  * interface
  * pipe

*This will generate a service and the related files/folder named first.
Refer to the Components section to see the files/folders generated.*
```
$ ng2t -t service -n first
```
*This is equivalant to the above example*
```
$ ng2t --type service --name first
```

**`-n, --name`**

Give your component a name

* **This flag is required**
* When supplying the name omit the word Component, Service, etc. For example, if you want the name of your service to be firstService your command would look like `--name first`

*This will generate an enum and the related files/folder named first.
Refer to the Components section to see the files/folders generated.*
```
$ ng2t -t enum -n first
```
*This is equivalant to the above example*
```
$ ng2t --type enum --name first
```

**`-p, --parent`**

Define a new relative path to generate your template at(this path is relative to ./src/app/ if you are in the root of your project. Otherwise it uses the current working directory

* **This flag is optional**
* Say you wanted to store all your components in a components folder under `./src/app/components`. You would then want to set the parent flag to `-p components`
* Maybe you have a common component that you want to generate in `./src/app/common/components`. The parent flag would be `-p common/components`
* **If you define a path and some or all of the folders don't exist the cli will create all the necessary folders.**

*This will generate an enum and the related files/folder named first
and place the files under ./src/app/enums.
If you omitted the -p flag it will place the files under ./src/app.
Refer to the Components section to see the files/folders generated.*
```
$ ng2t -t enum -n first -p enums
```
*This is equivalant to the above example*
```
$ ng2t --type enum --name first --parent enums
```
