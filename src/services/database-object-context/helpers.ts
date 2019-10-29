export interface CrudeDatabaseObject {
  id: string;
}

export interface DatabaseObjectsContextType {
  addOrUpdate: (obj: CrudeDatabaseObject) => void;
  objects: Record<string, CrudeDatabaseObject>;
}
