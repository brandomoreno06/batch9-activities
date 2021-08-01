// import axios from 'axios';





// export const getTournaments = () => {
//     const headers = {
//         'Authorization-Type': 'v1',
//         'Authorization': //YOUR API KEY,
//         'Content-Type': 'application/vnd.api+json',
//         'Accept': 'application/json'
//     }
//      //GET TOURNAMENTS
//     axios({
//         url: "https://api.challonge.com/v2/tournaments.json",
//         method: "GET",
//         data: {},
//         headers: headers,
//         })
//     .then((response) => {
//         console.log('tournaments:', response.data?.data)
//         // setTournaments(response.data?.data)
//     })
//     .catch((error) => { console.error(error) })
// }



// const apiRequests = () => {

//     const headers = {
//         'Authorization-Type': 'v1',
//         'Authorization': //YOUR API KEY,
//         'Content-Type': 'application/vnd.api+json',
//         'Accept': 'application/json'
//     }

//         const data = {
//         "data": {
//         "id": "test__tournament__id",
//         "type": "tournament",
//         "attributes": {
//             "name": "[Test 3] Tournament Name",
//             "url": "test__url",
//             "tournament_type": "single elimination",
//             "private": true,
//             "starts_at": "29/07/2021 12:00:00",
//             "description": "test description",
//             "notifications": {
//             "upon_matches_open": true,
//             "upon_tournament_ends": true
//             },
//             "match_options": {
//             "third_place_match": true,
//             "accept_attachments": false
//             },
//             "registration_options": {
//             "open_signup": false,
//             "signup_cap": 4,
//             "check_in_duration": 15
//             },
//             "seeding_options": {
//             "hide_seeds": false,
//             "sequential_pairings": false
//             },
//             "double_elimination_options": {
//             "split_participants": false,
//             "grand_finals_modifier": ""
//             },
//             "round_robin_options": {
//             "iterations": 2,
//             "ranking": "",
//             "pts_for_game_win": 1,
//             "pts_for_game_tie": 0,
//             "pts_for_match_win": 1,
//             "pts_for_match_tie": 0.5
//             },
//             "swiss_options": {
//             "rounds": 2,
//             "pts_for_game_win": 1,
//             "pts_for_game_tie": 0,
//             "pts_for_match_win": 1,
//             "pts_for_match_tie": 0.5
//             },
//             "free_for_all_options": {
//             "max_participants": 4
//             }
//         }
//         }
//         }
    

        //CREATE TOURNAMENT
        // axios({
        //   url: "https://api.challonge.com/v2/tournaments.json",
        //   method: "POST",
        //   data: data,
        //   headers: headers,
        // }).then((response) => {
        //   console.log('tournaments:', response.data?.data)
        //   // setTournaments(response.data?.data)
        // })
        // .catch((error) => { console.error(error) })




        //DELETE TOURNAMENT
        // axios({
        //   url: "https://api.challonge.com/v2/tournaments/test__url.json",
        //   method: "DELETE",
        //   data: {},
        //   headers: headers,
        // })
        // .then((response) => {
        //   console.log(response)
        // })



        //CREATE PARTICIPANT

        // const dataParticipant = {
        //   "data": {
        //     "type": "participant",
        //     "attributes": {
        //       "seed": 1,
        //       "misc": "",
        //       "name": "avion5",
        //       "email":"avion4@test.email",
        //       "username": "avion06",
        //     }
        //   }
        // }

        //   axios({
        //     url: "https://api.challonge.com/v2/tournaments/r6siege_tournament_xxx/participants.json",
        //     method: "POST",
        //     data: dataParticipant,
        //     headers: headers,
        //   })
        //   .then((response) => {
        //     console.log('data:', response.data?.data)
        //   })
        //   .catch((error) => { console.error(error) })



        // GET PARTICIPANT 

        // axios({
        //   url: "https://api.challonge.com/v2/tournaments/test__url/participants.json",
        //   data: {},
        //   method: "GET",
        //   headers: headers,
        // })
        // .then((response) => {
        //   console.log('data:', response.data?.data)
        // })
        // .catch((error) => { console.error(error) })



        //FIND TOURNAMENTS A PARTICIPANT IS INCLUDED:
        //TOURNAMENTS > FIND USER

        //SHOW A PARTICIPANT
    //   axios({
    //     url: "https://api.challonge.com/v2/tournaments/test__url/participants/151460349.json",
    //     method: "GET",
    //     data: {},
    //     headers: headers,
    //   })
    //   .then((response) => {
    //     console.log('data:', response.data?.data)
    //   })
    //   .catch((error) => {console.log("NO PARTICIPANT")})

// }

// export default apiRequests;