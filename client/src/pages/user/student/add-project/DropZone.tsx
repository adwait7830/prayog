import { useCallback, Dispatch, SetStateAction } from "react";
import { useDropzone, FileRejection, Accept } from "react-dropzone";
import { FaXmark } from "react-icons/fa6";
interface Props {
    className: string;
    group: boolean;
    maxFiles: number;
    filetype: string;
    files: FileObject[];
    setFiles: Dispatch<SetStateAction<FileObject[]>>;
}

interface FileObject {
    preview: string;
    lastModified: number;
    name: string;
    webkitRelativePath: string;
    size: number;
    type: string;
}
interface FileWithPreview extends File {
    preview: string;
}
const DropZone = ({ className, group, maxFiles, filetype, files, setFiles }: Props) => {

    const acceptedFileType = (filetype: string): Accept => {
        switch (filetype) {
            case 'img':
                return {
                    'image/*': ['.png', '.jpeg', '.jpg'],
                };
            case 'doc':
                return {
                    'application/msword': ['.doc', '.docx', '.pptx', '.pdf', '.pptx', '.xls', '.xlsx'],
                };
            default:
                return {};
        }
    };



    const onDrop = useCallback(
        (acceptedFiles: File[], fileRejections: FileRejection[]) => {

            const validFiles = acceptedFiles.slice(0, maxFiles - files.length);

            const filesWithPreview: FileWithPreview[] = validFiles.map(file => {
                const reader = new FileReader()
                reader.readAsArrayBuffer(file)

                const fileWithPreview = Object.assign(file, {
                    preview: URL.createObjectURL(file),
                }) as FileWithPreview;
                return fileWithPreview;
            });


            group
                ? setFiles((prevFiles: FileObject[]) => [...prevFiles, ...filesWithPreview])
                : setFiles([...filesWithPreview])

            // Handle rejected files if needed
            if (fileRejections.length > 0) {
                console.error("Some files were rejected:");
                // Optionally, you can display an error message to the user
            }
            // Clean up previews and resources when component unmounts or files change
            return () => {
                filesWithPreview.forEach(file => URL.revokeObjectURL(file.preview));
            };
        },
        [maxFiles, files.length, group, setFiles]
    );

    const removeFile = (name: string) => {
        setFiles((files: FileObject[]) => files.filter(file => file.name !== name))
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: acceptedFileType(filetype) });

    return (
        <div>
            <div {...getRootProps({
                className: className
            })}>
                <input {...getInputProps()} />
                {isDragActive
                    ? group
                        ? <p>Drop the files here ...</p>
                        : <p>Drop the file here...</p>
                    : group
                        ? <p>Drag & Drop or Select multiple files</p>
                        : <p>Drag & Drop or Select a File</p>
                }
            </div>

            <div className="p-2 flex flex-col md:flex-row gap-2 justify-center items-center">
                {files.map((file, i) => (
                    <div key={i} className="w-full h-60 flex relative">

                        {
                            file.type.startsWith('image/')
                                ? <img className="w-full h-full object-contain object-center  " key={file.name} src={file.preview} alt="Image" />
                                : <div className="border w-full flex items-center justify-center">
                                    <p>{file.name}</p>
                                </div>
                        }
                        <button
                            type='button'
                            className='w-7 h-7  bg-secondary-400 rounded-full flex justify-center items-center absolute top-0 right-0 hover:text-red-500 transition-colors'
                            onClick={() => removeFile(file.name)}
                        >
                            <FaXmark className='w-5 h-5' />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};



export default DropZone;
