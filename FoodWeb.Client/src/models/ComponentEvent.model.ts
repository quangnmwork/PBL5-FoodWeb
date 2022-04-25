/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ComponentEvent<T extends HTMLElement> {
  onClick: (
    e?: React.SyntheticEvent<T>,
    ...params: any[]
  ) => void | Promise<void>;
}
