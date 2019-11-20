/*  eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const JsonToTS = require('fork-json2ts');
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
function makeid(length) {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}
const translationObj = {};
let colorObj = {};

Object.keys(translationJson).forEach(key => {
  Object.keys(translationJson[key]).forEach(itemKey => {
    translationObj[itemKey] = translationJson[key][itemKey];
  });
});

Object.keys(themeJson.themes).forEach(key => {
  colorObj = { ...colorObj, ...themeJson.themes[key] };
});

const translationNarrowObject = narrowObject(translationObj);
const hangleTranslation = key =>
  translationNarrowObject[key].includes('<') &&
  translationNarrowObject[key].includes('/') &&
  translationNarrowObject[key].includes('>');

const UseTranslationItems = Object.keys(translationNarrowObject)
  .map(key => {
    const typeNames = [...translationNarrowObject[key].matchAll(/{{(.*?)}}/g)].map(i => `${i[1]}:string`);
    return {
      key,
      name: makeid(15),
      type: typeNames.length === 0 ? 'never' : `{${typeNames.join(',')}}`,
    };
  })
  .filter(({ key }) => !hangleTranslation(key));

const UseTranslationTypes = `
${UseTranslationItems.map(({ key, name }) => `type ${name}='${key}'`).join(';')};
export type UseTranslationAllKeys=${UseTranslationItems.map(item => item.name).join('|')};

export type UseTranslationFunction=<T extends UseTranslationAllKeys>(str:T,
 variables?:${UseTranslationItems.map((item, index) =>
   index + 1 === UseTranslationItems.length ? `${item.type}` : `T extends ${item.name}?${item.type}`,
 ).join(':')})=>string
  
`;

const typeFileContent = `
${UseTranslationTypes}
export type TransComponentKeys=${Object.keys(translationNarrowObject)
  .filter(key => hangleTranslation(key))
  .map(key => `'${key}'`)
  .join('|')};
export ${JsonToTS(colorObj, { rootName: 'Type', prefix: 'StaticColor' }).join(';\n')}
`.trim();

fs.writeFileSync(path.join(process.cwd(), 'src', 'helpers', 'static-types.ts'), typeFileContent);
