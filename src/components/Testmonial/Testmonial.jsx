import { useEffect, useState, useRef } from "react";
import UseAxiosCommon from "@/hooks/UseAxiosCommon";
import { Star } from "lucide-react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const Testmonial = () => {
  const axiosCommon = UseAxiosCommon();
  const [feedbacks, setFeedbacks] = useState([]);
  const swiperRef = useRef(null); // To control Swiper manually

  useEffect(() => {
    axiosCommon
      .get("feedbacks")
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [axiosCommon]);

  const handleSlideLeft = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleSlideRight = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  return (
    <div className="  container mx-auto p-10">
      <div className="bg-[#F1F5F9] container mx-auto rounded-2xl border-sky-300 shadow-md shadow-sky-200 text-black">
        <div className="lg:px-20 px-5 py-5 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="my-auto space-y-2 lg:space-y-4 flex-1 lg:text-start text-center">
              <h1 className="text-xl font-bold">Clients Feedback</h1>
              <h2 className="lg:text-3xl text-sm lg:font-bold">
                What Our Happy <br />
                Customers Are Saying
              </h2>
              <p className="text-sm">
                Here are the thoughts from our team on how collaboration helps
                us achieve success together. And reviews from our talented users
                who are using this extraordinary team collaboration tool.
              </p>
            </div>

            {/* Swiper Implementation for Sliding Cards */}
            <div className="bg-white p-5 lg:p-14 rounded-2xl flex-1 lg:w-[600px]">
              <Swiper
                spaceBetween={20}
                slidesPerView={1}
                loop={true}
                pagination={{ clickable: true }}
                className="swiper-container"
                onSwiper={(swiper) => (swiperRef.current = swiper)}
              >
                {feedbacks.map((feedback, index) => (
                  <SwiperSlide key={index}>
                    <div className="bg-white rounded-xl shadow-sm flex flex-col sm:flex-row h-auto sm:h-60">
                      <div className="shrink-0 sm:w-60 relative rounded-xl overflow-hidden sm:pt-[40%]">
                        <img
                          className="size-full absolute top-0 start-0 object-cover w-full h-full sm:h-auto"
                          src={feedback.image}
                          alt={feedback.name}
                        />
                      </div>
                      <div className="flex flex-col sm:flex-wrap w-full sm:w-auto">
                        <div className="px-4 py-2 sm:px-8 sm:py-2 flex flex-col justify-between h-full">
                          <h3 className="text-lg font-bold text-gray-800 py-2 sm:py-3 text-center sm:text-start">
                            {feedback.name}
                          </h3>
                          <div className="flex justify-center sm:justify-start">
                            {Array.from({ length: feedback.rating }, (_, i) => (
                              <Star key={i} className="text-yellow-400" />
                            ))}
                          </div>
                          <p className="mt-2 text-gray-500 text-center sm:text-start">
                            {feedback.feedback}
                          </p>
                          <div className="mt-5 sm:mt-auto flex justify-center sm:justify-start gap-3">
                            <button
                              className="bg-black p-3 rounded-full text-yellow-600"
                              onClick={handleSlideLeft}
                            >
                              <FaChevronLeft />
                            </button>
                            <button
                              className="bg-black p-3 rounded-full text-yellow-600"
                              onClick={handleSlideRight}
                            >
                              <FaChevronRight />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

       
        </div>
      </div>
    </div>
  );
};

export default Testmonial;
