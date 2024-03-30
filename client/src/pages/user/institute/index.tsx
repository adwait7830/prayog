import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import { RootState } from "../../../redux/store";
import { ChangeEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

type Student = {
  name: string;
  rollNo: string;
  degree: string;
  _id: string;
};
type Workshop = {
  title: string;
  description: string;
  cover: string;
  _id: string;
}

const Institute = () => {

  const { name, projects, AISHE, students, workshops } = useSelector((state: RootState) => state.institute.details);
  const [reqList, setReqList] = useState<Student[]>([]);
  const [workshopList, setWorkshopList] = useState<Workshop[]>([]);
  const [input, setInput] = useState('');
  const [studentsLoading, setStudentsLoading] = useState(true);
  const [workshopsLoading, setWorkshopsLoading] = useState(true);

  const handleAction = async (_id: string, action: string) => {
    toast.loading("Initiating Request")
    const response = await fetch(process.env.SERVER_URL + 'institute/verify', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem('jwt') || ''
      },
      body: JSON.stringify({ _id, action })
    });
    const data = await response.json();
    if (data.success) {
      toast.dismiss();
      toast.success(`${data.status} Successfully`)
      getdata();
    } else {
      toast.dismiss();
      toast.error("Something Went Wrong")
    }
  }

  const getdata = async () => {
    setStudentsLoading(true);
    const response = await fetch(process.env.SERVER_URL + 'institute/verification-request', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "auth-token": sessionStorage.getItem('jwt') || ''
      },
    });
    const data = await response.json();
    if (data.success) {
      setReqList(data.students)
      setStudentsLoading(false);
    }
  }

  const getWorkshops = async () => {
    setWorkshopsLoading(true);
    const response = await fetch(process.env.SERVER_URL + 'workshops/get-latest', {
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
      setWorkshopsLoading(false);
    }
  }

  useEffect(() => {
    getdata();
    getWorkshops();
    
  }, [])

  return (
    <main className="min-h-screen p-10 bg-lightTheme-secondary text-lightTheme-text dark:bg-darkTheme-secondary dark:text-darkTheme-text">

      <section className="bg-slate-200 dark:bg-gray-900 py-3 rounded shadow-lg">
        <p className="text-center text-2xl font-semibold">Profile</p>
      </section>
      <br />
      <section className="bg-slate-200 dark:bg-gray-900 text-lg font-medium py-3 mx-3 md:mx-10 rounded shadow ">
        <div className="grid md:grid-cols-2 gap-4 md:gap-0">
          <div className="text-center md:order-2">
            <p className="text-8xl mb-2">{name}</p>
            <p className="text-lg">{AISHE}</p>
          </div>
          <div className="text-base flex flex-col gap-1 items-center justify-evenly md:order-3">
            <Link
              to='add'
              className="w-44 cursor-pointer text-center border border-blue-500 hover:bg-blue-500 active:scale-95 px-2 py-1 rounded-md transition-colors"
            >Add New Workshop
            </Link>
            <Link
              to='dashboard'
              className="w-44 cursor-pointer text-center border border-yellow-400 hover:bg-yellow-500 active:scale-95 px-2 py-1 rounded-md transition-colors"
            >Dashboard
            </Link>
            <Link
              to='dashboard/students'
              className="w-44 cursor-pointer text-center border border-green-500 hover:bg-green-500 active:scale-95 px-2 py-1 rounded-md transition-colors"
            >Students
            </Link>
          </div>
        </div>
      </section>
      <br />
      <section className="bg-slate-200 dark:bg-gray-900 mx-3 md:mx-10 rounded">
        <p className="px-5 py-2 mb-2 text-lg lg:text-2xl text-center font-medium text-red-500 dark:text-yellow-500">Statistics</p>
        <div className="grid md:grid-cols-3">
          <div className="h-24 bg-slate-200 dark:bg-gray-900 rounded">
            <p className="text-lg text-center font-semibold mb-1">Projects</p>
            <p className="text-center text-xl">
              {projects}
            </p>
          </div>
          <div className="h-24 bg-slate-200 dark:bg-gray-900 rounded">
            <p className="text-lg text-center font-semibold mb-1">Students</p>
            <p className="text-center text-xl">
              {students}
            </p>
          </div>
          <div className="h-24 bg-slate-200 dark:bg-gray-900 rounded">
            <p className="text-lg text-center font-semibold mb-1">Workshops</p>
            <p className="text-center text-xl">
              {workshops}
            </p>
          </div>
        </div>
      </section>
      <br />
      <section className="mx-3 md:mx-10">
        <div className="relative shadow-md">
          <div className="bg-slate-300 dark:bg-gray-900 grid md:grid-cols-2 px-5 py-2 rounded-t">
            <p className="mb-2 md:mb-0 text-lg lg:text-2xl text-center md:text-start font-medium text-red-500 dark:text-yellow-500">Verification Requests</p>
            <div className="flex justify-center md:justify-end">
              <div className="relative ">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg  bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="Search for students"
                  value={input}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="overflow-y-scroll rounded-b" style={{ maxHeight: '500px' }}>
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 overflow-hidden" >
              <thead className="text-xs text-gray-700 uppercase bg-slate-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Roll Number
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Degree
                  </th>
                  <th scope="col" className="px-6 py-3 flex justify-center">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {
                  studentsLoading
                    ? <tr className="">
                      <td
                        className="bg-slate-50 border-b dark:bg-gray-800 dark:border-gray-700"
                        colSpan={4}>
                        <div className="flex justify-center py-3" role="status">
                          <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                          </svg>
                          <span className="sr-only">Loading...</span>
                        </div></td>
                    </tr>
                    : input.trim().length === 0
                      ? reqList.map((student, i) => (
                        <tr key={i} className="bg-slate-50 border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {student.name}
                          </th>
                          <td className="px-6 py-4">
                            {student.rollNo}
                          </td>
                          <td className="px-6 py-4">
                            {student.degree}
                          </td>
                          <td className="px-6 py-4 flex justify-center gap-3">
                            <button
                              onClick={() => handleAction(student._id, 'accept')}
                              className="font-medium text-green-600 hover:text-blue-500"
                            >Accept
                            </button>
                            <button
                              onClick={() => handleAction(student._id, 'reject')}
                              className="font-medium text-red-600 hover:text-blue-500"
                            >Reject
                            </button>
                          </td>
                        </tr>
                      ))
                      : reqList.filter((student) => student.name.toLocaleLowerCase().includes(input.toLowerCase()) || student.rollNo.toString().toLowerCase().includes(input.toLowerCase())).map((student, i) => (
                        <tr key={i} className="bg-slate-50 border-b dark:bg-gray-800 dark:border-gray-700">
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {student.name}
                          </th>
                          <td className="px-6 py-4">
                            {student.rollNo}
                          </td>
                          <td className="px-6 py-4">
                            {student.degree}
                          </td>
                          <td className="px-6 py-4 flex justify-center gap-3">
                            <button
                              onClick={() => handleAction(student._id, 'accept')}
                              className="font-medium text-green-600 hover:text-blue-500"
                            >Accept
                            </button>
                            <button
                              onClick={() => handleAction(student._id, 'reject')}
                              className="font-medium text-red-600 hover:text-blue-500"
                            >Reject
                            </button>
                          </td>
                        </tr>
                      ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <br />
      <section className="pb-2 px-5 bg-slate-200 dark:bg-gray-900 mx-3 md:mx-10 rounded">
        <p className="py-2 mb-2 md:mb-0 text-lg lg:text-2xl text-center md:text-start font-medium text-red-500 dark:text-yellow-500">Recent Workshops</p>
        <div>
          {
            workshopsLoading
              ? <div className="flex justify-center py-3" role="status">
                <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
              : <div>
                <div className="grid md:grid-cols-5 gap-3">
                  {
                    workshopList.map((workshop, i) => (
                      <div key={i} className="h-80 py-2 hover:border">
                        <div className="flex justify-center">
                          <img className=' w-52 h-52' src={workshop.cover} alt="Cover" />
                        </div>
                        <p className="text-center text-xl font-semibold">{workshop.title}</p>
                        <div className="text-center">{workshop.description.split(' ').slice(0, 15).join(' ')}...</div>
                      </div>
                    ))
                  }
                </div>
                <div className="mt-2 flex">
                  <Link to="workshops" className="border border-black dark:border-white py-2 w-full text-center active:scale-95">View All</Link>
                </div>
              </div>
          }
        </div>
      </section>
    </main>
  )
}

export default Institute