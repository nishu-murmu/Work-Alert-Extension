import { addDoc, collection } from '@firebase/firestore'
import { db } from '../firebase'

const useFirebase = () => {
  const loginWithGoogle = () => {
    return new Promise((resolve, reject) => {
      chrome.identity.getAuthToken({ interactive: false }, function (token) {
        if (chrome.runtime.lastError) {
          console.error(chrome.runtime.lastError)
          resolve(false)
          return
        }
        fetch('https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + token)
          .then((response) => response.json())
          .then((data) => {
            resolve({
              token,
              ...data,
            })
          })
          .catch((error) => {
            resolve(false)
            console.error('Error fetching user details:', error)
          })
      })
    })
  }

  const addUser = () => {
    return new Promise((resolve, reject) => {
      loginWithGoogle()
        .then((res: any) => {
          if (res) {
            addDoc(collection(db, 'users'), res)
              .then(resolve)
              .catch(() => {
                resolve(false)
              })
          } else {
            resolve(false)
          }
        })
        .catch(() => resolve(false))
    })
  }

  return {
    addUser,
  }
}

export default useFirebase
