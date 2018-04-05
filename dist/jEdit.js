(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.jEdit = {})));
}(this, (function (exports) { 'use strict';

var controlsPremade = {
  defaultControls: [{
    icon: '<i>B</b>',
    title: 'Bold',
    comName: 'bold',
    state: true
  }, {
    icon: '<i>I</i>',
    title: 'Italic',
    comName: 'italic',
    state: true
  }, {
    icon: '<u>U</u>',
    title: 'Underline',
    comName: 'underline',
    state: true
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
    comName: 'insertOrderedList',
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
  if (el) {
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
    ctrElement.addEventListener(evn, function (e) {
      outElement.focus();
    });
  });

  outElement.addEventListener('keydown', function (event) {
    if (event.key === 'Tab') {
      event.preventDefault();
    } else if (event.key === 'Enter' && document.queryCommandValue('formatBlock') === 'blockquote') {
      document.querySelectorAll('[title="Quote"]')[0].classList.toggle('active');
      execute(null, 'formatBlock', '<div>');
    }
  });

  controls.forEach(function (control) {
    var button = document.createElement('button');
    button.innerHTML = control.icon;
    button.title = control.title;
    button.setAttribute('type', 'button');
    button.classList.add('ctrl-btn');

    ['click', 'touch'].forEach(function (evn) {
      if (control.state) {
        button.addEventListener(evn, function () {
          return execute(button, control.comName);
        });
      } else if (control.formatBlock) {
        button.addEventListener(evn, function () {
          return execute(null, control.formatBlock, control.comName);
        });
      } else {
        button.addEventListener(evn, function () {
          return execute(null, control.comName, control.extra());
        });
      }
    });

    ctrElement.append(button);
  });
};

exports.init = init;

Object.defineProperty(exports, '__esModule', { value: true });

})));
