/* eslint-disable @typescript-eslint/no-non-null-assertion */
class clientStorage {
  private static _clientStorage: clientStorage;
  public static getClientStorage() {
    if (!clientStorage._clientStorage) {
      clientStorage._clientStorage = new clientStorage();
    }
    return clientStorage._clientStorage;
  }
  getToken() {
    return localStorage.getItem(process.env.REACT_APP_NAME_TOKEN!);
  }
  setToken(token: string) {
    localStorage.setItem(process.env.REACT_APP_NAME_TOKEN!, `Bearer ${token}`);
  }
  clearToken() {
    localStorage.removeItem(process.env.REACT_APP_NAME_TOKEN!);
  }
}
export default clientStorage;
