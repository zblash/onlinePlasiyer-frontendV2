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
      if (cacheMap !== null) {
        route.props = { ...route.props, [key]: cacheMap };
      }
    } else if (isObject(value)) {
      const result = dataToSchema(value);
      if (result !== null) {
        route.props = { ...route.props, [key]: dataToSchema(value) };
      }
    }
  });

  return route;
}
function isDbObject(obj: any) {
  if (isObject(obj) && obj[CURRENT_ID_KEY]) {
    return true;
  }

  return false;
}

function isDbArray(obj: any) {
  if (isArray(obj)) {
    if (
      obj.filter(item => {
        if (isDbObject(item)) {
          return true;
        }
        if (isDbArray(item)) {
          return true;
        }

        return false;
      }).length === obj.length
    ) {
      return true;
    }
  }

  return false;
}

const separateData = (unmodifiedData: any, isInline = false) => {
  let modifiedData: Record<string, any> = {};
  if (isDbArray(unmodifiedData)) {
    unmodifiedData.forEach(nestedUnmodifiedData => {
      modifiedData = { ...modifiedData, ...separateData(nestedUnmodifiedData) };
    });
  } else if (isDbObject(unmodifiedData)) {
    const unmodifiedDataId = unmodifiedData[CURRENT_ID_KEY];
    modifiedData[unmodifiedDataId] = modifiedData[unmodifiedDataId] || {};
    objectForeach(unmodifiedData, (key, dataField) => {
      if (isDbObject(dataField) || isDbArray(dataField)) {
        const nestedModifiedData = separateData(dataField);
        modifiedData = { ...modifiedData, ...nestedModifiedData };
      } else {
        modifiedData[unmodifiedDataId][key] = dataField;
      }
    });
  } else if (isInline) {
    return unmodifiedData;
  } else {
    return null;
  }

  return modifiedData;
};

function schemaToData(schema: MaybeArray<RouteSchema>, seperatedObj: any) {
  if (isArray(schema)) {
    return schema.map(item => schemaToData(item, seperatedObj));
  }
  if (!schema || typeof schema !== 'object') {
    return null;
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
