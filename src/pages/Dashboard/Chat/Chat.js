// import React, { useContext, useEffect, useRef, useState } from 'react'
// import { useParams } from 'react-router-dom'

// import { Avatar } from '@mui/material'

// import { AuthContext } from '../../../contexts/AuthContext'
// import { firestore } from '../../../config/firebase'
// import { arrayUnion, collection, doc, onSnapshot, query, updateDoc, where } from 'firebase/firestore'
// import InputEmoji from 'react-input-emoji'

// export default function Chat() {

//   const { uid } = useParams()
//   const { user, image } = useContext(AuthContext)
//   const [text, setText] = useState("")
//   const [userUid, setUserUid] = useState(uid)
//   const ref = useRef();

//   const [users, setUsers] = useState(null)
//   const [messages, setMessages] = useState([])
//   const [singleUser, setSingleUser] = useState(null)

//   const getUsers = async () => {

//     const q = query(collection(firestore, "Users"), where("uid", "!=", user.uid));
//     onSnapshot(q, (querySnapshot) => {

//       let products = []

//       querySnapshot.forEach((doc) => {
//         let data = doc.data()
//         products.push(data)
//       })

//       if (products.length) {
//         setUsers(products)
//         setSingleUser(products?.find(curElem => {
//           return curElem.uid === userUid
//         }))
//       }
//     })
//   }

//   useEffect(() => {
//     getUsers()
//   }, [userUid])


//   // Read Messages
//   useEffect(() => {
//     const docid = userUid > user.uid ? user.uid + userUid : userUid + user.uid

//     const unSub = onSnapshot(doc(firestore, "Chatrooms", docid), (doc) => {
//       doc.exists() && setMessages(doc.data().allMessage);
//     });

//     return () => {
//       unSub();
//     }

//   }, [user, userUid])

//   const handChange = text => {
//     setText(text);
//   };

//   // Send Messages
//   const handleSend = async (e) => {

//     e.preventDefault();

//     let randomId = window.getRandomId()
//     const docid = userUid > user.uid ? user.uid + userUid : userUid + user.uid

//     const mymsg = {
//       text,
//       _id: randomId,
//       sentBy: user.uid,
//       sentTo: userUid,
//       avatar: singleUser?.image,
//       createdAt: new Date(),
//       user: {
//         _id: user.uid,
//         avatar: image
//       }
//     }

//     setText("")
//     console.log(docid);

//     await updateDoc(doc(firestore, "Chatrooms", docid), {
//       allMessage: arrayUnion(mymsg),
//     })

//   }


//   useEffect(() => {
//     ref.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);


//   return (
//     <>

//       <div className='py-4' style={{ height: 'calc(100vh - 123px)' }}>
//         <div className="container">
//           <div className="row">
//             <div className="col">

//               <div className="row">
//                 <div className="col-md-4" style={{ cursor: 'pointer', height: '85vh' }}>
//                   <div className='messagesList'>
//                     {
//                       users?.map((curElem, i) => {
//                         return (
//                           <div className="card py-2 ps-3 mb-2" key={i} onClick={() => { setUserUid(curElem.uid) }}>

//                             <div className='d-flex align-items-center'>
//                               <Avatar alt="User Name" src={`${curElem.image}`} />
//                               <span className='ms-3'>{`${curElem.firstName} ${curElem.lastName}`}</span>
//                             </div>

//                           </div>
//                         )
//                       })
//                     }
//                   </div>
//                 </div>

//                 <div className="col-12 col-md-8" style={{ height: '85vh' }}>
//                   <div className='card rounded-0 bg-light d-flex py-3'>
//                     <span className='ms-3'>{`${singleUser?.firstName} ${singleUser?.lastName}`}</span>
//                   </div>
//                   <div className="messages border-start">

//                     {
//                       messages?.map((curElem, i) => {
//                         return (
//                           <div className={`message ${curElem.sentBy === user.uid && "owner"}`}>
//                             <div ref={ref} className="messageContent">
//                               <p key={i}>{curElem.text}</p>
//                             </div>
//                           </div>
//                         )
//                       })
//                     }

//                   </div>

//                   <div className="input ms-3 me-1 position-relative border" style={{ top: '-36px', right: '16px' }}>

//                     <InputEmoji
//                       value={text}
//                       onChange={handChange}
//                       // cleanOnEnter
//                       placeholder="Type a message..."
//                     />
//                     <div className="send">
//                       <button onClick={handleSend}>SEND</button>
//                     </div>
//                   </div>

//                 </div>
//               </div>

//             </div>
//           </div>
//         </div>
//       </div>

//     </>
//   )
// }


// import React from 'react'

// import { Modal } from '@mantine/core';

// export default function Chat() {

//     return (
//         <>
//             <Modal opened={true} title="Chat">
//                 {/* Modal content */}
//             </Modal>
//         </>
//     );
// }


import React from 'react'
import Messages from './Messages'

export default function Chat() {
  return (
    <>

      <h5 className='content-center text-muted mb-0' style={{ height: 'calc(100vh - 75.98px)' }}>
        Chat is Under Development
      </h5>

    </>
  )
}
