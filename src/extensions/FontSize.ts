// import { Extension } from '@tiptap/core';
// import { RawCommands } from '@tiptap/core';

// export const FontSize = Extension.create({
//   name: 'fontSize',

//   addOptions() {
//     return {
//       types: ['textStyle'],
//     };
//   },

//   addGlobalAttributes() {
//     return [
//       {
//         types: this.options.types,
//         attributes: {
//           fontSize: {
//             default: null,
//             parseHTML: (element) => element.style.fontSize?.replace(/['"]+/g, ''),
//             renderHTML: (attributes) => {
//               if (!attributes.fontSize) return {};
//               return { style: `font-size: ${attributes.fontSize}` };
//             },
//           },
//         },
//       },
//     ];
//   },

//   addCommands() {
//     return {
//       setFontSize:
//         (fontSize: string) =>
//         ({ chain }) => {
//           return chain().setMark('textStyle', { fontSize }).run();
//         },
//     } as Partial<RawCommands>;
//   },
// });


















import { Extension, CommandProps, RawCommands } from '@tiptap/core';

export const FontSize = Extension.create({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
    };
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: (element) => element.style.fontSize?.replace(/['"]+/g, ''),
            renderHTML: (attributes) => {
              if (!attributes.fontSize) return {};
              return { style: `font-size: ${attributes.fontSize}` };
            },
          },
        },
      },
    ];
  },

  addCommands() {
    return {
      setFontSize:
        (fontSize: string) =>
        ({ chain }: CommandProps) => {
          return chain().setMark('textStyle', { fontSize }).run();
        },
    } as Partial<RawCommands>;
  },
});
