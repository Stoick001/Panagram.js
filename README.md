# Panagram.js

Panagram.js is an extra small (2kb) rich text editor build in pure JavaScript, with no dependencies.

Live Demo: https://jedit.herokuapp.com/

## Setup

Enabling Panagram.js is very easy, you just need to follow these two simple steps:

#### include it from a dist/ folder
  ```
    <script src="dist/Panagram.min.js"></script>
  ```

  or

  ```
  nmp install --save panagram
  ```

#### initialize Panagram.js with init()
  ```
  Panagram.init({
     // one of the pre built controls, required
    controls: 'defaultControls',

    // <HTMLElement> in which you want to put controls, required
    ctrElement: document.getElementById('controls'),

    // <HTMLElement> for rich text output, required
    outElement: document.getElementById('output'),
  });
  ```

## Custom controls

You can add your custom controls in config.js file. You can add to an existing set or create your own. If you do create your own share it so that other people can use it.

Quick rundown or different properties:
  1.  icon - this is how you choose to represent your control
  2.  title - is an as it name says a title
  3.  state - is used if a command is in a list of possible commands and does not need any additional data
  4.  formatBlock - is used if a command is not in a list of possible commands
  5.  extra - is used if a command is in a list of possible commands and does need additional data. Extra MUST return that additional data
  6.  short - used for toggling active class on element with keyboard shortcuts
