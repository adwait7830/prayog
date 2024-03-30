import { useEffect, useState } from 'react'
import Loader from '../../../../components/loader';
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

type Workshop = {
  title: string;
  description: string;
  cover: string;
  _id: string;
  date: string;
  link: string;
}

export default function MyWorkshops() {

  const navigate = useNavigate();

  const [workshopList, setWorkshopList] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState(true);

  const getWorkshops = async () => {
    const response = await fetch(process.env.SERVER_URL + 'workshops/institute/get-all', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem('jwt') || ''
      },
    });
    const data = await response.json();
    if (data.success) {
      setWorkshopList(data.workshops)
      setLoading(false);
    }
  }
  useEffect(() => {
    getWorkshops();
  }, [])

  if (loading) {
    return <Loader />
  }

  return (
    <main className="min-h-screen p-5 md:p-10 bg-lightTheme-secondary text-lightTheme-text dark:bg-darkTheme-secondary dark:text-darkTheme-text">
      <section className="relative bg-slate-200 dark:bg-gray-900 py-3 rounded shadow-lg">
        <button className='absolute' onClick={()=>navigate(-1)}>
        <BiArrowBack size={25} className=' mt-1 ms-2 hover:scale-110 transition-all'/>
        </button>
        <p className="text-center text-2xl font-semibold">Workshops</p>
      </section>
      <br />
      <section className="grid md:grid-cols-2 gap-2 px-5">
        {workshopList.map((workshop, i) => (
          <article
            key={i}
            className='grid md:grid-cols-2 gap-1 border-2 p-2'
          >
            <div className="md:order-2 flex items-center ">
              <img className="" src={workshop.cover} alt="Cover" />
            </div>
            <div className="md:order-1">
              <div className="">
                <h5 className="text-xl font-medium text-center md:text-start">{workshop.title}</h5>
                <p className="text-sm">{workshop.description}</p>
                <p className=""><small>{workshop.date}</small></p>
                <a className="text-decoration-none bg-blue-500 active:scale-95 flex justify-center rounded text-black font-medium"
                  href={workshop.link}
                  target='_blank'
                  rel="noreferrer">
                  <p>Visit</p>
                </a>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}
