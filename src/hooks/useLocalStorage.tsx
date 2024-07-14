import { useState } from 'react';

export function useLocalStorage(key: string) {
  const [state, setState] = useState<string>(getDataFromLS);

  function getDataFromLS() {
    return localStorage.getItem(key) || '';
  }

  function updateLocalStorage(value: string) {
    setState(value);
    localStorage.setItem(key, value);
  }

  return { ls: state, updateLocalStorage };
}
