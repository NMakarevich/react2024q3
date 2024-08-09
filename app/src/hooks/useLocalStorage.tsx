import { useState } from 'react';

export function useLocalStorage(key: string) {
  const [ls, setState] = useState<string>(getDataFromLS);

  function getDataFromLS() {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || '';
    }
  }

  function updateLocalStorage(value: string) {
    setState(value);
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  return [ls, updateLocalStorage] as const;
}
