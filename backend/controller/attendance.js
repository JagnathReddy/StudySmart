const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const db = getFirestore();

exports.addAttendance = async (req, res) => {
    const subjectRef = db.collection(`subject`).doc(req.user.email)
    // console.log(req.body)
    let requests = []
    let dateObj={}
    dateObj[req.body.date]=true
    
    for (let i of req.body.attendance) {
        let nameS = i
        let setobj = {}
        setobj[nameS] = { "attendance": {} }
        setobj[nameS]["attendance"] = {}
        setobj[nameS]["attendance"][req.body.date] = true;
        console.log(setobj)
        subjectRef.set(setobj, { merge: true })
    }
    res.send("done");
}


