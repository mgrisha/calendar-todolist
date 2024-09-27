import { useRef, useContext } from 'react';
import styles from './Header.module.scss';

import { StoreContext } from '../../context/StoreContext';

import { returnNewDateFormat } from '../../utils/functions';

const Header = () => {
  const dateInputRef = useRef(null);
  const { date, setDate, setPopupEvent } = useContext(StoreContext);

  const handleButtonClick = () => {
    dateInputRef.current.showPicker();
  };

  const handleChangeDate = (e) => {
    setDate(e.target.value);
    localStorage.setItem('date', e.target.value);
  }

  const handleClickPrevMonth = () => {
    let tempDate = new Date(date);
    tempDate.setMonth(tempDate.getMonth() - 1);
    const newDate = returnNewDateFormat(tempDate);
    setDate(newDate);
    localStorage.setItem('date', newDate);
  }

  const handleClickNextMonth = () => {
    let tempDate = new Date(date);
    tempDate.setMonth(tempDate.getMonth() + 1);
    const newDate = returnNewDateFormat(tempDate);
    setDate(newDate);
    localStorage.setItem('date', newDate);
  }

  const handleClickPopup = () => {
    setPopupEvent(true);
  }

  return (
    <div className={styles['header']}>
      <div className={styles['header-add-event']} onClick={handleClickPopup}>
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/></svg>
      </div>
      <div className={styles['header-calendar']}>
        <div className={styles['header-calendar__month-year']}>
          <div className={styles['month-year__prev']} onClick={handleClickPrevMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16"><path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/></svg>
          </div>
          <div className={styles['month-year__text']}>{new Date(date).toLocaleDateString('en-US', { month: 'long' })} {new Date(date).getFullYear()}</div>
          <div className={styles['month-year__next']} onClick={handleClickNextMonth}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16"><path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/></svg>
          </div>
        </div>
        <div className={styles['header-calendar__datepicker']}>
          <div onClick={handleButtonClick}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar" viewBox="0 0 16 16"><path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"/></svg>
          </div>
          <input type="month" value={date} ref={dateInputRef} onChange={handleChangeDate} />
        </div>
      </div>
    </div>
  )
}

export default Header;