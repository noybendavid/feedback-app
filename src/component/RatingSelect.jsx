import { useState, useContext, useEffect } from 'react'
import FeedbackContext from '../context/FeedbackContext'

function RatingSelect({select}) {
  const [selected, setSelected] = useState(10)

  const {feedbackEdit} = useContext(FeedbackContext)

  useEffect(() => {
    if(feedbackEdit.edit === true) {
      setSelected(feedbackEdit.item.rating)
    }

  }, [feedbackEdit])

  const handleChange = (e) => {
    // + change it from string to number
    setSelected(+e.currentTarget.value)
    select(+e.currentTarget.value)
  }

  //set the array length to - 10 , (_, i) => run a map function on said indexes using _[value][undefined] and i[index/key] [0 to 9]

  //
  return (
    <ul className='rating'>
    {Array.from({ length: 10 }, (_, i) => (
      <li key={`rating-${i + 1}`}>
        <input
          type='radio'
          id={`num${i + 1}`}
          name='rating'
          value={i + 1}
          onChange={handleChange}
          checked={selected === i + 1}
        />
        <label htmlFor={`num${i + 1}`}>{i + 1}</label>
      </li>
    ))}
  </ul>
  )
}

export default RatingSelect
