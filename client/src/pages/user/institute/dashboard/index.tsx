import { BiArrowBack } from 'react-icons/bi';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../../../../redux/store';
export default function InstituteDashboard() {

  const navigate = useNavigate();
  const { projects, students, workshops } = useSelector((state: RootState) => state.institute.details);

  return (
    <main className='min-h-screen p-10 bg-lightTheme-secondary text-lightTheme-text dark:bg-darkTheme-secondary dark:text-darkTheme-text'>
      <section className="bg-slate-200 dark:bg-gray-900 py-3 rounded shadow-lg">
        <button className='absolute' onClick={() => navigate(-1)}>
          <BiArrowBack size={25} className=' mt-1 ms-2 hover:scale-110 transition-all' />
        </button>
        <p className="text-center text-2xl font-semibold">Dashboard</p>
      </section>
      <br />
      <section className='grid md:grid-cols-3 gap-10'>
        <div className='flex justify-center'>
          <div className='bg-slate-200 dark:bg-gray-900 h-40 w-60 shadow rounded'>
            <p className='text-2xl text-center'>Projects</p>
            <p className='text-5xl text-center mt-5'>{projects}</p>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='bg-slate-200 dark:bg-gray-900 h-40 w-60 shadow rounded'>
            <p className='text-2xl text-center'>Students</p>
            <p className='text-5xl text-center mt-5'>{students}</p>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className='bg-slate-200 dark:bg-gray-900 h-40 w-60 shadow rounded'>
            <p className='text-2xl text-center'>Workshops</p>
            <p className='text-5xl text-center mt-5'>{workshops}</p>
          </div>
        </div>
      </section>
      <br />
      <section className='px-5'>
        <p className='text-2xl font-semibold bg-slate-200 dark:bg-gray-900 py-3 rounded ps-2'>Students</p>
      </section>
    </main>
  )
}
