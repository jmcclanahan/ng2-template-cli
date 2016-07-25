# NG2-Template-Cli
Command line tool to generate components based off of the official Angular 2 style guide

# Installation
`npm install ng2-template-cli`

**NOTE:** To use the cli directly on the command line you must install it globally ie. `npm install ng2-template-cli -g`. Installing it local to your project still allows you to use it from npm scripts if you prefer not to install globally.
# Usage
```
ng2t <type> <name> [root] [parent]
| -t, --type <type>     | Define the type of component you want to generate(eg. component,service,etc)
| -n, --name <name>     | Give your component a name
| -p, --parent [parent] | Define a new relative path to generate your template at(this path is relative to ./src/app/)
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
`-t, --type`

Define the type of component you want to generate(eg. component,service,etc)

* **This flag is required**
* Valid options
  * component
  * directive
  * service
  * enum
  * interface
  * pipe
```
// This will generate a service and the related files/folder named first.
// Refer to the Components section to see the files/folders generated.
ng2t -t service -n first

// This is equivalant to the above example
ng2t --type service --name first
```

`-n, --name`

Give your component a name

* **This flag is required**
* When supplying the name omit the word Component, Service, etc. For example, if you want the name of your service to be firstService your command would look like `--name first`

```
// This will generate an enum and the related files/folder named first.
// Refer to the Components section to see the files/folders generated.
ng2t -t enum -n first

// This is equivalant to the above example
ng2t --type enum --name first
```

`-p, --parent`

Define a new relative path to generate your template at(this path is relative to ./src/app/)

* **This flag is optional**
* Say you wanted to store all your components in a components folder under `./src/app/components`. You would then want to set the parent flag to `-p components`
* Maybe you have a common component that you want to generate in `./src/app/common/components`. The parent flag would be `-p common/components`
* **If you define a path and some or all of the folders don't exist the cli will create all the necessary folders.**

```
// This will generate an enum and the related files/folder named first
// and place the files under ./src/app/enums.
// If you omitted the -p flag it will place the files under ./src/app.
// Refer to the Components section to see the files/folders generated.
ng2t -t enum -n first -p enums

// This is equivalant to the above example
ng2t --type enum --name first --parent enums
```
