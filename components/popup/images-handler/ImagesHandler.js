import { useState, useEffect, useRef } from "react";
import Resizer from "react-image-file-resizer";

const ImagesHandler = ({ setStateData, stateData }) => {
  const [preview, setPreview] = useState({});
  const [images, setImages] = useState({});
  const [imagesToUpdate, setImagesToUpdate] = useState({});
  const fileInputRef = useRef();
  const [updatedImages, setUpdatedImages] = useState({});

  useEffect(() => {
    let aux = {};
    if (stateData.images) {
      Object.entries(stateData.images).forEach((i) => {
        aux = {
          ...aux,
          [i[0]]: process.env.NEXT_PUBLIC_IMAGE_URL + "/" + i[1].secureUrl,
        };
      });
    }

    setPreview(aux);
  }, []);

  const resizeFile = (file) => {
    return new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        400,
        500,
        "JPEG",
        80,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });
  };

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
              onChange={async (event) => {
                const files = event.target.files;

                if (files.length === 1) {
                  let file = files[0];
                  let fileName = file.name;
                  let blob = URL.createObjectURL(file);
                  let index = 0;
                  setPreview({ ...preview, [index]: blob });
                  setUpdatedImages({
                    ...updatedImages,
                    [index]: fileName,
                  });

                  let resizedFile = await resizeFile(file);
                  setStateData({
                    ...stateData,
                    images: {
                      ...stateData.images,
                      [index]: resizedFile,
                    },
                    updatedImages: {
                      ...updatedImages,
                      [index]: fileName,
                    },
                  });
                  return;
                }

                if (files.length > 0) {
                  setImages(files);
                  let previewImagesAux = {};

                  Object.entries(files).forEach((i) => {
                    let blob = URL.createObjectURL(i[1]);
                    previewImagesAux = { ...previewImagesAux, [i[0]]: blob };
                  });

                  setPreview(previewImagesAux);

                  let filesAux = {};
                  let populateFiles = async () => {
                    for (let file of Object.entries(files)) {
                      let resizedFile = await resizeFile(file[1]);
                      filesAux[file[0]] = resizedFile;
                    }
                  };

                  await populateFiles();

                  setStateData({ ...stateData, images: filesAux });
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

          {Object.keys(preview).length > 1 && (
            <div className="w-full h-[10rem] my-4 px-4 grid grid-cols-3 gap-4 ">
              {Array.from({ length: 4 }, (i, key) => {
                if (preview[key]) {
                  return { [key]: preview[key] };
                } else {
                  return { [key]: null };
                }
              }).map((i, key) => {
                if (i[key] && key !== 0) {
                  return (
                    <label
                      className="flex flex-col overflow-hidden items-center justify-center w-full h-[10rem] border-2 border-gray-300 bg-gray-600 rounded-lg cursor-pointer"
                      key={key}
                    >
                      <input
                        onChange={async (event) => {
                          let file = event.target.files[0];
                          let fileName = file.name;
                          let blob = URL.createObjectURL(file);
                          let index = key;
                          setPreview({ ...preview, [index]: blob });
                          setUpdatedImages({
                            ...updatedImages,
                            [index]: fileName,
                          });

                          let resizedFile = await resizeFile(file);
                          setStateData({
                            ...stateData,
                            images: {
                              ...stateData.images,
                              [index]: resizedFile,
                            },
                            updatedImages: {
                              ...updatedImages,
                              [index]: fileName,
                            },
                          });
                        }}
                        className="hidden"
                        id="dropzone-file"
                        type="file"
                      />
                      <img className="w-[15rem]" src={i[key]} alt="" />
                    </label>
                  );
                } else {
                  if (key !== 0) {
                    return (
                      <label
                        className="flex flex-col overflow-hidden items-center  justify-center w-full h-[10rem] border-2 border-gray-300 bg-gray-600 rounded-lg cursor-pointer"
                        key={key}
                      >
                        <input
                          onChange={async (event) => {
                            let file = event.target.files[0];
                            let fileName = file.name;
                            let blob = URL.createObjectURL(file);
                            let index = key;
                            setPreview({ ...preview, [index]: blob });
                            setUpdatedImages({
                              ...updatedImages,
                              [index]: fileName,
                            });

                            let resizedFile = await resizeFile(file);
                            setStateData({
                              ...stateData,
                              images: {
                                ...stateData.images,
                                [index]: resizedFile,
                              },
                              updatedImages: {
                                ...updatedImages,
                                [index]: fileName,
                              },
                            });
                          }}
                          className="hidden"
                          id="dropzone-file"
                          type="file"
                        />
                      </label>
                    );
                  }
                }
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImagesHandler;
