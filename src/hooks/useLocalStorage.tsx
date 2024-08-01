import { useState } from 'react';

export function useLocalStorage(key: string) {
  const [ls, setState] = useState<string>(getDataFromLS);

  function getDataFromLS() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || '';
    }
    return '';
  }

  function updateLocalStorage(value: string) {
    if (typeof window !== 'undefined') {
      setState(value);
      localStorage.setItem(key, value);
    }
  }

  return [ls, updateLocalStorage] as const;
}
