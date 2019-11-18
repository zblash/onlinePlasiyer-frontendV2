import { RouteSchema } from '../helpers';
import { useDatabaseObjectsContext } from '../database-object-context/context';
import { isArray } from '~/utils';
import { MaybeArray } from '~/helpers';

function useParseSchema() {
  const databaseObjectsContext = useDatabaseObjectsContext();
  function parseSchema(schema: MaybeArray<RouteSchema>) {
    if (isArray(schema)) {
      return schema.map(item => parseSchema(item)).filter(item => !item.removed);
    }
    const databaseObjects = JSON.parse(JSON.stringify(databaseObjectsContext.objects[schema.id]));
    Object.keys(schema.props).forEach(prop => {
      const propValue = schema.props[prop];
      databaseObjects[prop] = isArray(propValue)
        ? propValue.map(childProp => parseSchema(childProp)).filter(item => !item.removed)
        : parseSchema(propValue);
    });

    return databaseObjects;
  }

  return parseSchema;
}

export { useParseSchema };
