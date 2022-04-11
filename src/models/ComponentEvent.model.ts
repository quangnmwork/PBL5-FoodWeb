export interface ComponentEvent<T extends HTMLElement> {
  onClick: (e: React.SyntheticEvent<T>) => void | Promise<void>;
}
