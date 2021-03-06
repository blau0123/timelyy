import axios from 'axios';

import {JOIN_TEAM, GET_TEAMS_WITH_PROMPT, GET_TEAM_WITH_ID, GET_ALL_TEAMS, EDIT_TEAM,
            ADD_TODO_TO_TEAM, COMPLETE_TODO, DELETE_TODO, EDIT_TODO,
            ADD_CHAT_MSG, CHANGE_VIEWS,
            GET_CHAT_HISTORY} from './types';

// action for a given user joining a given team
export const joinTeam = (userData, teamData) => dispatch => {
    const joinData = {userData, teamData}
    console.log(joinData);
    axios.post('/teams/join', joinData)
        .then(res => {
            alert(res.data);
            dispatch({
                type: JOIN_TEAM,
                payload: res.data
            });
        })
        .catch(err => console.log(err));
}

// action for creating a team by a user
/*
TODO: DISPATCH
*/
export const createTeam = (team, history) => dispatch => {
    // submit team into the database and go back to team page
    axios.post('/teams/add', team)
        .then(res => {
            console.log(res.data)
            history.push('/');
        })
        .catch(err => console.log(err));
}

// action to get all teams given a search prompt
export const searchTeamWithPrompt = (prompt) => dispatch => {
    // get all teams first
    axios.get('/teams/')
        .then(res => {
            let match = [];
            // go through all team names to check if matches the prompt
            for (let i = 0; i < res.data.length; i++){
                const teamName = res.data[i].teamName;
                const newTeamName = teamName.slice(0, prompt.length).toLowerCase();
                const newPrompt = prompt.toLowerCase();

                // if the team matches, then add it to the match array to be returned
                if (newTeamName === newPrompt){
                    match.push(res.data[i])
                }
            }
            // send match to reducer to update the state of TeamSearch component
            dispatch({
                type: GET_TEAMS_WITH_PROMPT,
                payload: match,
            })
        })
        .catch(err => console.log(err));
}

// get a team with the specific id
export const getTeamWithId = (id) => dispatch => {
    // make get request to get a specific team
    axios.get(`/teams/${id}`)
        .then(res => {
            // dispatch team to reducer to set the currteam state
            dispatch({
                type: GET_TEAM_WITH_ID,
                payload: res.data,
            })
        })
        .catch(err => console.log(err));
}

// get all teams
export const getAllTeams = () => dispatch => {
    axios.get('/teams/')
        .then(res => {
            const listOfAllTeams = res.data;
            dispatch({
                type: GET_ALL_TEAMS,
                payload: listOfAllTeams,
            })
        })
        .catch(err => console.log(err))
}

// edit a specific team
export const editTeam = (teamData) => dispatch => {
    axios.post(`/teams/update/${teamData.teamId}`, teamData)
        .then(res => {
            console.log(res);
            dispatch({
                type: EDIT_TEAM,
                payload: res.data,
            })
        })
        .catch(err => console.log(err));
}

// add new todo to a given team
export const addTodoToTeam = (teamData, todoData) => dispatch => {
    axios.post('/teams/addtodo', {teamData, todoData})
        .then(res => {
            console.log(res);
            dispatch({
                type: ADD_TODO_TO_TEAM,
                payload: res.data,
            })
        })
        .catch(err => console.log(err))
}

// complete a given team's todo
export const completeTeamTodo = (teamData, todoData) => dispatch => {
    axios.post('/teams/completetodo', {teamData, todoData})
        .then(res => {
            console.log(res);
            dispatch({
                type: COMPLETE_TODO,
                payload: res.data,
            })
        })
        .catch(err => console.log(err));
}

// delete a todo
export const deleteTeamTodo = (teamData, todoData) => dispatch => {
    axios.post('/teams/deletetodo', {teamData, todoData})
        .then(res => {
            console.log(res);
            
            dispatch({
                type: DELETE_TODO,
                payload: {},
            })
        })
}

// edit a todo
export const updateTeamTodo = (teamData, todoData) => dispatch => {
    console.log(todoData);
    axios.post('/teams/updatetodo', {teamData, todoData})
        .then(res => {
            console.log(res);
            dispatch({
                type: EDIT_TODO,
                payload: res.data,
            })
        })
        .catch(err => console.log(err))
}

// add a chat message
export const addChatMsg = (teamData, chatData) => dispatch => {
    axios.post('/teams/chat/add', {teamData, chatData})
        .then(res => {
            dispatch({
                type: ADD_CHAT_MSG,
                payload: res.data,
            })
        })
        .catch(err => console.log(err));
}

// get chat history
export const getChatHistory = (teamData) => dispatch => {
    axios.get(`http://localhost:5000/teams/chat/${teamData._id}`)
        .then(res => {
            dispatch({
                type: GET_CHAT_HISTORY,
                payload: res.data,
            })
        })
}

export const changeCurrView = newView => dispatch => {
    dispatch({
        type: CHANGE_VIEWS,
        payload: newView,
    })
}