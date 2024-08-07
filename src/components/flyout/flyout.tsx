'use client';

import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../providers/theme.provider.tsx';
import { SelectedItemsContext } from '../../providers/selected-items.provider.tsx';

export function Flyout(): React.ReactNode {
  const [url, setUrl] = useState('');
  const { theme } = useContext(ThemeContext);
  const { items, unselectAll } = useContext(SelectedItemsContext);

  useEffect(() => {
    if (items.length) {
      const data: Array<string[]> = [];
      data.push(Object.keys(items[0]));
      items.forEach((item) => data.push(Object.values(item)));
      const csv = data.map((item) => item.join(';')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      setUrl(URL.createObjectURL(blob));
    }
  }, [items]);

  return (
    items.length > 0 && (
      <div className={`flyout theme-${theme}`}>
        <div className="flyout-info">
          <span className="flyout-title">Selected items: </span>
          <span className="flyout-amount">{items.length}</span>
        </div>
        <div className="flyout-controls">
          <a
            className="flyout-controls_download"
            href={url}
            download={`${items.length}_repositories.csv`}
          >
            Download
          </a>
          <button
            className="flyout-controls_unselect"
            type="button"
            onClick={unselectAll}
          >
            Unselect all
          </button>
        </div>
      </div>
    )
  );
}
