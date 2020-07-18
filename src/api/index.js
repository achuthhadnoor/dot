import app from "firebase/app";
import { firebaseConfig } from "./../constants";
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";

class Api {
    constructor() {
        if (app.apps.length === 0) {
            app.initializeApp(firebaseConfig);
            this.auth = app.auth();
            this.db = app.database()
            this.store = app.firestore()
            this.user = {};
            this.workspaces = [];
            this.selected_workspace = {};
            this.selected_snippets = {};
        }
    }

    init = (dispatch) => {
        return new Promise((res, rej) => {
            let userID = localStorage.getItem('authedUser');
            if (userID) {
                this.getUserInfo(userID).then(u => {
                    dispatch({ type: 'UPDATE_USER', user: u });
                }).catch(e => {
                    rej(e);
                })
            }
        })

    }

    login = (dispatch) => {
        return new Promise((resolve, reject) => {
            var provider = new app.auth.GithubAuthProvider();
            this.auth.signInWithPopup(provider).then((result) => {
                let { user } = result
                this.db.ref('/users/' + user.uid).once('value').then(snap => {
                    if (snap.val()) {
                        return this.getUserInfo(user.uid).then(u => {
                            localStorage.setItem('authedUser', u.uid);
                            this.init(dispatch);
                            return resolve(u)
                        })
                    }
                    return this.createuser(user.uid, result).then(u => {
                        localStorage.setItem('authedUser', u.uid);
                        this.init(dispatch);
                        return resolve(u);
                    })
                })
            }).catch(function (error) {
                var errorCode = error.code;
                localStorage.clear();
                reject(errorCode)
            });
        });
    }

    signOut = () => {
        localStorage.clear();
        return this.auth.signOut();
    }

    createuser = (uid, result) => {
        return new Promise((resolve, reject) => {
            const user = this.auth.currentUser
            this.user = {
                uid: user.uid,
                name: user.displayName || 'untitled',
                email: user.email,
                verified: user.emailVerified,
                photoURL: user.photoURL,
                createdOn: user.metadata.creationTime,
                lastLogin: user.metadata.lastSignInTime,
                onboard: true,
                theme: 'blaze',
                accessToken: result.credential.accessToken,
                lastPath: '/',
                selectedWorkspace: uid,
                workspaces: {
                    [uid]: {
                        id: uid,
                        title: user.displayName ? `${user.displayName}-workspace` : `untitled-workspace'`,
                        members: [{ uid: user.uid, access: 'OWNER' }],
                        private: true
                    }
                }
            }
            this.db.ref('users/' + uid).set(this.user);
            this.store.collection('/workspaces/').doc(uid).set({
                title: 'Personal space',
                createdOn: user.metadata.creationTime,
                lastUpdatedOn: user.metadata.creationTime,
                members: [{
                    id: user.displayName + '-workspace',
                    role: 'OWNER',
                    private: true
                }]
            })
            resolve(this.user)
        })
    }

    getUserInfo = (uid) => {
        return new Promise(async (resolve, reject) => {
            app.database().ref('users/' + uid).once('value').then(snapshot => {
                if (snapshot.val()) {
                    this.user = snapshot.val(); 
                    this.workspaces = this.user.workspaces;
                    return resolve(snapshot.val())
                }
                else {
                    reject('invalid user')
                }
            })
        })
    }

    updateUserInfo = (dispatch, user) => {
        return new Promise((resolve) => {
            this.db.ref('/users/' + user.uid).update(user).then(() => {
                this.user = user
                dispatch({ type: 'UPDATE_USER', user: user })
                resolve(user);
            }).catch(e => {
                console.log(e)
            })
        })
    }

    getWorkspaces = () => {
        return new Promise((resolve, reject) => {
            if (this.user.workspaces) {
                return resolve(this.user.workspaces)
            }
            return reject('No workspaces')
        })
    }


    addWorkspace = (oldworkspaces, newworkspace) => {

    }

    getSelectedWorkspaceData = (dispatch, wid, sid, cid) => {
        if (wid === undefined) {
            wid = this.user.selectedWorkspace;
        }
        return new Promise((resolve, reject) => {
            return this.getSpacesData( wid, sid, cid).then(s => {
                if (sid === undefined) {
                    sid = s[0].id
                }
                else {
                    var space = s.filter(({ id }) => id === sid)
                    if (space.length > 0) {
                        sid = space[0].id
                    }
                    else {
                        return reject("No space")
                    }
                }
                return this.getSnippets(wid, sid, cid)
            })
                .then(c => {
                    if (cid === undefined) {
                        cid = c[0].id
                    }
                    dispatch({ type: 'UPDATE_ALL_DATA', user: this.user, spaces: this.spaces, snippets: this.snippets })
                    return resolve(`/${wid}/${sid}/${cid}`)
                })
        })
    }

    getSpacesData = (wid) => {
        return new Promise((resolve, reject) => {
            var snapshots = this.store.collection(`/workspaces/${wid}/spaces`).get().then(snapshot => {
                return snapshot.docs
            })
            snapshots.then(a => {
                var spaces = []
                a.forEach(space => {
                    spaces.push(space.data())
                });
                this.spaces = spaces;
                resolve(spaces)
            })
        })
    }


    getSnippets = ( wid, sid, cid) => {
        return new Promise((resolve, reject) => {
            var snapshots = this.store.collection(`/workspaces/${wid}/spaces/${sid}/snippets/`).get().then(snapshot => {
                return snapshot.docs
            })
            snapshots.then(a => {
                var snippets = []
                a.forEach(space => {
                    snippets.push(space.data())
                });
                this.snippets = snippets;
                resolve(snippets)
            })
        })
    }


    getsnippet = (dispatch, wid, sid, cid) => {
        return new Promise((resolve, reject) => {
            var x = this.store.collection(`/workspaces/${wid}/spaces/${sid}/snippets/${cid}`).get().then(snapshot => {
                return snapshot.docs
            })
            x.then(a => {
                dispatch({ type: 'UPDATE_SNIPPETS', snippets: a })
                return resolve(a)
            }).catch(e => reject(e))
        })
    }
}

export default new Api();