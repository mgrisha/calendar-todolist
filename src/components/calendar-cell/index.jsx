import { useContext } from 'react';

import styles from './CalendarCell.module.scss';
import clsx from 'clsx';

import { Events } from '../events';

import { StoreContext } from '../../context/StoreContext';

const CalendarCell = ({ day, dateTime, eventsToDate, weekday, activeCell }) => {
  const { addEventItemByDate } = useContext(StoreContext);
  return (
    <div className={clsx(styles['calendar-cell'], (activeCell ? styles['active'] : '') )} onClick={() => addEventItemByDate(dateTime)}>
      <div className={styles['calendar-cell__title']}>
        <div>{day}</div>
        <div>{weekday}</div>
      </div>
      <Events listEvents={eventsToDate} />
    </div>
  )
}

export default CalendarCell