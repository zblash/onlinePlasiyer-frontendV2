import * as React from 'react';
import { RouteSchema } from '../helpers';
import { useDatabaseObjectsContext } from '../database-object-context/context';
import { isArray } from '~/utils';
import { MaybeArray } from '~/helpers';

function useParseSchema() {
  const { getObjects } = useDatabaseObjectsContext();
  const parseSchema = React.useCallback(
    (schema: MaybeArray<RouteSchema>) => {
      if (isArray(schema)) {
        return schema.map(item => parseSchema(item)).filter(item => !item.removed);
      }

      // [hooks] this is set the data
      const databaseObjects = getObjects()[schema.id];
      Object.keys(schema.props).forEach(prop => {
        const propValue = schema.props[prop];
        databaseObjects[prop] = isArray(propValue)
          ? propValue.map(childProp => parseSchema(childProp)).filter(item => !item.removed)
          : parseSchema(propValue);
      });

      return databaseObjects;
    },
    [getObjects],
  );

  return parseSchema;
}

export { useParseSchema };
