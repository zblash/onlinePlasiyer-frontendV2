import { UserCommonResponse, UserRoleResponse } from '~/__types';

const isArray = (o: any) => Array.isArray(o);
const isObject = (o: any) => !isArray(o) && typeof o === 'object' && o !== null && o !== undefined;

function objectKeys<K extends string>(obj: Record<K, any>): K[] {
  return Object.keys(obj) as K[];
}
function isBarcodeCorrectSize(barcode: string) {
  return barcode.length > 12 && barcode.length < 100;
}

function objectValues<K>(obj: Record<string, K>): K[] {
  return Object.keys(obj).map(_key => obj[_key]) as K[];
}

function getDisplayName(WrappedComponent): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function isUserAdmin(user: UserCommonResponse) {
  if (user) {
    return user.role === 'ADMIN';
  }

  return false;
}

function isUserCustomer(user: UserCommonResponse) {
  if (user) {
    return user.role === 'CUSTOMER';
  }

  return false;
}

function isUserMerchant(user: UserCommonResponse) {
  if (user) {
    return user.role === 'MERCHANT';
  }

  return false;
}

function isPublicRole(role: UserRoleResponse) {
  return role === 'MERCHANT' || role === 'CUSTOMER';
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
    if (isObject(value) || isArray(value)) {
      Object.keys(value).forEach(_inlineKey => {
        const _inlineValue = value[_inlineKey];
        if (isObject(_inlineValue) || isArray(_inlineValue)) {
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

export {
  getDisplayName,
  isUserAdmin,
  isUserMerchant,
  narrowObject,
  stringLitArray,
  isArray,
  isObject,
  getKeyByValue,
  isPublicRole,
  objectKeys,
  objectValues,
  isBarcodeCorrectSize,
  isUserCustomer,
};
