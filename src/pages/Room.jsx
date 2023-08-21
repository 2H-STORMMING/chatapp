import { useState, useEffect } from "react"
import client,{databases,DATABASE_ID,COLLECTION_ID_MESSAGES} from '../appwriteConfig'
import {ID,Query, Role,Permission} from 'appwrite'
import { Trash2 } from "react-feather"
import Header from "../components/Header"
import { useAuth } from "../utils/AuthContext"

function Room() {
  const [messages, setMessages] = useState([])
  const [messagebody, setMessageBody] = useState("")
  const {user} = useAuth
 
  useEffect(() => {
    getMessages()
    const unsbscribe = client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTION_ID_MESSAGES}.documents`, response => {
      if(response.events.includes("databases.*.collections.*.documents.*.create")){
        setMessages(prevState => [response.payload,...prevState])
      }
      if(response.events.includes("databases.*.collections.*.documents.*.delete")){
        setMessages(messages.filter((message) => message.$id !== response.payload.$id))
      }
    });
    return () => {
      unsbscribe()
    }


  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  

  const handleSubmit = async (event) => {
    event.preventDefault()

    let payload = {
      user_id: user.$id,
      username: user.name,
      body:messagebody
    }
    

    let permissions = [
       Permission.write(Role.user(user.$id))

    ]

    // eslint-disable-next-line no-unused-vars
    let response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      ID.unique(),
      payload,
      permissions,
    )
    //setMessages(prevState => [response,...prevState])
    setMessageBody("")

  }

  const getMessages = async () => {
    const response = await databases.listDocuments(
      DATABASE_ID,
      COLLECTION_ID_MESSAGES,
      [
        Query.orderDesc("$createdAt"),
        Query.limit(10)
      ]
      )
    setMessages(response.documents)
    console.log(messages)
  }

  const deleteMessage = async (message_id) => {
    databases.deleteDocument(
    DATABASE_ID,
    COLLECTION_ID_MESSAGES,
    message_id )
    //setMessages(messages.filter((message) => message.$id !== message_id))
  }


  return (
    <main className="container">
      <Header/>
      <div className="room--container">
      <form onSubmit={handleSubmit} id="message--form">
        <div>
          <textarea
          required
          maxLength="1000"
          placeholder="Type a message"
          onChange = {(event) => setMessageBody(event.target.value)}
          value={messagebody}
          >
          </textarea>
        </div>
        <div className="send-btn--wrapper">
          <input className= "btn btn--secondary" type="submit" value="send"/>
        </div>
      </form>


      
    <div>{messages.map((message) => {
      return <div key={message.$id} className="message--wrapper">
         <div className="message--header">
           
           <p>
            {message?.username ? (
              <span className="message--username">{message.username}</span>
            ):(
              <span className="message--username">Anonymous</span>
            )}
            <small className="message-timestamp">{new Date(message.$createdAt).toLocaleString()}</small>
           </p>
          <Trash2 className="delete--btn" onClick={() => deleteMessage(message.$id)}   size={18} />
        </div>
        <div className="message--body">
        <span>{message.body}</span>
        </div>
      </div>
    })}
    </div>  
    </div> 
    </main>
  )
}

export default Room