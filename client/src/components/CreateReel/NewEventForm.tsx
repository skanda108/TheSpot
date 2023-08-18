  /* eslint-disable @typescript-eslint/no-explicit-any */
  import * as React from 'react';
  import { useState } from "react";
  import axios from 'axios';

  type Props = {
    user: {
      id: number;
      username: string;
      displayName: string;
      type: string;
      geolocation: string; // i.e. "29.947126049254177, -90.18719199978266"
      mapIcon: string;
      birthday: string;
      privacy: string;
      accessibility: string;
      email: string;
      picture: string;
      googleId: string;
    },
    mustCreateEvent: boolean,
    updateMustCreateEvent: () => void,
    updateEventId: (newId: number) => void
    // eventName: string,
    // eventDate: string,
    // eventTime: string,
    // twentyOne: boolean
  }

  const NewEventForm: React.FC<Props> = ({user, mustCreateEvent, updateMustCreateEvent, updateEventId}) => {

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [twentyOne, setTwentyOne] = useState(false);

  //weeeeee

// handle input for new event name
const handleEventName = (e: any) => {
  setEventName(e.target.value);

}
// handle input for new event date
const handleEventDate = (e: any) => {
  setEventDate(e.target.value)
}

// handle input for new event time
const handleEventTime = (e: any) => {
  setEventTime(e.target.value)
}

// handle changing to 21 +
const handleTwentyOne = () => {
  if (!twentyOne) {
    setTwentyOne(true)
  } else {
    setTwentyOne(false)
  }
}

// ADD LOGIC TO PREVENT POSTING IF EVENT IS ALREADY HERE
// ADD WAY OF NOTIFYING USER THAT EVENT CREATION WAS SUCCESSFUL
// patch request to update event in la database
const createEvent = () => {
  axios.post('/events/create', {
    name: eventName,
    date: `${eventDate} ${eventTime}`,
    geolocation: user.geolocation,
    twenty_one: twentyOne
  })
  .then((res) => {
    updateEventId(res.data.event.id)
    updateMustCreateEvent();
  })
  .catch((err) => {
    console.error('Failed to axios POST event: ', err)
  })
}

console.log(`${eventDate} ${eventTime}`, '<----date and time')

    return (
      <div
        id='event-form'
        className='popUpEventForm'
        >
          <label
          htmlFor='eventName'>
          Event name:
          </label>
          <br></br>
          <input
          id='eventName'
          value={eventName}
          onChange={handleEventName}
          type='text'>
          </input>
          <br></br>
          <label
          htmlFor='eventDate'>
            Date and time:
          </label>
          <br></br>
          <input
          id='eventDate'
          value={eventDate}
          onChange={handleEventDate}
          type="date">
          </input>
          <br></br>
          <label
          htmlFor='eventTime'>
            Time:
          </label>
          <br></br>
          <input
          id='eventTime'
          value={eventTime}
          onChange={handleEventTime}
          type='time'>
          </input>
          <br></br>
          <label
          htmlFor='twentyOne'>
          21+
          </label>
          <br></br>
          <input
          id='twentyOne'
          type='checkbox'
          checked={twentyOne}
          onChange={handleTwentyOne}>
          </input>
          <br></br>
          <button
          type='submit'
          onClick={createEvent}>
            Save
          </button>
      </div>
    )
  };

  export default NewEventForm;
