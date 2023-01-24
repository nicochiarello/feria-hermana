import { useState, useEffect, useRef } from "react";

const ImagesHandler = ({setStateData, stateData}) => {
  const [preview, setPreview] = useState({});
  const [images, setImages] = useState({});
  const fileInputRef = useRef();

  console.log({preview})
  useEffect(() => {
    if (images) {
        let previewAux = {}
        Object.entries(images).forEach((i)=>{
            console.log(i[0], "esto llega")
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreview({...preview, [i[0]]: reader.result} );
            };
            reader.readAsDataURL(i[1]);
            console.log("cambio a", preview )
        
      })
    } else {
      setPreview(null);
    }
  }, [images]);
  return (
    <div>
      {" "}
      <div
        className={` flex flex-col py-2 gap-6 max-h-[700px] overflow-y-scroll`}
      >
        <div className="flex items-center justify-center w-full">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-[25rem] h-[28rem] border-2 border-gray-300 bg-gray-600 rounded-lg cursor-pointer"
          >
            {preview ? (
              <img
                className="w-full h-full rounded-lg object-cover"
                src={preview}
              ></img>
            ) : (
              <>
                <svg
                  aria-hidden="true"
                  className="w-10 h-10 mb-3 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Sube una imagen</span> o arrastra y suelta
                </p>
              </>
            )}

            <input
              ref={fileInputRef}
              onChange={(event) => {
                console.log(event.target.files)
                const files = event.target.files;
                if (files.length > 0) {
                  setImages(files);

                    setStateData({...stateData, images: files  })
                } else {
                  setImages(null);
                }
              }}
              id="dropzone-file"
              type="file"
              multiple 
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default ImagesHandler;
