import { MaybeArray } from '~/helpers';
import { objectForeach, isArray, isObject } from '~/utils';

type RouteSchema = {
  id: string;
  props?: {
    [key: string]: MaybeArray<RouteSchema>;
  };
};
const CURRENT_ID_KEY = 'id';

// [hooks] sonra bak buraya
function dataToSchema(data: any): MaybeArray<RouteSchema> {
  if (typeof data !== 'object') {
    return null;
  }
  if (isArray(data)) {
    const arraySchema = data.map(childItem => dataToSchema(childItem) as RouteSchema);
    if (arraySchema.find(item => item === null)) {
      return null;
    }

    return arraySchema;
  }

  if (!data.id) {
    return null;
  }

  const route: RouteSchema = {
    id: data.id,
    props: {},
  };
  objectForeach(data, (key, value) => {
    if (isArray(value)) {
      const cacheMap = dataToSchema(value) as Array<RouteSchema>;
      if (cacheMap.filter(cache => cache === null).length === 0) {
        route.props = { ...route.props, [key]: cacheMap };
      } else {
        return null;
      }
    } else if (isObject(value)) {
      const result = dataToSchema(value);
      if (result === null) {
        throw new Error('Elemanlar Uygun degil');
      }
      route.props = { ...route.props, [key]: dataToSchema(value) };
    }
  });

  return route;
}

const separateData = (unmodifiedData: any) => {
  let modifiedData: Record<string, any> = {};

  if (isArray(unmodifiedData)) {
    (unmodifiedData as any[]).forEach(nestedUnmodifiedData => {
      modifiedData = { ...modifiedData, ...separateData(nestedUnmodifiedData) };
    });
  } else if (isObject(unmodifiedData) && unmodifiedData[CURRENT_ID_KEY]) {
    const unmodifiedDataId = unmodifiedData[CURRENT_ID_KEY];
    modifiedData[unmodifiedDataId] = modifiedData[unmodifiedDataId] || {};
    Object.keys(unmodifiedData).forEach(key => {
      const dataField = unmodifiedData[key];
      if (isObject(dataField) || isArray(dataField)) {
        const nestedModifiedData = separateData(dataField);
        if (nestedModifiedData) {
          modifiedData = { ...modifiedData, ...nestedModifiedData };
        } else {
          modifiedData[unmodifiedDataId][key] = dataField;
        }
      } else {
        modifiedData[unmodifiedDataId][key] = dataField;
      }
    });
  } else {
    return null;
  }

  return modifiedData;
};

function schemaToData(schema: MaybeArray<RouteSchema>, seperatedObj: any) {
  if (isArray(schema)) {
    return schema.map(item => schemaToData(item, seperatedObj));
  }
  const baseItem = seperatedObj[schema.id];
  if (!baseItem) {
    return null;
  }
  const databaseObjects = JSON.parse(JSON.stringify(baseItem));
  Object.keys(schema.props).forEach(prop => {
    const propValue = schema.props[prop];
    databaseObjects[prop] = isArray(propValue)
      ? propValue.map(childProp => schemaToData(childProp, seperatedObj))
      : schemaToData(propValue, seperatedObj);
  });

  return databaseObjects;
}

const backendObjectFunctions = {
  schemaToData,
  separateData,
  dataToSchema,
};

export { backendObjectFunctions };
