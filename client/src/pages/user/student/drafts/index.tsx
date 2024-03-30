import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';


export default function MyDrafts() {

    const navigate = useNavigate();
    return (
      <main className="p-5 md:p-10 min-h-screen bg-lightTheme-secondary text-lightTheme-text dark:bg-darkTheme-secondary dark:text-darkTheme-text">
        <section className="bg-slate-200 dark:bg-gray-900 py-3 rounded shadow-lg">
        <button className='absolute' onClick={() => navigate(-1)}>
          <BiArrowBack size={25} className=' mt-1 ms-2 hover:scale-110 transition-all' />
        </button>
        <p className="text-center text-2xl font-semibold">Drafts</p>
      </section>
      <br />
      </main>
    )
  }
  