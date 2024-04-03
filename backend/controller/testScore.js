const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const db = getFirestore();

exports.addScore= async (req, res) => {
    const subjectRef = db.collection(`subject`).doc(req.user.email)
    // console.log(dd.data());
    let nameS=req.body.subject
    let setobj={}
    setobj[nameS]={"score":{}}
    setobj[nameS]["score"]=req.body.score
    subjectRef.set(setobj,{ merge: true })
    res.send(setobj);
}


