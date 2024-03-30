import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";

const Student = () => {
  const { name, college, degree, projects } = useSelector((state: RootState) => state.student.details);
  const navigate = useNavigate();
  return (
    <main className="p-10 min-h-screen bg-lightTheme-secondary text-lightTheme-text dark:bg-darkTheme-secondary dark:text-darkTheme-text">

      <section className="bg-slate-200 dark:bg-gray-900 py-3 rounded shadow-lg">
        <p className="text-center text-2xl font-semibold">Profile</p>
      </section>
      <br />
      <section className="bg-slate-200 dark:bg-gray-900 text-lg font-medium py-3 mx-3 md:mx-10 rounded shadow ">
        <div className="grid md:grid-cols-3 gap-4 md:gap-0">
          <div className="text-center">
            <p className="text-2xl mb-2">{name}</p>
            <p className="text-lg">{college}</p>
            <p className="text-lg">{degree}</p>
          </div>
          <div>
          <p className="text-2xl text-center font-semibold mb-3">Projects Uploaded</p>
            <p className="text-center text-5xl">
              {projects}
            </p>
          </div>
          <div className="text-base flex flex-col gap-3 items-center justify-evenly md:order-3">
            <Link
              to='add'
              className="w-44 cursor-pointer text-center border border-blue-500 hover:bg-blue-500 active:scale-95 px-2 py-1 rounded-md transition-colors"
            >Add New Project
            </Link>
            <Link
              to='drafts'
              className="w-44 cursor-pointer text-center border border-yellow-400 hover:bg-yellow-500 active:scale-95 px-2 py-1 rounded-md transition-colors"
            >Drafts
            </Link>
            <button
              className="w-44 cursor-pointer text-center border border-red-500 hover:bg-red-500 active:scale-95 px-2 py-1 rounded-md transition-colors"
            >Delete Account
            </button>
          </div>
        </div>
      </section>
      <br />
      <section className=" py-3 mx-3 md:mx-10 bg-slate-200 dark:bg-gray-900 rounded">
        <p className="text-2xl px-2 py-1 font-medium text-center md:text-start text-red-500 dark:text-yellow-500">My Projects</p>
        <div className='px-5 py-2 flex flex-col lg:flex-row gap-3 items-center'>
          {Array.from({ length: 4 }, (_, i) => (
            <article
              onClick={() => navigate('/projects/qazwsxedc')}
              key={i}
              className="py-4 px-2 rounded hover:shadow-lg cursor-pointer border border-black dark:border-white"
            >
              <div className=''>
                <img src="/images/p1.jpg" sizes='' alt="..." />
              </div>
              <div className=''>
                <div className="flex flex-col ">
                  <p className="text-xl">Self Directoning Rover</p>
                  <p className=""><small>Electronics</small></p>
                  <p className=""><small>22-3-2023</small></p>
                  <p className=""><small>{22} Views</small></p>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="p-2 pb-0">
          <Link to='/profile/projects' className="flex justify-center border border-black dark:border-white py-2 active:scale-95">
            <p className="">View All</p>
          </Link>
        </div>
      </section>
      <br />
      <p className="text-center text-2xl ">More Features Coming Soon...</p>
    </main>
  )
}
export default Student