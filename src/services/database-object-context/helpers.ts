export interface DatabaseObjectContextProviderProps {}

export interface DatabaseObjectsContextType {
  setObjectsFromBackendResponse: (obj: any) => void;
  objects: Record<string, any>;
}
