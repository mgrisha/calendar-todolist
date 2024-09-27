import { useContext } from 'react';

import CalendarCell from '../calendar-cell';
import styles from './Calendar.module.scss';

import { StoreContext } from '../../context/StoreContext';

import { getAllDaysInMonth, returnDateTimeFormat } from '../../utils/functions';

const Calendar = () => {
  const { date, events } = useContext(StoreContext);

  const month = new Date(date).getMonth();
  const year = new Date(date).getFullYear();

  const allDatesInMonth = getAllDaysInMonth(month, year);
  return (
    <div className={styles['calendar']}>
      {
        allDatesInMonth.map((day, index) => {
          const dayNumeric = day.toLocaleDateString('en-US', { day: 'numeric' });
          const weekdayShort = day.toLocaleDateString('en-US', { weekday: 'short' });
          const activeCell = new Date(year, month, dayNumeric).toLocaleDateString() == new Date().toLocaleDateString();
          const eventsToDate = events.filter(event => new Date(event.date).toLocaleDateString() === new Date(year, month, dayNumeric).toLocaleDateString());
          const dt = new Date().toLocaleDateString() === new Date(year, month, dayNumeric).toLocaleDateString() ? new Date() : day;
          const dateTime = returnDateTimeFormat(dt);
          return <CalendarCell day={dayNumeric} weekday={weekdayShort} activeCell={activeCell} key={index} eventsToDate={eventsToDate} dateTime={dateTime} />;
        })
      }
    </div>
  )
}

export default Calendar