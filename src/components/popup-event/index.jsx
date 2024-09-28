import { useContext, useEffect, useRef } from 'react';
import clsx from 'clsx';
import axios from 'axios';

import { getUID } from '../../utils/functions';

import { StoreContext } from '../../context/StoreContext';

import styles from './PopupEvent.module.scss';

const PopupEvent = () => {
  const { popupEvent, setPopupEvent, eventItem, setEventItem, events, setEvents } = useContext(StoreContext);
  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setPopupEvent(false);
    }
  };

  const handleClosePopup = () => {
    setEventItem({
      id: '',
      title: '',
      description: '',
      date: ''
    });
    setPopupEvent(false);
  }

  useEffect(() => {
    if (popupEvent) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [popupEvent]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const classError = styles['error'];
    const title = e.target.title;
    const description = e.target.description;
    const date = e.target.date;
    const editId = e.target.id.value;
    const id = getUID();
    if (title.value.length === 0 || date.value.length === 0) {
      if (title.value.length === 0) {
        title.classList.add(classError);
      }
      if (date.value.length === 0) {
        date.classList.add(classError);
      }
      return false;
    }

    let newEvents = [];
    if (editId.length) {
      const findItem = events.find(event => event.id === editId);
      const findIndex = events.findIndex(event => event.id === editId);
      findItem.title = title.value;
      findItem.description = description.value;
      findItem.date = date.value;
      const tempEvents = [...events];
      tempEvents[findIndex] = findItem;
      newEvents = tempEvents;
      await axios.put(`http://localhost:7000/todoList/${editId}`, findItem, {
        headers: { 'Content-Type': 'application/json' }
      });
    } else {
      const newItem = {
        id,
        title: title.value,
        description: description.value,
        date: date.value
      }
      await axios.post('http://localhost:7000/todoList', newItem, {
        headers: { 'Content-Type': 'application/json' }
      });
      newEvents = [...events, newItem];
    }
    
    setEvents(newEvents);
    setEventItem({
      id: '',
      title: '',
      description: '',
      date: ''
    });
    setPopupEvent(false);
  }

  const handleChangeInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    const classError = styles['error'];
    if (value.length > 0 && e.target.classList.contains(classError)) {
      e.target.classList.remove(classError);
    }
    setEventItem({
      ...eventItem,
      [name]: value
    });
  }

  return (
    <div className={clsx(styles['popup-event__overlay'], (popupEvent && styles['active']))} id="popupOverlay">
      <div className={styles['popup-event']} id="popup" ref={popupRef}>
        
        <div className={styles['popup-event__content']}>
          <div className={styles['content']}>
            <div className={styles['content-title']}>Add new item idea</div>
            <span className={styles['popup-event__close']} id="closePopup" onClick={handleClosePopup}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16"><path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/></svg>
            </span>
          </div>
          <form className={styles['popup-event__form']} onSubmit={handleFormSubmit} id="event-form">
            <div className={styles['form-item']}>
              <label htmlFor="event-title" className={styles['form-item__label']}>Title <sup>*</sup></label>
              <input className={styles['form-item__input']} name="title" type="text" placeholder="Title goes here" id="event-title" value={eventItem.title} onChange={handleChangeInput} />
            </div>
            <div className={styles['form-item']}>
              <label htmlFor="event-description" className={styles['form-item__label']}>Description</label>
              <textarea className={styles['form-item__textarea']} row="5" id="event-description" name="description" value={eventItem.description} onChange={handleChangeInput}></textarea>
            </div>
            <div className={styles['form-item']}>
              <label htmlFor="event-date" className={styles['form-item__label']}>Date <sup>*</sup></label>
              <input type="datetime-local" className={styles['form-item__input']} name="date" id="event-date" onChange={handleChangeInput} value={eventItem.date} />
            </div>
            <input type="hidden" name="id" value={eventItem.id} />
            <button className={styles['form-item__button']}>SAVE</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PopupEvent