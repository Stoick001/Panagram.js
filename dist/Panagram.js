(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.Panagram = {})));
}(this, (function (exports) { 'use strict';

var controlsPremade = {
  defaultControls: [{
    icon: '<b>B</b>', //fixed matching in tag surrounding icon text.
    title: 'Bold',
    comName: 'bold',
    state: true,
    short: 'b'
  }, {
    icon: '<i>I</i>',
    title: 'Italic',
    comName: 'italic',
    state: true,
    short: 'i'
  }, {
    icon: '<u>U</u>',
    title: 'Underline',
    comName: 'underline',
    state: true,
    short: 'u'
  }, {
    icon: '<b>H<sub>1</sub></b>',
    title: 'Heading 1',
    comName: '<h1>',
    formatBlock: 'formatBlock'
  }, {
    icon: '<b>H<sub>2</sub></b>',
    title: 'Heading 2',
    comName: '<h2>',
    formatBlock: 'formatBlock'
  }, {
    icon: 'P',
    title: 'Paragraph',
    comName: '<p>',
    formatBlock: 'formatBlock'
  }, {
    icon: '&#8220; &#8221;',
    title: 'Quote',
    comName: '<blockquote>',
    formatBlock: 'formatBlock'
  }, {
    icon: '&#35;',
    title: 'Ordered List',
    comName: 'insertOrderedList',
    state: true
  }, {
    icon: '&#8226;',
    title: 'Unordered List',
    comName: 'insertUnorderedList',
    state: true
  }, {
    icon: '&#128279;',
    title: 'Link',
    comName: 'createLink',
    extra: function extra() {
      return window.prompt('Enter the link URL');
    }
  }, {
    icon: '&#128247;',
    title: 'Image',
    comName: 'insertImage',
    extra: function extra() {
      return window.prompt('Enter the link URL');
    }
  }]
};

var execute = function execute(el, command, val) {
  if (el && !command.includes('List')) {
    el.classList.toggle('active');
  }
  document.execCommand(command, false, val ? val : null);
};

var init = function init(settings) {
  var controls = controlsPremade[settings.controls];
  var ctrElement = settings.ctrElement;
  var outElement = settings.outElement;

  outElement.contentEditable = true;
  outElement.classList.add('output-el');

  ['click', 'touch'].forEach(function (evn) {
    ctrElement.addEventListener(evn, outElement.focus.bind(outElement));
  });

  outElement.addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
      event.preventDefault();
    } else if (event.key === 'Enter' && document.queryCommandValue('formatBlock') === 'blockquote' || outElement.innerHTML === "" || outElement.innerHTML === "<br>") {
      setTimeout(execute.bind(null, null, 'formatBlock', '<div>'), 0);
    }
  });

  controls.forEach(function (control) {
    var button = document.createElement('button');
    button.innerHTML = control.icon;
    button.title = control.title;
    button.setAttribute('type', 'button');
    button.classList.add('ctrl-btn');

    if (control.short) {
      document.addEventListener('keydown', function (event) {
        if (event.ctrlKey && event.key.toLowerCase() === control.short) {
          button.classList.toggle('active');
        }
      });
    }

    ['click', 'touch'].forEach(function (evn) {
      if (control.state) {
        button.addEventListener(evn, execute.bind(null, button, control.comName));
        ['keyup', 'mouseup'].forEach(function (cnt) {
          outElement.addEventListener(cnt, function (e) {
            if (document.queryCommandState(control.comName) && !control.comName.includes('List')) {
              button.classList.add('active');
            } else if (button.classList.contains('active')) {
              button.classList.remove('active');
            }
          });
        });
      } else if (control.formatBlock) {
        button.addEventListener(evn, execute.bind(null, null, control.formatBlock, control.comName));
      } else {
        button.addEventListener(evn, function () {
          var val = control.extra();
          if (val) {
            execute(null, control.comName, val);
          }
        });
      }
    });

    ctrElement.append(button);
  });
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
