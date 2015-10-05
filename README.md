# playground-code-generation
[![js-standard-style][standard-image]][standard-url]

How fast can we generate new projects? A little experiment where every attempt
I have 10 minutes to create a new project. Increasing amounts of automation
should get me further each time.

Where touch typing and `vim` reduce friction between thought and characters
appearing on screen, code generation reduces friction between ideas and
projects being created. Why copy and paste boilerplate if we can let machines
do it for us.

## Installation
```sh
$ git clone https://github.com/yoshuawuyts/playground-code-generation
```

## Goals
- application entry point
- automated scripts working for both production + development
- assert serving for both production + development
- logging pipeline
- basic api setup
- typography + vars setup
- empty view, ready to be extended

## Timings
### [2015-10-05] project_02
- __time elapsed__: 00:14:52
- __modules used__: `initialize-project`
- __modules to build__: `initialize-submodule`, `initialize-build`,
  `initialize-api`, `initialize-initialize`

This went a lot better. Explored what the minimal viable server would look
like, and I think I've found it. I need to extend `initialize-project` to
create a CLI / index.js / hello world server, and create an API generator that
runs out some base endpoints.

### [2015-09-30] project_01
- __time elapsed__: 00:12:34
- __modules used__: `initialize`
- __modules to build__: `initialize-project`, `initialize-submodule`,
  `initialize-build`

This wasn't too fast. `initialize` is meant for modules, the project structure
wasn't too great either. It's probably best to create a base project, and then
use direction-specific generators (frontend / backend) to wire out the
necessary boilerplate. Creating submodules is also a bit slow, this could be
sped up a lot.

## License
[MIT](https://tldrlegal.com/license/mit-license)

[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
