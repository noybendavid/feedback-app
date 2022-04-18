import {useContext} from 'react'
import FeedbackContext from '../context/FeedbackContext'

function FeedbackStats() {
  const {feedback} = useContext(FeedbackContext)
  //Calculate ratinga Avg

  let average = feedback.reduce((acc, cur) => {
    return acc + cur.rating

  },0) / feedback.length

  //Only One Decimal - but it will remove it if its zero
  average = average.toFixed(1).replace(/[.,]0$/, '')

  return (
    <div className="feedback-stats">
      <h4>{feedback.length} Reviews</h4>
      <h4>Average Rating: {isNaN(average) ? 0 : average}</h4>

    </div>
  )
}
/*
//Because WE no longer passing feedback as props - we dont need this anymore !
//WE now using CONTEXT

FeedbackStats.propTypes = {
  feedback: PropTypes.array.isRequired,
}
*/
export default FeedbackStats
