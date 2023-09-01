import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Avatar } from '@mui/material'

import InputEmoji from 'react-input-emoji'
import { firestore } from '../../../config/firebase'
import { AuthContext } from '../../../contexts/AuthContext'
import { arrayUnion, collection, doc, getDoc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore'

export default function Chat() {

  const ref = useRef();
  const { uid } = useParams()
  const { user, image } = useContext(AuthContext)
  const [text, setText] = useState("")
  const [userUid, setUserUid] = useState(uid)

  const [users, setUsers] = useState(null)
  const [messages, setMessages] = useState([])
  const [singleUser, setSingleUser] = useState(null)


  const getUsers = async () => {

    const q = query(collection(firestore, "Users"), where("uid", "!=", user.uid));
    onSnapshot(q, (querySnapshot) => {

      let allUsers = []

      querySnapshot.forEach((doc) => {
        let data = doc.data()
        allUsers.push(data)
      })

      if (allUsers.length) {
        setUsers(allUsers)
        setSingleUser(allUsers?.find(curElem => {
          return curElem.uid === userUid
        }))
      }
    })
  }

  useEffect(() => {
    getUsers()
  }, [userUid])


  // Read Messages
  useEffect(() => {

    const docid = userUid > user.uid ? user.uid + userUid : userUid + user.uid

    const chatroomDocRef = doc(firestore, "Chatrooms", docid);

    const unsubscribe = onSnapshot(chatroomDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        setMessages(data.allMessage);
      }
      else {
        setMessages(null);
      }
    });

    // Cleanup function
    return () => {
      unsubscribe();
    };


  }, [user, userUid])


  const handChange = text => {
    setText(text);
  };


  // Send Messages
  const handleSend = async (e) => {

    e.preventDefault();

    let randomId = window.getRandomId()
    const docid = userUid > user.uid ? user.uid + userUid : userUid + user.uid

    const mymsg = {
      text,
      _id: randomId,
      sentBy: user.uid,
      sentTo: userUid,
      avatar: singleUser?.image,
      createdAt: new Date(),
      user: {
        _id: user.uid,
        avatar: image
      }
    }

    setText("")

    const chatroomDocRef = doc(firestore, "Chatrooms", docid);

    const chatroomDocSnapshot = await getDoc(chatroomDocRef);

    if (!chatroomDocSnapshot.exists()) {
      await setDoc(chatroomDocRef, { allMessage: [mymsg] });
    }
    else {
      await updateDoc(chatroomDocRef, {
        allMessage: arrayUnion(mymsg),
      });
    }

  }


  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);


  return (
    <>

      <div className='py-4 bg-secondary' style={{ height: 'calc(100vh - 123px)' }}>
        <div className="container">
          <div className="row">
            <div className="col">

              <div className="row">
                <div className="col-md-4" style={{ cursor: 'pointer', height: '85vh' }}>
                  <div className='messagesList'>
                    {
                      users?.map((curElem, i) => {
                        return (
                          <div className="card py-2 ps-3 mb-2" key={i} onClick={() => { setUserUid(curElem.uid) }}>

                            <div className='d-flex align-items-center'>
                              <Avatar alt="User Name" src={`${curElem.image}`} />
                              <span className='ms-3'>{`${curElem.firstName} ${curElem.lastName}`}</span>
                            </div>

                          </div>
                        )
                      })
                    }
                  </div>
                </div>

                <div className="col-12 col-md-8" style={{ height: '85vh' }}>

                  {uid === 'uid' && userUid === 'uid' ? <div className='mt-3' style={{ fontSize: '14px' }}>Click on chat to start</div>
                    : <>
                      <div className='card header-border bg-light d-flex py-3'>
                        <span className='ms-3'>{`${singleUser?.firstName} ${singleUser?.lastName}`}</span>
                      </div>

                      <div className="messages border-start border-end bg-white">
                        {
                          messages === null ? <div className='p-2' style={{ fontSize: '12px' }}>There is not chat exists.</div>
                            : messages?.map((curElem, i) => {
                              return (
                                <div key={i} className={`message ${curElem.sentBy === user.uid && "owner"}`}>
                                  <div ref={ref} className="messageContent">
                                    <p className='mb-0' key={i}>{curElem.text}</p>
                                  </div>
                                </div>
                              )
                            })
                        }
                      </div>

                      <div className="input ps-0 mt-3 ms-3 me-1 position-relative border bottom-border"
                        style={{ top: '-36px', right: '16px', width: '100%' }}>

                        <InputEmoji
                          value={text}
                          onChange={handChange}
                          placeholder="Type message..."
                        />
                        <div className="send">
                          <button className='btn' onClick={handleSend}>SEND</button>
                        </div>
                      </div>

                    </>}

                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </>
  )
}
