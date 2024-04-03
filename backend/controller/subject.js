const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const db = getFirestore();

exports.addSubject= async (req, res) => {
    const subjectRef = db.collection('subject').doc(req.user.email);
    console.log(req.body.subject)
    let name=req.body.subject.name
    console.log(name)
    let obj={}
    obj[name]=req.body.subject
    subjectRef.set(obj,{ merge: true })
    res.send(obj);
}

exports.getAllSubject= async (req, res) => {
    const subjectRef = db.collection('subject').doc(req.user.email);
    const obj=await subjectRef.get()
    res.send(obj.data());
}
exports.getAllSubject= async (req, res) => {
    const subjectRef = db.collection('subject').doc(req.user.email)
    const obj=await subjectRef.get()
    res.send(obj.data());
}

