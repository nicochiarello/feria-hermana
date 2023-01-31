import { useState, useEffect, useRef } from "react";

const ImagesHandler = ({ setStateData, stateData }) => {
  const [preview, setPreview] = useState({});
  const [images, setImages] = useState({});
  const [imagesToUpdate, setImagesToUpdate] = useState({})
  const fileInputRef = useRef();


  console.log({stateData})
  console.log({ preview });
  useEffect(() => {
    let aux = {}
    if(stateData.images){
      Object.entries(stateData.images).forEach((i)=>{
        aux = ({...aux, [i[0]]: i[1].secureUrl})
      })
    }

    setPreview(aux)
  }, []);


  return (
    <div>
      {" "}
      <div
        className={` flex flex-col py-2 gap-6 max-h-[700px] overflow-y-scroll`}
      >
        <div className="flex flex-col items-center justify-center w-full">
          <label
            for="dropzone-file"
            className="flex flex-col items-center justify-center w-[25rem] h-[28rem] border-2 border-gray-300 bg-gray-600 rounded-lg cursor-pointer"
          >
            {preview ? (
              <img
                className="w-full h-full rounded-lg object-cover"
                src={preview[0]}
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
                  <span className="font-semibold">Sube una imagen</span> o
                  arrastra y suelta
                </p>
              </>
            )}

            <input
              ref={fileInputRef}
              onChange={(event) => {
                const files = event.target.files;
                if (files.length > 0) {
                  // hacer un objeto que guarde los nombres originales en la posicion que se quiere cambiar
                  console.log(files)
                  setImages(files);
                  let previewImagesAux = {};

                  console.log(Object.entries(files));

                  Object.entries(files).forEach((i) => {
                    let blob = URL.createObjectURL(i[1]);
                    previewImagesAux = { ...previewImagesAux, [i[0]]: blob };
                  });

                  setPreview(previewImagesAux);

                  setStateData({ ...stateData, images: files });
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
          <div className="w-full h-[10rem] bg-red-600 flex gap-4">
            {Object.entries(preview).map((i) => {
              // Hacer input que cambie la imagen en la posicion seleccionada 
              if (i[0] !== "0") {
                return <img className="w-[15rem]" key={i} src={i[1]} alt="" />;
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImagesHandler;
