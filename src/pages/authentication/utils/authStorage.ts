export const storeToken = (token: string) => {
  if (token.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    sessionStorage.setItem(process.env.REACT_APP_NAME_TOKEN!, token);
  }
};
