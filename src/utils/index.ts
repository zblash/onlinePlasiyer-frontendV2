import { UserCommonResponse } from '~/__types';

const isArray = (o: any) => Array.isArray(o);
const isObject = (o: any) => !isArray(o) && typeof o === 'object' && o !== null && o !== undefined;

function getDisplayName(WrappedComponent): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function isUserAdmin(user: UserCommonResponse) {
  return user.role === 'ADMIN';
}

function isUserMerchant(user: UserCommonResponse) {
  return user.role === 'MERCHANT';
}

function narrowObject(
  obj: Record<string, any>,
  mainKey: string = '',
): Record<string, string | number | boolean | null | undefined> {
  let newobject = {};
  const keys = Object.keys(obj || {});
  keys.sort();
  keys.forEach(_key => {
    const key = `${mainKey ? `${mainKey}.` : ''}${_key}`;
    const value = obj[_key];
    if (typeof value === 'object') {
      Object.keys(value).forEach(_inlineKey => {
        const _inlineValue = value[_inlineKey];
        if (typeof _inlineValue === 'object') {
          const currentItem = narrowObject(_inlineValue, `${key}.${_inlineKey}`);
          newobject = { ...currentItem, ...newobject };
        } else {
          newobject[`${key}.${_inlineKey}`] = _inlineValue;
        }
      });
    } else {
      newobject[key] = value;
    }
  });

  return newobject;
}

const stringLitArray = <L extends string>(arr: L[]) => arr;

function getKeyByValue(obj, value): string {
  return Object.keys(obj).find(key => obj[key] === value);
}

export { getDisplayName, isUserAdmin, isUserMerchant, narrowObject, stringLitArray, isArray, isObject, getKeyByValue };
