import React, { useContext } from 'react';
import './loader.scss';
import { ThemeContext } from '../../providers/theme.provider';

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
