export default {
  defaultControls: [
    {
      icon: '<i>B</b>',
      title: 'Bold',
      comName: 'bold',
      state: true,
    }, {
      icon: '<i>I</i>',
      title: 'Italic',
      comName: 'italic',
      state: true,
    }, {
      icon: '<u>U</u>',
      title: 'Underline',
      comName: 'underline',
      state: true,
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
      state: true,
    }, {
      icon: '&#8226;',
      title: 'Unordered List',
      comName: 'insertOrderedList',
      state: true,
    }, {
      icon: '&#128279;',
      title: 'Link',
      comName: 'createLink',
      extra: () => window.prompt('Enter the link URL'),
    }, {
      icon: '&#128247;',
      title: 'Image',
      comName: 'insertImage',
      extra: () => window.prompt('Enter the link URL'),
    },
  ]
}
