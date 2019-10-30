type MissingProps<Defaults, Props> = Pick<Props, Exclude<keyof Props, keyof Defaults>>;

// TODO: update this interface
// export type WithDefaultProps<Defaults extends Partial<Props>, Props> = MissingProps<Defaults, Props> &
export type WithDefaultProps<Defaults, Props> = MissingProps<Defaults, Props> &
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  { [P in keyof Defaults]?: P extends keyof Props ? Props[P] : never };

export type UserRole = 'admin' | 'merchant' | 'customer';

export interface User {
  username: string;
  role: UserRole;
  name: string;
  email: string;
  id: string;
  status?: boolean;
  taxNumber?: string;
}

export type UserType = 'active' | 'passive' | 'all';

export type MaybeArray<T> = T | T[];
