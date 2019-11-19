/*  eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const translationJson = require('../statics/translation.json');
const themeJson = require('../statics/theme.json');

function narrowObject(obj) {
  const newobject = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (typeof value === 'object') {
      const transformedData = narrowObject(value);
      Object.keys(transformedData).forEach(nestedObjectKey => {
        newobject[`${key}.${nestedObjectKey}`] = transformedData[nestedObjectKey];
      });
    } else {
      newobject[key] = value;
    }
  });

  return newobject;
}
const translationObj = {};
const colorKeys = [];

Object.keys(translationJson).forEach(key => {
  Object.keys(translationJson[key]).forEach(itemKey => {
    translationObj[itemKey] = translationJson[key][itemKey];
  });
});

Object.keys(themeJson.themes).forEach(theme => {
  Object.keys(themeJson.themes[theme]).forEach(color => {
    if (!colorKeys.includes(color)) {
      colorKeys.push(color);
    }
  });
});

const translationKeys = Object.keys(narrowObject(translationObj));

const typeFileContent = `export type TranslationKeys=${translationKeys.map(key => `'${key}'`).join('|')};
export type ColorKeys=${colorKeys.map(key => `'${key}'`).join('|')};
`;

fs.writeFileSync(path.join(process.cwd(), 'src', 'helpers', 'static-types.ts'), typeFileContent);
