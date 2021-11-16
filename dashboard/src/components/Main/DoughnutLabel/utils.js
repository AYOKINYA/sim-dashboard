
import { valueOrDefault, isNullOrUndef, toLineHeight } from 'chart.js/helpers';

const defaults = {
  font: {
    family: 'Arial, Helvetica, sans-serif', // font-family you assign more than one font style.
    lineHeight: 1.6,
    size: 60,
    style: '',
    weight: null,
    color: 'blue'
  },
};

const parseFont = value => {
  const size =  valueOrDefault(value.size, defaults.font.size);
  const font = {
    family: valueOrDefault(value.family, defaults.font.family),
    lineHeight: toLineHeight(value.lineHeight, size),
    size: size,
    style: valueOrDefault(value.style, defaults.font.style),
    weight: valueOrDefault(value.weight, null),
    string: ''
  };

  font.string = utils.toFontString(font);
  return font;
};

const toFontString = font => {
  if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
    return null;
  }

  return (font.style ? font.style + ' ' : '')
    + (font.weight ? font.weight + ' ' : '')
    + font.size + 'px '
    + font.family;
};

const textSize = (ctx, labels) => {
  const items = [].concat(labels);
  const ilen = items.length;
  const prev = ctx.font;
  let width = 0;
  let height = 0;

  for (let i = 0; i < ilen; ++i) {
    ctx.font = items[i].font.string;
    width = Math.max(ctx.measureText(items[i].text).width, width);
    height += items[i].font.lineHeight;
  }

  ctx.font = prev;

  const result = {
    height: height,
    width: width
  };
  return result;
};


export const utils = {
  parseFont,
  toFontString,
  textSize,
  defaults
};

export default utils;