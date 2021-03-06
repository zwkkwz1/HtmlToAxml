var a = [
  { name: "p", children: [{ type: "text", text: "123" }], attrs: {} },
  { type: "text", text: "\n" },
  { name: "p", children: [{ type: "text", text: "123" }], attrs: {} },
];

var nodes = [
  {
    type: 1,
    tag: "p",
    tagType: 0,
    props: [],
    isSelfClosing: false,
    children: [{ type: 2, content: "123123" }],
  },
];

const aNodes1 = [
  {
    node: "element",
    tag: "p",
    index: "0",
    tagType: "block",
    attr: null,
    classStr: null,
    styleStr: null,
    imgIndex: null,
    from: null,
    nodes: [
      {
        node: "text",
        text: "123",
        textArray: [{ node: "text", text: "123", tag: null, baseSrc: null }],
        index: "0.0",
        indexHandle: 1,
      },
    ],
    indexHandle: 1,
  },
];

var wxModes = [
  {
    node: "element",
    tag: "p",
    index: "0",
    tagType: "block",
    nodes: [
      {
        node: "text",
        text: "12312111113",
        textArray: [{ node: "text", text: "12312111113" }],
        index: "0.0",
      },
    ],
  },
];

var wxNodes2 = {
  node: "article",
  nodes: [
    {
      node: "element",
      tag: "p",
      index: "0",
      tagType: "block",
      nodes: [
        {
          node: "element",
          tag: "span",
          index: "0.0",
          tagType: "inline",
          styleStr: "text-decoration: line-through;",
          attr: { style: ["text-decoration:", "line-through;"] },
          nodes: [
            {
              node: "text",
              text: "123123",
              textArray: [{ node: "text", text: "123123" }],
              index: "0.0.0",
            },
          ],
        },
      ],
    },
    {
      node: "text",
      text: "\n",
      textArray: [{ node: "text", text: "\n" }],
      index: "1",
    },
    {
      node: "element",
      tag: "p",
      index: "2",
      tagType: "block",
      nodes: [
        {
          node: "text",
          text: "sdafaf",
          textArray: [{ node: "text", text: "sdafaf" }],
          index: "2.0",
        },
      ],
    },
  ],
  images: [],
  imageUrls: [],
  view: { imagePadding: 0 },
};

const vNodes = [
  {
    type: 1,
    tag: "p",
    tagType: 0,
    props: [],
    isSelfClosing: false,
    children: [
      {
        type: 1,
        tag: "span",
        tagType: 0,
        props: [
          {
            type: 6,
            name: "style",
            value: { type: 2, content: "text-decoration: underline;" },
          },
        ],
        isSelfClosing: false,
        children: [{ type: 2, content: "123" }],
      },
    ],
  },
];

const wxNodes3 = {
  node: "article",
  nodes: [
    {
      node: "element",
      tag: "p",
      index: "0",
      tagType: "block",
      nodes: [
        {
          node: "element",
          tag: "span",
          index: "0.0",
          tagType: "inline",
          styleStr: "text-decoration: underline;",
          attr: { style: ["text-decoration:", "underline;"] },
          nodes: [
            {
              node: "text",
              text: "123",
              textArray: [{ node: "text", text: "123" }],
              index: "0.0.0",
            },
          ],
        },
      ],
    },
  ],
  images: [],
  imageUrls: [],
  view: {},
};

const wxNodes4 = {
  node: "article",
  nodes: [
    {
      node: "element",
      tag: "p",
      index: "0",
      tagType: "block",
      nodes: [
        {
          node: "element",
          tag: "span",
          index: "0.0",
          tagType: "inline",
          styleStr: "text-decoration: underline;",
          attr: { style: ["text-decoration:", "underline;"] },
          nodes: [
            {
              node: "text",
              text: "123",
              textArray: [{ node: "text", text: "123" }],
              index: "0.0.0",
            },
          ],
        },
      ],
    },
    {
      node: "text",
      text: "\n",
      textArray: [{ node: "text", text: "\n" }],
      index: "1",
    },
    {
      node: "element",
      tag: "p",
      index: "2",
      tagType: "block",
      nodes: [
        {
          node: "element",
          tag: "span",
          index: "2.0",
          tagType: "inline",
          styleStr: "text-decoration: line-through;",
          attr: { style: ["text-decoration:", "line-through;"] },
          nodes: [
            {
              node: "text",
              text: "123123",
              textArray: [{ node: "text", text: "123123" }],
              index: "2.0.0",
            },
          ],
        },
      ],
    },
    {
      node: "text",
      text: "\n",
      textArray: [{ node: "text", text: "\n" }],
      index: "3",
    },
    {
      node: "element",
      tag: "p",
      index: "4",
      tagType: "block",
      nodes: [
        {
          node: "text",
          text: "123123",
          textArray: [{ node: "text", text: "123123" }],
          index: "4.0",
        },
      ],
    },
  ],
  images: [],
  imageUrls: [],
  view: {},
};

const vClassNodes = [
  { type: 6, name: "class", value: { type: 2, content: "test" } },
];

const vStyleNodes = [
  {
    type: 6,
    name: "style",
    value: {
      type: 2,
      content: "text-decoration: underline; background-color: #00ffff;",
    },
  },
];

const wxAttrNodes = {
  tagType: "inline",
  styleStr: "text-decoration: underline; background-color: #00ffff;",
  classStr: "test",
  attr: {
    style: ["text-decoration:", "underline;", "background-color:", "#00ffff;"], // attr.style??????????????????
    class: ["test"],
  },
};

var a = [
  {
    type: 1,
    tag: "p",
    tagType: 0,
    props: [],
    isSelfClosing: false,
    children: [
      {
        type: 1,
        tag: "span",
        tagType: 0,
        props: [
          {
            type: 6,
            name: "style",
            value: {
              type: 2,
              content: "text-decoration: underline; background-color: #00ffff;",
            },
          },
        ],
        isSelfClosing: false,
        children: [{ type: 2, content: "123" }],
      },
    ],
  },
];
// <video controls="controls" width="300" height="150">
const vNodes5 = [
  {
    type: 1,
    tag: "p",
    node: "element",
    tagType: "closeSelf",
    props: [],
    isSelfClosing: false,
    children: [
      {
        type: 1,
        tag: "video",
        node: "element",
        tagType: "block",
        isSelfClosing: false,
        children: [
          {
            type: 1,
            tag: "source",
            node: "element",
            tagType: "empty",
            props: [
              {
                type: 6,
                name: "src",
                value: {
                  type: 2,
                  content:
                    "https://vd4.bdstatic.com/mda-mkm48rdgkc8webrb/sc/cae_h264_clips/1637550577273483133/mda-mkm48rdgkc8webrb.mp4?auth_key=1637562663-0-0-bfeaf33b14c26148cee480ccbbea98e1&amp;bcevod_channel=searchbox_feed&amp;pd=1&amp;pt=3&amp;abtest=&amp;klogid=0063846881",
                },
              },
            ],
            isSelfClosing: true,
            children: [],
          },
          {
            node: "text",
            text: "\n",
            textArray: [{ node: "text", text: "\n" }],
          },
        ],
        attr: {
          controls: "controls",
          width: "300",
          height: "150",
          src: "https://vd4.bdstatic.com/mda-mkm48rdgkc8webrb/sc/cae_h264_clips/1637550577273483133/mda-mkm48rdgkc8webrb.mp4?auth_key=1637562663-0-0-bfeaf33b14c26148cee480ccbbea98e1&amp;bcevod_channel=searchbox_feed&amp;pd=1&amp;pt=3&amp;abtest=&amp;klogid=0063846881",
        },
      },
    ],
  },
];
const wxNodes5 = [
  {
    node: "element",
    tag: "p",
    index: "0",
    tagType: "block",
    nodes: [
      {
        node: "element",
        tag: "video",
        index: "0.0",
        tagType: "block",
        attr: {
          controls: "controls",
          width: "300",
          height: "150",
          src: "https://vd4.bdstatic.com/mda-mkm48rdgkc8webrb/sc/cae_h264_clips/1637550577273483133/mda-mkm48rdgkc8webrb.mp4?auth_key=1637562663-0-0-bfeaf33b14c26148cee480ccbbea98e1&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest=&klogid=0063846881",
        },
        nodes: [
          {
            node: "text",
            text: "\n",
            textArray: [{ node: "text", text: "\n" }],
            index: "0.0.0",
          },
          {
            node: "element",
            tag: "source",
            index: "0.0.1",
            attr: {
              src: "https://vd4.bdstatic.com/mda-mkm48rdgkc8webrb/sc/cae_h264_clips/1637550577273483133/mda-mkm48rdgkc8webrb.mp4?auth_key=1637562663-0-0-bfeaf33b14c26148cee480ccbbea98e1&bcevod_channel=searchbox_feed&pd=1&pt=3&abtest=&klogid=0063846881",
            },
          },
        ],
      },
    ],
  },
];

const vNodes7 = [
  {
    type: 1,
    tag: "ul",
    node: "element",
    tagType: "block",
    props: [
      { type: 6, name: "class", value: { type: 2, content: "w-e-todo" } },
    ],
    isSelfClosing: false,
    children: [
      {
        type: 1,
        tag: "li",
        node: "element",
        tagType: "closeSelf",
        props: [],
        isSelfClosing: false,
        children: [
          {
            type: 1,
            tag: "span",
            node: "element",
            tagType: "inline",
            props: [
              {
                type: 6,
                name: "contenteditable",
                value: { type: 2, content: "false" },
              },
            ],
            isSelfClosing: false,
            children: [
              {
                type: 1,
                tag: "input",
                node: "element",
                tagType: "empty",
                props: [
                  {
                    type: 6,
                    name: "type",
                    value: { type: 2, content: "checkbox" },
                  },
                ],
                isSelfClosing: true,
                children: [],
              },
            ],
          },
          {
            type: 1,
            tag: "span",
            node: "element",
            tagType: "inline",
            props: [
              {
                type: 6,
                name: "style",
                value: {
                  type: 2,
                  content: "background-color: rgb(194, 79, 74)",
                },
              },
            ],
            isSelfClosing: false,
            children: [
              {
                type: 2,
                text: "112312311",
                content: "112312311",
                node: "text",
                textArray: [{ node: "text", text: "112312311" }],
              },
            ],
            styleStr: "background-color: rgb(194, 79, 74)",
          },
        ],
      },
    ],
    classStr: "w-e-todo",
  },
];

const wxNodes7 = [
  {
    node: "element",
    tag: "span",
    index: "0",
    tagType: "inline",
    attr: { contenteditable: "false" },
    nodes: [
      {
        node: "text",
        text: "\n",
        textArray: [{ node: "text", text: "\n" }],
        index: "0.0",
      },
      {
        node: "element",
        tag: "input",
        index: "0.1",
        tagType: "inline",
        attr: { type: "checkbox" },
      },
      {
        node: "text",
        text: "\n",
        textArray: [{ node: "text", text: "\n" }],
        index: "0.2",
      },
    ],
  },
  {
    node: "text",
    text: "\n",
    textArray: [{ node: "text", text: "\n" }],
    index: "1",
  },
  {
    node: "element",
    tag: "span",
    index: "2",
    tagType: "inline",
    nodes: [
      {
        node: "text",
        text: "112312311",
        textArray: [{ node: "text", text: "112312311" }],
        index: "2.0",
      },
    ],
  },
];

const aNodes = [
  {
    node: "element",
    tag: "ul",
    index: "0",
    tagType: "block",
    attr: { class: "w-e-todo" },
    classStr: "w-e-todo",
    styleStr: null,
    imgIndex: null,
    from: null,
    nodes: [
      {
        node: "element",
        tag: "li",
        index: "0.0",
        tagType: "block",
        attr: null,
        classStr: null,
        styleStr: null,
        imgIndex: null,
        from: null,
        nodes: [
          {
            node: "element",
            tag: "span",
            index: "0.0.0",
            tagType: "inline",
            attr: { contenteditable: "false" },
            classStr: null,
            styleStr: null,
            imgIndex: null,
            from: null,
            nodes: [
              {
                node: "element",
                tag: "input",
                index: "0.0.0.0",
                tagType: "inline",
                attr: { type: "checkbox" },
                classStr: null,
                styleStr: null,
                imgIndex: null,
                from: null,
                indexHandle: 1,
              },
            ],
            indexHandle: 1,
          },
          {
            node: "element",
            tag: "span",
            index: "0.0.1",
            tagType: "inline",
            attr: { style: ["background-color:", "rgb(194,", "79,", "74);"] },
            classStr: null,
            styleStr: "background-color: rgb(194, 79, 74);",
            imgIndex: null,
            from: null,
            nodes: [
              {
                node: "text",
                text: "112312311",
                textArray: [
                  {
                    node: "text",
                    text: "112312311",
                    tag: null,
                    baseSrc: null,
                  },
                ],
                index: "0.0.1.0",
                indexHandle: 2,
              },
            ],
            indexHandle: 1,
          },
        ],
        indexHandle: 1,
      },
    ],
    indexHandle: 1,
  },
]

const nvNodes = [
  {
    type: 1,
    tag: "p",
    node: "element",
    tagType: "closeSelf",
    props: [],
    isSelfClosing: false,
    children: [
      {
        type: 2,
        text: "~~~~~~~~~~~~editor-",
        content: "~~~~~~~~~~~~editor-",
        node: "text",
        textArray: [{ node: "text", text: "~~~~~~~~~~~~editor-" }],
      },
    ],
  },
  {
    type: 1,
    tag: "p",
    node: "element",
    tagType: "closeSelf",
    props: [],
    isSelfClosing: false,
    children: [
      {
        type: 2,
        text: "123123",
        content: "123123",
        node: "text",
        textArray: [{ node: "text", text: "123123" }],
      },
    ],
  },
  {
    type: 1,
    tag: "p",
    node: "element",
    tagType: "closeSelf",
    props: [],
    isSelfClosing: false,
    children: [
      {
        type: 2,
        text: "zwk~12132~~~~~~~~~~~~~",
        content: "zwk~12132~~~~~~~~~~~~~",
        node: "text",
        textArray: [{ node: "text", text: "zwk~12132~~~~~~~~~~~~~" }],
      },
    ],
  },
];

const newVNodes = [
  {
    type: 1,
    tag: "p",
    node: "element",
    tagType: "block",
    props: [],
    isSelfClosing: true,
    children: [
      {
        type: 2,
        text: "222",
        content: "222",
        node: "text",
        textArray: [{ node: "text", text: "222" }],
        loc: {
          start: { column: 4, line: 1, offset: 3 },
          end: { column: 7, line: 1, offset: 6 },
          source: "222",
        },
      },
    ],
    loc: {
      start: { column: 1, line: 1, offset: 0 },
      end: { column: 11, line: 1, offset: 10 },
      source: "<p>222</p>",
    },
    isFlag: "Flag",
  },
  {
    type: 1,
    tag: "p",
    node: "element",
    tagType: "block",
    props: [],
    isSelfClosing: true,
    children: [
      {
        type: 2,
        text: "123",
        content: "123",
        node: "text",
        textArray: [{ node: "text", text: "123" }],
        loc: {
          start: { column: 4, line: 2, offset: 30 },
          end: { column: 7, line: 2, offset: 33 },
          source: "123",
        },
      },
    ],
    loc: {
      start: { column: 1, line: 2, offset: 27 },
      end: { column: 11, line: 2, offset: 37 },
      source: "<p>123</p>",
    },
    isFlag: "Flag",
  },
  {
    type: 1,
    tag: "div",
    node: "element",
    tagType: "block",
    props: [],
    isSelfClosing: false,
    children: [
      {
        type: 2,
        text: "1",
        content: "1",
        node: "text",
        textArray: [{ node: "text", text: "1" }],
        loc: {
          start: { column: 6, line: 3, offset: 23 },
          end: { column: 7, line: 3, offset: 24 },
          source: "1",
        },
      },
    ],
    loc: {
      start: { column: 1, line: 3, offset: 18 },
      end: { column: 13, line: 3, offset: 30 },
      source: "<div>1</div>",
    },
  },
];

const vN = [
  {
    type: 1,
    tag: "p",
    node: "element",
    tagType: "block",
    props: [],
    isSelfClosing: false,
    children: [
      {
        type: 1,
        tag: "font",
        node: "element",
        tagType: "inline",
        props: [{ type: 6, name: "size", value: { type: 2, content: "7" } }],
        isSelfClosing: false,
        children: [
          {
            type: 2,
            text: "123123",
            content: "123123",
            node: "text",
            textArray: [{ node: "text", text: "123123" }],
            loc: {
              start: { column: 19, line: 1, offset: 18 },
              end: { column: 25, line: 1, offset: 24 },
              source: "123123",
            },
          },
        ],
        loc: {
          start: { column: 4, line: 1, offset: 3 },
          end: { column: 32, line: 1, offset: 31 },
          source: '<font size="7">123123</font>',
        },
      },
    ],
    loc: {
      start: { column: 1, line: 1, offset: 0 },
      end: { column: 36, line: 1, offset: 35 },
      source: '<p><font size="7">123123</font></p>',
    },
  },
];

const tbNode = [
  {
    node: "element",
    tag: "p",
    index: "0",
    tagType: "block",
    attr: { style: "line-height:3;" },
    classStr: null,
    styleStr: "line-height:3;",
    imgIndex: null,
    from: null,
    nodes: [
      {
        node: "element",
        tag: "font",
        index: "0.0",
        tagType: "inline",
        attr: { size: "5", style: ["font-size", "x-large"] },
        classStr: null,
        styleStr: "font-size: x-large;",
        imgIndex: null,
        from: null,
        nodes: [
          {
            node: "text",
            text: "12312",
            textArray: [
              { node: "text", text: "12312", tag: null, baseSrc: null },
            ],
            index: "0.0.0",
          },
        ],
      },
    ],
  }
];