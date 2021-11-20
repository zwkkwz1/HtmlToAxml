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
