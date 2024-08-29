import { TiTick } from "react-icons/ti";
import carGirl from "../../../assets/cargirl.png";

const AboutContent = () => {
    return (
        <div>
            <div className="mx-auto mt-6 md:mt-10 xl:mt-20 xl:mb-20 lg:mt-16 max-w-7xl flex justify-center px-3 md:px-6">
        <div className="grid md:grid-cols-2 gap-10">
          <div className="">
            <div>
              <h1 className="md:text-3xl lg:text-4xl font-bold text-black">
                We Are More Than
              </h1>
              <h1 className="md:text-3xl lg:text-4xl font-bold text-yellow-400">
                A Car Rental Company
              </h1>
              <p className="mt-4 text-gray-700">
                Car repair quisque sodales dui ut varius vestibulum drana tortor
                turpis porttitor tellus eu euismod nisl massa ut odio in the
                miss volume place urna lacinia eros nulla urna mauris vehicula
                rutrum in the miss on volume interdum.
              </p>
            </div>
            <div className="mt-6 space-y-2">
              <div className="flex items-start gap-3 mt-5">
                <div className="bg-gray-300 h-10 w-10 rounded-full flex justify-center items-center">
                  <TiTick />
                </div>
                <p>Economy Cars</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-gray-300 h-10 w-10 rounded-full flex justify-center items-center">
                  <TiTick />
                </div>
                <p>Sports and Luxury Cars</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-gray-300 h-10 w-10 rounded-full flex justify-center items-center">
                  <TiTick />
                </div>
                <p>Modern Cars</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center md:justify-end items-center">
            <div className="relative">
              <div className="relative rounded-md overflow-hidden">
                <img src={carGirl} alt="Car" className="w-[350px] h-[400px] xl:w-[500px] xl:h-[500px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
    );
};

export default AboutContent;