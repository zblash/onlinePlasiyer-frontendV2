/* eslint-disable @typescript-eslint/no-explicit-any */
import { IUserCommonResponse, UserRoleResponse } from '~/services/helpers';

export function makeid(length: number) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
}
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

function getDisplayName(WrappedComponent: any): string {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

function isUserAdmin(user: IUserCommonResponse) {
  if (user) {
    return user.role === 'ADMIN';
  }

  return false;
}

function isUserCustomer(user: IUserCommonResponse) {
  if (user) {
    return user.role === 'CUSTOMER';
  }

  return false;
}

function isUserMerchant(user: IUserCommonResponse) {
  if (user) {
    return user.role === 'MERCHANT';
  }

  return false;
}

function isPublicRole(role: UserRoleResponse) {
  return role === 'MERCHANT' || role === 'CUSTOMER';
}

function narrowObject(obj: Record<string, any>): Record<string, string | number | boolean | null | undefined> {
  const newobject = {};
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (isObject(value) || isArray(value)) {
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
