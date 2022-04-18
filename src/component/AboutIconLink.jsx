import {FaQuestion} from 'react-icons/fa'
import {Link} from 'react-router-dom'
function AboutIconLink() {

  //IF WE WILL WRAP THE ICON WITH <A> LINK IT WILL WORK BUT
  //WILL WORK WITH REALOAD THE PAGE- WE DONT WANT THAT
  return (
    <div className='about-link'>
      <Link to='/about'>
        <FaQuestion size={30} />
      </Link>
    </div>
  )
}

export default AboutIconLink
