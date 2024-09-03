import PageNotFound from '../assets/Scarecrow.png'
import { Link } from 'react-router-dom';

const UnknownPage = () => {
  return (
    <div className='bg-white flex'>
      <div className='w-1/2 flex flex-col justify-center ml-16'>
        <h1 className='font-extrabold text-6xl mb-4'>Whooops!</h1>
        <p className='text-xs'>{`Sorry the page you are looking for doesn't exist`}</p>
        <Link to='/home' className='border-2 w-24 rounded-xl bg-red-500 text-center pt-2 pb-2 mt-5 border-none text-white'>Go Back</Link>
      </div>
      <div className='w-1/2'>
        <img src={PageNotFound} alt="" className='mt-5' style={{ marginLeft: '-2rem' }} />
      </div>
    </div>
  )
}

export default UnknownPage