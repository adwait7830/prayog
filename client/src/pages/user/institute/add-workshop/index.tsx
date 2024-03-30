import { useState } from "react";
import DropZone from "./DropZone";
import { BiArrowBack } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';

interface FileObject {
  preview: string;
  lastModified: number;
  name: string;
  webkitRelativePath: string;
  size: number;
  type: string;
}

async function processFiles(files: FileObject[]): Promise<ArrayBuffer[]> {
  const fileBufferArray: ArrayBuffer[] = await Promise.all(
    files.map(async (file) => {
      const reader = new FileReader();
      const blob = new Blob([JSON.stringify(file)], { type: file.type });

      const buffer: ArrayBuffer = await new Promise((resolve) => {
        reader.onload = () => {
          resolve(reader.result as ArrayBuffer);
        };
        reader.readAsArrayBuffer(blob);
      });
      return buffer;
    })
  );
  return fileBufferArray;
}
console.log(processFiles);

export default function AddWorkshop() {
  const navigate = useNavigate();

  const [cover, setCover] = useState<FileObject[]>([])
  return (
    <main className="min-h-screen p-10 bg-lightTheme-secondary text-lightTheme-text dark:bg-darkTheme-secondary dark:text-darkTheme-text">
      <section className="bg-slate-200 dark:bg-gray-900 py-3 rounded shadow-lg">
        <button className='absolute' onClick={() => navigate(-1)}>
          <BiArrowBack size={25} className=' mt-1 ms-2 hover:scale-110 transition-all' />
        </button>
        <p className="text-center text-2xl font-semibold">Add Workshop</p>
      </section>
      <br />
      <form>
        <div className='grid md:grid-cols-2 gap-10'>
          <div className="">
            <div className="mb-3">
              <label htmlFor="title" className="block text-xl font-semibold">Title</label>
              <input id="title" type="text" className='text-black bg-slate-100 rounded w-full h-10' />
            </div>
            <div>
              <label htmlFor="descripton" className='block text-xl font-semibold'>Description (100 Words)</label>
              <textarea rows={10} name="description" id="description" className="text-black bg-slate-100 rounded w-full"></textarea>
            </div>
          </div>
          <div>
            <p className="text-xl font-semibold mb-1 text-center">Cover Image</p>
            <DropZone
              className="cursor-pointer h-10 w-full outline-dotted flex justify-center items-center"
              group={false}
              maxFiles={1}
              filetype="img"
              files={cover}
              setFiles={setCover}
            />
          </div>
        </div>
        <div className="flex justify-center py-3">
          <button>
            <p className="w-20 text-black text-lg font-medium bg-green-600 hover:shadow-lg active:scale-95 py-1 px-2 rounded">Add</p>
          </button>
        </div>
      </form>

    </main>
  )
}
