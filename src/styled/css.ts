import { css as styledCss, keyframes as styledKeyframes } from 'styled-components';
import cx from 'classnames';
import { makeid } from '~/utils';
import { ExpressTypes } from '.';

interface IStyles {
  css: string;
  className: string;
}
interface ICssVariable extends String {
  set: (s: string | number) => string;
  get: () => string;
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

function keyframes(_styles: TemplateStringsArray, ...args: CssExpressionType) {
  const _keyframe = styledKeyframes(_styles, ...args);
  // @ts-ignore
  const _keyframeCss = _keyframe.rules.join('');

  globals.push(_keyframeCss);

  return _keyframe.getName();
}
function createCssVariable(defaultVal: string | number): ICssVariable {
  const name = makeid(10);
  // eslint-disable-next-line
  css.global`
  html{
    --${name}:${defaultVal} 
  }
  `;

  // eslint-disable-next-line
  const str = new String(`var(--${name})`) as ICssVariable;

  str.set = s => `--${name}:${s}`;
  str.get = () => str.toString();

  return str;
}

css.styled = styledCss;
css.global = globalCss;
css.cx = cx;
css.keyframes = keyframes;
css.variable = createCssVariable;

const globalStyle = () => `${styles.map(style => `.${style.className}{${style.css}}`).join('')}${globals.join('\n')}`;

// @ts-ignore
const _css: {
  (_styles: TemplateStringsArray, ...args: (ExpressTypes)[]): string;
  styled: typeof styledCss;
  global: typeof globalCss;
  keyframes: typeof keyframes;
  variable: typeof createCssVariable;
  // eslint-disable-next-line
  cx: (...s: any) => string;
} = css;

export { _css as css, globalStyle };
