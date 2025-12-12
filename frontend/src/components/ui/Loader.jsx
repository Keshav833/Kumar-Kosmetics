import Lottie from "lottie-react";
import loaderCommon from "../../assets/loader.json";

const Loader = () => {
  return (
    <div className="loader-screen fixed inset-0 bg-white flex justify-center items-center z-[9999]">
       <div className="w-[150px] h-[150px]">
          <Lottie animationData={loaderCommon} loop={true} />
       </div>
    </div>
  );
};

export default Loader;
