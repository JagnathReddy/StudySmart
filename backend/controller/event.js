const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const calendar= require('./calendar');
const db = getFirestore();

exports.createEvent = async (req, res) => {
    console.log("started")
    calendar.addEvent(req,res);
    const eventRef = db.collection('event').doc()
    req.body.event.attendees.push({"email":req.user.email});
    eventRef.set(req.body.event);
    for(let i of req.body.event.attendees) {
        console.log(i)
        const profileRef= db.collection('profile').doc(i.email);
        const event={}
        event[req.body.event.summary]=eventRef.id;
        profileRef.set({event},{merge:true});
    }
    res.send(eventRef.id);

}

exports.getEventById=async (req, res) => {
    const eventRef=db.collection('event').doc(req.params.id)
    
    let eventData=(await eventRef.get())
    if(!eventData.exists){
        res.status(404).send("check event id");
        return
    }
    eventData=eventData.data()
    let userAuthorized=false;
    for(let i of eventData.attendees){
        if(i.email==req.user.email){
            userAuthorized=true;
            break;
        }
    }
    if(userAuthorized==false){
        res.status(401).end();
        return;
    }
    res.send(eventData);
}

exports.getEvent = async (req, res) => {
    calendar.getEvent(req, res);
}


