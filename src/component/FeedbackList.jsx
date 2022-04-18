import {motion, AnimatePresence} from 'framer-motion'
import { useContext } from 'react'
import Feedbackitem from "./FeedbackItem"
import FeedbackContext from '../context/FeedbackContext'
import Spinner from './shared/Spinner'

function FeedbackList() {
  const {feedback, isLoading} = useContext(FeedbackContext)
 

  if(!isLoading && (!feedback || feedback.length === 0) ){
    return <p>No Feedback Yet</p>
  }

  return isLoading ?<Spinner /> : (    
  <div className="feedback-list">
    <AnimatePresence>
      {feedback.map((item) => (
        <motion.div
          key={item.id}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
        >
          <Feedbackitem key={item.id} item={item}/>
          </motion.div>
  ))}
   </AnimatePresence>
 </div>)

}


/*
 //WITHOUT THE ANIMATION
  return (
    <div className="feedback-list">
      {feedback.map((item) => (
        <Feedbackitem 
        key={item.id}
        item={item}
        handleDelete={handleDelete}
        />
      ))}
    </div>
  )
}
*/
/*
//Because WE no longer passing feedback as props - we dont need this anymore !

FeedbackList.propTypes = {
  feedback: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      rating: PropTypes.number.isRequired,
    })
  ),
}
*/
export default FeedbackList
