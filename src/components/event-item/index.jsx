import { useContext } from 'react';

import styles from './EventItem.module.scss';

import { StoreContext } from '../../context/StoreContext';

const EventItem = ({ title, id }) => {
  const { deleteEvent, editEventItem } = useContext(StoreContext);

  return (
    <div className={styles['event-item']}>
      <div className={styles['event-item__title']} onClick={(e) => editEventItem(e, id)}>{title}</div>
      <div className={styles['event-item__delete']} onClick={() => deleteEvent(id)}>&times;</div>
    </div>
  )
}

export default EventItem;
