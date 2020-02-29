import { BasicQuery } from '../helpers/index';
import Queue from '../utils/queue';

export interface ApiCallContextProviderProps {}

export interface ApiCallContextType {
  fetchIfNotExist: (query: BasicQuery, vars: any) => Promise<any>;
  fetch: (query: BasicQuery, vars: any, staticData?: any) => Promise<any>;
}

export type QueryQueue = Record<string, Queue>;
