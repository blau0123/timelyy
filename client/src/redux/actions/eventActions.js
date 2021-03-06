import axios from 'axios';
import {ADD_EVENT_TO_TEAM, DELETE_EVENT, UPDATE_EVENT} from './types';

// add a note to the notes list for a given team
export const addEventToTeam = (teamData, eventData, callback) => dispatch => {
    axios.post('/events/add', {teamData, eventData})
        .then(res1 => {
            console.log(res1);
            // add note's objectid to team's notes
            const eventId = res1.data._id;

            axios.post('/teams/addevent', {teamData, eventId})
                .then(res2 => {
                    console.log(res2);
                    
                    // updates the state with the newest note added
                    dispatch({
                        type: ADD_EVENT_TO_TEAM,
                        payload: res1.data,
                    })

                    callback();
                })
                
        })
        .catch(err => console.log(err))
}

// delete event
export const deleteEvent = (eventData, teamData) => dispatch => {
    // delete event from team's event list of objid's first
    axios.post('/teams/deleteevent', {eventData, teamData})
        .then(res => {
            console.log(res);
            axios.post('/events/delete', {eventData})
            .then(res => {
                console.log(res);
                // dispatch null payload to refresh upon deletion
                dispatch({
                    type: DELETE_EVENT,
                    payload: null,
                })
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

// updates a given event
export const updateEvent = (eventData) => dispatch => {
    axios.post('/events/update', {eventData})
        .then(res => {
            console.log(res);
            dispatch({
                type: UPDATE_EVENT,
                payload: eventData,
            })
        })
        .catch(err => console.log('error!! ' + err))
}