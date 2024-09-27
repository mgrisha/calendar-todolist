import { useContext } from 'react'

import './App.scss'
import Calendar from './components/calendar'
import Header from './components/header'
import PopupEvent from './components/popup-event'

import { StoreContext } from './context/StoreContext';

import { getAllDaysInMonth } from './utils/functions'

function App() {
  const { popupEvent, date } = useContext(StoreContext);
  const month = new Date(date).getMonth();
  const year = new Date(date).getFullYear();
  const allDatesInMonth = getAllDaysInMonth(month, year);
  return (
    <div className="calendar-app">
      <Header />
      <Calendar allDaysMonth={allDatesInMonth} />
      {
        popupEvent && <PopupEvent />
      }
    </div>
  )
}

export default App
