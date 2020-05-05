import { useState, useDebugValue } from 'react'

export const useStateWithName = (initialValue, name) => {
  const [value, setValue] = useState(initialValue);
  useDebugValue(`${name}: ${value}`);
  return [value, setValue];
}