type MissingProps<Defaults, Props> = Pick<Props, Exclude<keyof Props, keyof Defaults>>;

// TODO: update this interface
// export type WithDefaultProps<Defaults extends Partial<Props>, Props> = MissingProps<Defaults, Props> &
export type WithDefaultProps<Defaults, Props> = MissingProps<Defaults, Props> &
  // @ts-ignore
  { [P in keyof Defaults]?: P extends keyof Props ? Props[P] : never };
