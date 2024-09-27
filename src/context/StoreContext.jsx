import { useEffect, useState, createContext, useMemo } from 'react';

import { returnNewDateFormat } from '../utils/functions';

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [date, setDate] = useState('');
  const [popupEvent, setPopupEvent] = useState(false);
  const [events, setEvents] = useState([]);
  const [eventItem, setEventItem] = useState({
    id: '',
    title: '',
    description: '',
    date: ''
  });
  const d = new Date();
  const fullYearMonth = returnNewDateFormat(d);

  useEffect(() => {
    const localStorageDate = localStorage.getItem('date') || fullYearMonth;

    setDate(localStorageDate);
  }, []);

  const deleteEvent = (id) => {
    setEvents(prevEvent => prevEvent.filter(event => event.id !== id))
  }

  const editEventItem = (e, id) => {
    e.stopPropagation();
    const findItem = events.find(event => event.id === id);
    setEventItem(findItem);
    setPopupEvent(true);
  }

  const addEventItemByDate = (date) => {
    setEventItem({
      id: '',
      title: '',
      description: '',
      date
    });
    setPopupEvent(true);
  }

  const contextValue = useMemo(
    () => ({
      date,
      setDate,
      popupEvent,
      setPopupEvent,
      events,
      setEvents,
      eventItem,
      setEventItem,
      deleteEvent,
      editEventItem,
      addEventItemByDate
    }),
    [
      date,
      setDate,
      popupEvent,
      setPopupEvent,
      events,
      setEvents,
      eventItem,
      setEventItem,
      deleteEvent,
      editEventItem,
      addEventItemByDate
    ]
  )

  return (
    <StoreContext.Provider value={contextValue}>{props.children}</StoreContext.Provider>
  )
}

export default StoreContextProvider;