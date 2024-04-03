const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');

const db = getFirestore();
exports.getProfile = async (req, res) => {
    const profileRef = db.collection('profile').doc(req.user.email);
    let doc = await profileRef.get()
    if (!doc.exists) {
        await createProfile(req)
        doc = await profileRef.get()
        res.send(doc.data().friend)
    } else
        res.send(doc.data())
}
exports.getFriend = async (req, res) => {
    const profileRef = db.collection('profile').doc(req.user.email);
    let doc = await profileRef.get()
    if (!doc.exists) {
        await createProfile(req)
        doc = await profileRef.get()
        res.send(doc.data().friend)
    } else
        res.send(doc.data().friend)
}
exports.addFriend= async (req, res) => {
    const profileRef = db.collection('profile').doc(req.user.email);
    let doc = await profileRef.get()
    let friendList=[]
    for( let i in doc.data().friend){
        friendList.push(doc.data().friend[i])
    }
    friendList.push(req.body.friendTo);
    console.log(friendList);
    profileRef.set({friend:friendList},{ merge: true })
    res.send(friendList);
}
async function createProfile(req) {
    const profileRef = db.collection('profile').doc(req.user.email);
    const user = {}
    user.name = req.user.displayName
    user.email = req.user.email
    user.photoURL = req.user.photoURL
    const result = await profileRef.set(user)
    return result
}