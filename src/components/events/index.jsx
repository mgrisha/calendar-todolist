import styles from './Events.module.scss';

import EventItem from '../event-item';

export const Events = ({ listEvents }) => {
  return (
    <div className={styles['events']}>
      {
        listEvents.length > 0 && (
          listEvents.map(event => (
            <EventItem title={event.title} key={event.id} id={event.id} />
          ))
        )
      }
    </div>
  )
}
