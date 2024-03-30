import toast from 'react-hot-toast';
import DropZone from "./DropZone";
import { useState, FormEvent, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';

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

export default function AddProject() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    title: '',
    description: '',
    synopsisFirst: '',
    synopsisSecond: '',
    synopsisThird: '',
    synopsisFourth: '',
    linkFirstTitle: '',
    linkFirst: '',
    linkSecondTitle: '',
    linkSecond: '',
    linkThirdTitle: '',
    linkThird: '',
    referenceFirst: '',
    referenceSecond: '',
    referenceThird: ''
  });

  const [cover, setCover] = useState<FileObject[]>([]);
  const [images, setImages] = useState<FileObject[]>([]);
  const [files, setFiles] = useState<FileObject[]>([]);

  const submitData = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const coverBuffer = (await processFiles(cover))[0];
    const imageBuffers = await processFiles(images);
    const fileBuffers = await processFiles(files);
    const formData = new FormData();


    const coverBlob = new Blob([coverBuffer]);
    formData.append('cover', coverBlob, 'cover.dat');


    imageBuffers.forEach((buffer, index) => {
      const imageBlob = new Blob([buffer]);
      formData.append(`image${index + 1}`, imageBlob, `image${index + 1}.dat`);
    });


    fileBuffers.forEach((buffer, index) => {
      const fileBlob = new Blob([buffer]);
      formData.append(`file${index + 1}`, fileBlob, `file${index + 1}.dat`);
    });

    for (const [key, value] of Object.entries(data)) {
      formData.append(key, value);
    }

    const response = await fetch('http://localhost:5050/api/dummy', {
      method: 'POST',
      body: formData,
    });
    if (response.ok) {
      toast.success('Project Submitted for Verification');
      setTimeout(() => {

        navigate('/profile/projects')
      }, 3000);
    } else {
      toast.error('Something Went Wrong!')
    }
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  return (
    <main className="p-5 md:p-10 min-h-screen bg-lightTheme-secondary text-lightTheme-text dark:bg-darkTheme-secondary dark:text-darkTheme-text">
      <section className="bg-slate-200 dark:bg-gray-900 py-3 rounded shadow-lg">
        <button className='absolute' onClick={() => navigate(-1)}>
          <BiArrowBack size={25} className=' mt-1 ms-2 hover:scale-110 transition-all' />
        </button>
        <p className="text-center text-2xl font-semibold">Add Project</p>
      </section>
      <br />
      <section className='mx-3 md:mx-10'>
        <form onSubmit={(e) => submitData(e)} encType='multipart/form-data'>
          <div>
            <p className="text-center text-2xl font-medium mb-2">Basic Information</p>
            <div className="grid md:grid-cols-2 gap-5">
              <div className="flex flex-col gap-3">
                <div>
                  <label className="block text-xl font-medium" htmlFor="title">Project Title</label>
                  <input
                    className="bg-gray-100 dark:bg-gray-400 rounded text-black  w-full  h-10"
                    id="title"
                    name="title"
                    value={data.title}
                    onChange={handleInputChange}
                    type="text" />
                </div>
                <div>
                  <label className="block text-xl font-medium" htmlFor="description">Description(50 Words)</label>
                  <textarea
                    className="bg-gray-100 dark:bg-gray-400 text-black w-full rounded"
                    maxLength={300}
                    id="description"
                    name='description'
                    value={data.description}
                    onChange={handleInputChange}
                    rows={5} />
                </div>
              </div>
              <div>
                <p className='text-center text-2xl font-medium mb-2'>Cover Image</p>
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
          </div>
          <br />
          <div>
            <p className='text-center text-2xl font-medium mb-2'>Project Images (Maximum 6)</p>
            <div className="px-2">
              <DropZone
                className="cursor-pointer h-10 outline-dotted flex justify-center items-center"
                group={true}
                maxFiles={6}
                filetype="img"
                files={images}
                setFiles={setImages}
              />
            </div>
          </div>
          <br />
          <div>
            <p className='text-center text-2xl font-medium mb-2'>Synopsis</p>
            <div className="">
              <div className="px-2">
                <p className="text-xl font-medium">Introduction</p>
                <textarea
                  className="bg-gray-100 dark:bg-gray-400 w-full text-black rounded"
                  name="synopsisFirst"
                  value={data.synopsisFirst}
                  onChange={handleInputChange}
                  rows={5} />
              </div>
              <div className="px-2">
                <p className="text-xl font-medium">Methodology and Approach</p>
                <textarea
                  className="bg-gray-100 dark:bg-gray-400 w-full text-black rounded"
                  name="synopsisSecond"
                  value={data.synopsisSecond}
                  onChange={handleInputChange}
                  rows={5} />
              </div>
              <div className="px-2">
                <p className="text-xl font-medium">Results and Impact</p>
                <textarea
                  className="bg-gray-100 dark:bg-gray-400 w-full text-black rounded"
                  name='synopsisThird'
                  value={data.synopsisThird}
                  onChange={handleInputChange}
                  rows={5} />
              </div>
              <div className="px-2">
                <p className="text-xl font-medium">Challenges and Solutions</p>
                <textarea
                  className="bg-gray-100 dark:bg-gray-400 w-full text-black rounded"
                  name="synopsisFourth"
                  value={data.synopsisFourth}
                  onChange={handleInputChange}
                  rows={5} />
              </div>
            </div>
          </div>
          <br />
          <div>
            <p className="text-center text-2xl font-medium mb-2">Related Files (Maximum 5)</p>
            <div className="px-2">
              <DropZone
                className="cursor-pointer h-10 outline-dotted flex justify-center items-center"
                group={true}
                maxFiles={5}
                filetype="doc"
                files={files}
                setFiles={setFiles}
              />
            </div>
          </div>
          <br />
          <div>
            <p className="text-center text-2xl font-medium mb-2">Related Links</p>
            <div className="grid md:grid-cols-3 px-2 gap-4">
              <div className="border p-2">
                <div>
                  <label className="block text-lg font-medium" htmlFor="title1">Title</label>
                  <input
                    className="bg-gray-100 dark:bg-gray-400 rounded text-black w-full h-8"
                    name="linkFirstTitle"
                    value={data.linkFirstTitle}
                    onChange={handleInputChange}
                    type="text"
                    id="title1" />
                </div>
                <div>
                  <label className="block text-lg font-medium" htmlFor="link1">Link</label>
                  <input
                    className="bg-gray-100 dark:bg-gray-400 rounded text-black w-full h-8"
                    name="linkFirst"
                    value={data.linkFirst}
                    onChange={handleInputChange}
                    type="text"
                    id="link1" />
                </div>
              </div>
              <div className="border p-2">
                <div>
                  <label className="block text-lg font-medium" htmlFor="title1">Title</label>
                  <input
                    className="bg-gray-100 dark:bg-gray-400 rounded text-black w-full h-8"
                    name="linkSecondTitle"
                    value={data.linkSecondTitle}
                    onChange={handleInputChange}
                    type="text"
                    id="title1" />
                </div>
                <div>
                  <label className="block text-lg font-medium" htmlFor="link1">Link</label>
                  <input
                    className="bg-gray-100 dark:bg-gray-400 rounded text-black w-full h-8"
                    type="text"
                    name="linkSecond"
                    value={data.linkSecond}
                    onChange={handleInputChange}
                    id="link1" />
                </div>
              </div>
              <div className="border p-2">
                <div>
                  <label className="block text-lg font-medium" htmlFor="title1">Title</label>
                  <input
                    className="bg-gray-100 dark:bg-gray-400 rounded text-black w-full h-8"
                    type="text"
                    name="linkThirdTitle"
                    value={data.linkThirdTitle}
                    onChange={handleInputChange}
                    id="title1" />
                </div>
                <div>
                  <label className="block text-lg font-medium" htmlFor="link1">Link</label>
                  <input
                    className="bg-gray-100 dark:bg-gray-400 rounded text-black w-full h-8"
                    type="text"
                    name="linkThird"
                    value={data.linkThird}
                    onChange={handleInputChange}
                    id="link1" />
                </div>
              </div>
            </div>
          </div>
          <br />
          <div>
            <p className="text-center text-2xl font-medium mb-2">References</p>
            <div className="grid md:grid-cols-3 px-2 gap-3">
              <div className="border p-1">
                <label className="text-lg font-medium" htmlFor="ref1">Reference 1</label>
                <input
                  id='ref1'
                  className="bg-gray-100 dark:bg-gray-400 rounded text-black w-full h-8"
                  name="referenceFirst"
                  value={data.referenceFirst}
                  onChange={handleInputChange}
                  type="text" />
              </div>
              <div className="border p-1">
                <label className="text-lg font-medium" htmlFor="ref1">Reference 2</label>
                <input
                  id='ref1'
                  className="bg-gray-100 dark:bg-gray-400 rounded text-black w-full h-8"
                  name="referenceSecond"
                  value={data.referenceSecond}
                  onChange={handleInputChange}
                  type="text" />
              </div>
              <div className="border p-1">
                <label className="text-lg font-medium" htmlFor="ref1">Reference 3</label>
                <input
                  id='ref1'
                  className="bg-gray-100 dark:bg-gray-400 rounded text-black w-full h-8"
                  name="referenceThird"
                  value={data.referenceThird}
                  onChange={handleInputChange}
                  type="text" />
              </div>
            </div>
          </div>
          <br />
          <div>
            <div className="grid md:grid-cols-2">
              <div className="flex justify-center">
                <button className="bg-green-500 active:scale-95 rounded py-1 px-2 text-black font-medium">Upload Project</button>
              </div>
              <div className="flex justify-center">
                <p className="bg-yellow-500 active:scale-95 rounded py-1 px-2 text-black font-medium">Save as Draft</p>
              </div>
            </div>
          </div>
        </form>
      </section>
      <br />
    </main>
  )
}
