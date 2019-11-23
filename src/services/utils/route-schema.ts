import { MaybeArray } from '~/helpers';
import { objectForeach, isArray, isObject } from '~/utils';

type RouteSchema = {
  id: string;
  props?: {
    [key: string]: MaybeArray<RouteSchema>;
  };
};
// [hooks] sonra bak buraya
function dataToSchema(data: any): MaybeArray<RouteSchema> {
  if (isArray(data)) {
    return data.map(childItem => dataToSchema(childItem) as RouteSchema);
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
      const cacheMap = value.map(val => dataToSchema(val) as RouteSchema);
      if (cacheMap.filter(cache => cache === null).length === 0) {
        route.props = { ...route.props, [key]: cacheMap };
      }
    } else if (isObject(value)) {
      route.props = { ...route.props, [key]: dataToSchema(value) };
    }
  });

  return route;
}

export { dataToSchema };
