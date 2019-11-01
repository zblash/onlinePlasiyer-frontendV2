import { RouteSchema } from '../helpers';
import { useDatabaseObjectsContext } from '../database-object-context/context';
import { isArray } from '~/utils';

function useParseSchema() {
  const databaseObjectsContext = useDatabaseObjectsContext();
  function parseSchema(schema: RouteSchema) {
    const databaseObjects = JSON.parse(JSON.stringify(databaseObjectsContext.objects[schema.id]));
    Object.keys(schema.props).forEach(prop => {
      const propValue = schema.props[prop];
      databaseObjects[prop] = isArray(propValue)
        ? propValue.map(childProp => parseSchema(childProp))
        : parseSchema(propValue);
    });
    return databaseObjects;
  }

  return parseSchema;
}

export { useParseSchema };
