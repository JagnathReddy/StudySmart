const axios = require('axios');

const urls = {
  "newEvent": "https://www.googleapis.com/calendar/v3/calendars/primary/events",
  "getEvent": "https://www.googleapis.com/calendar/v3/calendars/primary/events/events?orderBy=startTime"
}


async function addEvent(req, res) {
  const headers = {
    Authorization: `Bearer ${req.body.token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'MyApp/1.0'
  };
  try {

    let response = await axios
      .post(urls.newEvent, req.body.event, { headers })
    // console.log(response.data)
    // return response.data.htmlLink;
  } catch (error) {
    res.send(error)
  }

}
function getEvent(req,res){
  const headers = {
    Authorization: `Bearer ${req.body.token}`,
    'Content-Type': 'application/json',
    'User-Agent': 'MyApp/1.0'
  };
  
  axios
    .get(urls.newEvent,{ headers })
    .then((response) => {
      console.log(response)
      res.send(response.data);
    })
    .catch((error) => {
      console.log(error)
      res.send(error)
    });

}
exports.addEvent = addEvent;
exports.getEvent = getEvent;