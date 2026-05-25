// Photo manifest. Each entry: { src, cat, caption, span? }
// `span` is optional and controls grid layout: 'tall' or 'wide'.
// To add a photo, drop the file into images/<cat>/ and append an entry below.

export const photos = [
  {
    src: 'images/mabu/02.jpg',
    cat: 'mabu',
    caption: 'Mabu, ready to be admired.',
    span: 'tall'
  },
  {
    src: 'images/peanut/02.jpg',
    cat: 'peanut',
    caption: 'A small bath, in the afternoon.'
  },
  {
    src: 'images/zhangsan/02.jpg',
    cat: 'zhangsan',
    caption: '张三, in full plume.'
  },
  {
    src: 'images/mabu/01.jpg',
    cat: 'mabu',
    caption: 'The paper-bag situation.',
    span: 'wide'
  },
  {
    src: 'images/peanut/01.jpg',
    cat: 'peanut',
    caption: 'Yellow vest, pet carrier.'
  },
  {
    src: 'images/zhangsan/03.jpg',
    cat: 'zhangsan',
    caption: 'A long look.',
    span: 'tall'
  },
  {
    src: 'images/mabu/03.jpg',
    cat: 'mabu',
    caption: 'Television-side.'
  },
  {
    src: 'images/peanut/03.jpg',
    cat: 'peanut',
    caption: 'Bag, head-first.'
  },
  {
    src: 'images/zhangsan/01.jpg',
    cat: 'zhangsan',
    caption: 'Kitten, in a bed.'
  }
];

export const cats = {
  mabu: {
    displayName: 'Mabu',
    accent: '#5c6b7a',
    article: 'a'
  },
  peanut: {
    displayName: 'Peanut',
    accent: '#c45b1f',
    article: 'a'
  },
  zhangsan: {
    displayName: '张三',
    accent: '#6b8e6e',
    article: 'a'
  }
};
