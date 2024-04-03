

const { getAuth, Auth } = require('firebase-admin/auth')
const { auth } = require('firebase-admin')
// idToken comes from the client app

exports.auth = function (req, res, next) {
    getAuth()
        .verifyIdToken(req.headers.tokenid)
        .then((decodedToken) => {
            const uid = decodedToken.uid;
            auth().getUser(uid).then((user) => {
                req.user=user;
                next();
            })
        })
        .catch((error) => {
            res.send(error)
        });
}
