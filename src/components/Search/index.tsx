import React from 'react';
import debounce from 'lodash.debounce';
import styles from './Search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  const onClickClear = () => {
    dispatch(setSearchValue(''));
    setValue('');
    inputRef.current?.focus();
  };

  const upDateSearchValue = React.useCallback(
    debounce((str: any) => {
      dispatch(setSearchValue(str));
    }, 150),
    [],
  );

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    upDateSearchValue(event.target.value);
  };

  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className={styles.inp}
        type="text"
        placeholder="Поиск пиццы..."
      />
      {value && (
        <img
          onClick={onClickClear}
          className={styles.clearIcon}
          src={
            'https://cdn.icon-icons.com/icons2/1993/PNG/512/cancel_close_delete_exit_logout_remove_x_icon_123217.png'
          }
          alt=""
        />
      )}
    </div>
  );
};

export default Search;
