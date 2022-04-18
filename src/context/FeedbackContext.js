import { createContext, useState, useEffect } from 'react'

const FeedbackContext = createContext()
//for these [The components in app.js] to get access to our state were going to wrap
//everything in a provider [same as we wrap everything with Router to use the Route component]

export const FeedbackProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [feedback, setFeedback] = useState([])
  const [feedbackEdit, setFeedbackEdit] = useState({
    item: {},
    edit: false
  })

  useEffect(() => {
    fetchFeedback()
  }, [])

  //Fetch feedback
  const fetchFeedback = async () => 
  {
    //We used proxy for http://localhost:5000 in package.json
    const respone = await fetch(`/feedback?_sort=id&_order=desc`)
    const data = await respone.json()
    setFeedback(data)
    setIsLoading(false)
  }

  //Before we move it to context it was in the app.js->{
  //we want this here because this app.js its the main app component
  // and is where we have our feedback}
  const deleteFeedback = async (id) => {
    if(window.confirm('Are you sure you want to delete ?')){
      await fetch(`/feedback/${id}`, {method: 'DELETE'})
      //the feedback filter is going to return an array minus the one were deleting 
      // [that will not pass the test ; item.id===id will delete]
      setFeedback(feedback.filter((item) => item.id !== id ))
    }
  }

  const addFeedback = async (newFeedback) => {
    const response = await fetch('/feedback', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newFeedback)
    })
    const data = await response.json()
    //state is immutable we cante just push new element
    //we need to create a copy of the array [...feedback]
    //and add the new - [newFeedback, ...feedback]
    setFeedback([data, ...feedback])
  }

  //Set item to be updated
  const editFeedback = (item) => {
    setFeedbackEdit({
      item,
      edit: true
    })

  }

  //Update Feedback item
  const updateFeedback = async (id, updItem) => {
    const respone = await fetch(`/feedback/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updItem)
    })
    //we update on the server - we gwt the respone back which is the update item
    const data = await respone.json()

    setFeedback(feedback.map((item) => (item.id === id ? {...item, ...data} : item)
    ))
  }



  //Any value that we want to pass in, like our state or any 
  //Functions, are going to be passed into a prop of value[Object] 
  return <FeedbackContext.Provider 
  value={{
    feedback,
    feedbackEdit,
    isLoading,
    deleteFeedback,
    addFeedback,
    editFeedback,
    updateFeedback,
  }}>
    {children}
  </FeedbackContext.Provider>
}

export default FeedbackContext