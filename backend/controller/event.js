const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const { getStorage, getDownloadURL } = require('firebase-admin/storage');

const calendar= require('./calendar');
const multer = require('multer'); 
const { storage } = require('firebase-admin');
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

exports.uploadFile= async (req, res)=>{
    try {
        const fileBuffer = Buffer.from(req.body.documentBase64.toString(), 'base64'); 
        const bucket = storage().bucket();
        
        // Generate a unique filename (you can customize this)
        const filename = `pdf_${req.body.key}.pdf`;
        
        // Upload the file to Firebase Storage
        await bucket.file(filename).save(fileBuffer,
            {
                contentType: "application/pdf"
            },
        );
        
        
        // Get the public URL of the uploaded file
        const fileUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
        const downloadURL= await getDownloadURL(bucket.file(filename));
        // Respond with the file URL
        res.status(200).json({ url: downloadURL});
    } catch (error) {
        console.error('Error uploading PDF:', error);
        res.status(500).json({ error: 'Failed to upload PDF' });
    }

}


