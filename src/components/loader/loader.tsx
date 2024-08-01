import React, { useContext } from 'react';
import { ThemeContext } from '../../App.tsx';

interface Props {
  isLoading: boolean;
}

export default function Loader(props: Props): React.ReactNode {
  const { theme } = useContext(ThemeContext);
  const { isLoading } = props;

  return (
    isLoading && <div className={`loading theme-${theme}`}>Loading...</div>
  );
}
