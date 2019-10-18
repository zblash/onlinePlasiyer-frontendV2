import { css as styledCss } from 'styled-components';
import { makeid } from '~/utils';
import { ExpressTypes } from '.';

interface IStyles {
  css: string;
  className: string;
}

type CssExpressionType = (string | number)[];

const styles: IStyles[] = [];
const globals: string[] = [];

function cssToString(_styles: TemplateStringsArray, ...args: CssExpressionType) {
  let mergedCss = '';
  _styles.forEach((_css, index) => {
    mergedCss += _css + (args[index] || '');
  });

  return mergedCss
    .replace(/(\/\*([\s\S]*?)\*\/)|(\/\/(.*)$)/gm, ' ')
    .replace(/\s+/g, ' ')
    .replace(/(\r\n|\n|\r)/gm, ' ');
}

function css(_styles: TemplateStringsArray, ...args: CssExpressionType) {
  const _css = cssToString(_styles, ...args);
  const oldStyle = styles.find(sty => sty.css === _css);
  if (oldStyle) {
    return oldStyle.className;
  }

  const className = makeid(9);
  styles.push({ className, css: _css });

  return className;
}

function globalCss(_styles: TemplateStringsArray, ...args: CssExpressionType) {
  globals.push(cssToString(_styles, ...args));
}

css.styled = styledCss;
css.global = globalCss;

const globalStyle = () => `${styles.map(style => `.${style.className}{${style.css}}`).join('')}${globals.join('\n')}`;

// @ts-ignore
const _css: {
  (_styles: TemplateStringsArray, ...args: (ExpressTypes)[]): string;
  styled: typeof styledCss;
  global: typeof globalCss;
} = css;

export { _css as css, globalStyle };
