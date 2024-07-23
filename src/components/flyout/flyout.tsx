import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectItems,
  selectItemsAmount,
} from '../../redux/slices/selected-items.slice.ts';
import './flyout.scss';
import { AppDispatch } from '../../redux/store.ts';
import { unselectAll } from '../../redux/slices/selected-items.slice.ts';
import { ThemeContext } from '../../App.tsx';

export function Flyout(): React.ReactNode {
  const [url, setUrl] = useState('');
  const selectedItemsAmount = useSelector(selectItemsAmount);
  const selectedItems = useSelector(selectItems);
  const dispatch: AppDispatch = useDispatch();
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (selectedItems.length) {
      const data: Array<string[]> = [];
      data.push(Object.keys(selectedItems[0]));
      selectedItems.forEach((item) => data.push(Object.values(item)));
      const csv = data.map((item) => item.join(';')).join('\n');
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      setUrl(URL.createObjectURL(blob));
    }
  }, [selectedItems]);

  function unselectAllItems() {
    dispatch(unselectAll());
  }

  return (
    selectedItemsAmount > 0 && (
      <div className={`flyout theme-${theme}`}>
        <div className="flyout-info">
          <span className="flyout-title">Selected items: </span>
          <span className="flyout-amount">{selectedItemsAmount}</span>
        </div>
        <div className="flyout-controls">
          <a
            className="flyout-controls_download"
            href={url}
            download="file.csv"
          >
            Download
          </a>
          <button
            className="flyout-controls_unselect"
            type="button"
            onClick={unselectAllItems}
          >
            Unselect all
          </button>
        </div>
      </div>
    )
  );
}
