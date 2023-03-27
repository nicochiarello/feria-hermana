import { useRouter } from "next/router";

const ProductsPagination = ({ pages, page }) => {
  const router = useRouter();
  return (
    <div className="w-full py-3  flex items-center justify-end px-4">
      <div className="flex ">
        {Array.from({ length: pages }, (i, key) => (
          <span
          className={`${page == key + 1 && "bg-btn"} rounded-full w-[2rem] h-[2rem] flex items-center justify-center px-1 cursor-pointer`}
            onClick={() =>
              router.push({
                pathname: router.pathname,
                query: { ...router.query, page: key + 1 },
              })
            }
            key={key}
          >
            {key + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ProductsPagination;
