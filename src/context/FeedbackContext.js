import { createContext, useState } from 'react'
import {v4 as uuidv4} from 'uuid'

const FeedbackContext = createContext()
//for these [The components in app.js] to get access to our state were going to wrap
//everything in a provider [same as we wrap everything with Router to use the Route component]

export const FeedbackProvider = ({children}) => {

  const [feedback, setFeedback] = useState([
    {
      id: 1,
      text: 'This item is feedback item 1',
      rating: 10,
    },
    {
      id: 2,
      text: 'This item is feedback item 2',
      rating: 9,
    },
    {
      id: 3,
      text: 'This item is feedback item 3',
      rating: 7,
    },
  ])

  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  //Before we move it to context it was in the app.js->{
  //we want this here because this app.js its the main app component
  // and is where we have our feedback}
  const deleteFeedback = (id) => {
    if(window.confirm('Are you sure you want to delete ?')){
      //the feedback filter is going to return an array minus the one were deleting 
      // [that will not pass the test ; item.id===id will delete]
      setFeedback(feedback.filter((item) => item.id !== id ))
    }
  }

  const addFeedback = (newFeedback) => {
    newFeedback.id = uuidv4()
    //state is immutable we cante just push new element
    //we need to create a copy of the array [...feedback]
    //and add the new - [newFeedback, ...feedback]
    setFeedback([newFeedback, ...feedback])
  }

  //Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })

  }

  //Update Feedback item
  const updateFeedback = (id, updItem) => {
    setFeedback(feedback.map((item) => (item.id === id ? {...item, ...updItem} : item)
    ))
  }



  //Any value that we want to pass in, like our state or any 
  //Functions, are going to be passed into a prop of value[Object] 
  return <FeedbackContext.Provider 
  value={{
    feedback,
    feedbackEdit,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback,
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext