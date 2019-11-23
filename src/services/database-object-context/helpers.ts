export interface DatabaseObjectContextProviderProps {}

export interface DatabaseObjectsContextType {
  setObjectsFromBackendResponse: (obj: any) => void;
  getObjects: () => Record<string, any>;
  getObject: (id: string) => any;
}
