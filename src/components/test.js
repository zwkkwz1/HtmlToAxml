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
    style: ["text-decoration:", "underline;", "background-color:", "#00ffff;"], // attr.style似乎是没用的
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
