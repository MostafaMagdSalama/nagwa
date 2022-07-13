export const isExistInLocalStorage = (property: string, value: string) => {
    return localStorage.getItem(property) === value ? true : false;
  };