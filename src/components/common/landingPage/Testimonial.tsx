
// "use client";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Autoplay } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import { useState, useEffect } from "react";
// import api from "@/utils/api";
// import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
// import { setAllRatings } from "@/lib/store/features/ratingSlice";
// import Image from "next/image"

// const Testimonials = () => {
//   const dispatch = useAppDispatch();
//   const ratings = useAppSelector((state) => state.rating.ratings);
//   const [expandedIndex, setExpandedIndex] = useState<number | null>(null); 

//   const handleReadMore = (index: number) => {
   
//     setExpandedIndex((prevIndex) => (prevIndex === index ? null : index));
//   };

//   useEffect(() => {
//     const fetchRatings = async () => {
//       const response = await api.get(`/rating/findallreviews`);
//       if (response.status === 200) {
//         dispatch(setAllRatings(response.data.allratings));
//       }
//     };
//     fetchRatings();
//   }, [dispatch]);

  
//   const truncateReview = (review: string, maxLength: number) => {
//     if (review.length <= maxLength) return review;
//     return review.slice(0, maxLength) + "...";
//   };

//   return (
//     <section className="py-10">
      
//       <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         <div className="mb-16 text-center">
//           <span className="text-sm text-gray-500 font-medium block mb-2">
//             TESTIMONIAL
//           </span>
//           <h2 className="text-4xl font-bold text-white">
//             What our happy users say!
//           </h2>
//         </div>

//         <Swiper
//           slidesPerView={1}
//           spaceBetween={32}
//           loop={true}
//           centeredSlides={true}
          
//           pagination={{ clickable: true }}
//           autoplay={{ delay: 2500, disableOnInteraction: false }}
//           breakpoints={{
//             640: { slidesPerView: 1, spaceBetween: 32 },
//             768: { slidesPerView: 2, spaceBetween: 32 },
//             1024: { slidesPerView: 3, spaceBetween: 32 },
//           }}
//           modules={[Pagination, Autoplay]}
//           className="mySwiper"
//         >
//           {ratings.map((rating, index) => (
//             <SwiperSlide key={rating._id} >
//               <div className="group bg-white border border-gray-300 rounded-xl p-6 transition-all duration-500 mx-auto hover:border-indigo-600 hover:shadow-sm">
//                 <div className="flex items-center mb-7 gap-2 text-amber-500">
//                   {[...Array(rating.starsRating)].map((_, index) => (
//                     <svg
//                       key={index}
//                       className="w-5 h-5 text-amber-500"
//                       viewBox="0 0 18 17"
//                       fill="currentColor"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M8.10326 1.31699C8.47008 0.57374 9.52992 0.57374 9.89674 1.31699L11.7063 4.98347C11.8519 5.27862 12.1335 5.48319 12.4592 5.53051L16.5054 6.11846C17.3256 6.23765 17.6531 7.24562 17.0596 7.82416L14.1318 10.6781C13.8961 10.9079 13.7885 11.2389 13.8442 11.5632L14.5353 15.5931C14.6754 16.41 13.818 17.033 13.0844 16.6473L9.46534 14.7446C9.17402 14.5915 8.82598 14.5915 8.53466 14.7446L4.91562 16.6473C4.18199 17.033 3.32456 16.41 3.46467 15.5931L4.15585 11.5632C4.21148 11.2389 4.10393 10.9079 3.86825 10.6781L0.940384 7.82416C0.346867 7.24562 0.674378 6.23765 1.4946 6.11846L5.54081 5.53051C5.86652 5.48319 6.14808 5.27862 6.29374 4.98347L8.10326 1.31699Z"
//                       />
//                     </svg>
//                   ))}
//                 </div>


//                 <p className="text-base text-gray-600 leading-6 pb-8 group-hover:text-gray-800 ">
//                   {expandedIndex === index
//                     ? rating.review
//                     : truncateReview(rating.review, 150)}
//                   {rating.review.length > 150 && (
//                     <span
//                       className="text-primary cursor-pointer"
//                       onClick={() => handleReadMore(index)}
//                     >
//                       {expandedIndex === index ? " Read Less" : " Read More"}
//                     </span>
//                   )}
//                 </p>

//                 <div className="flex items-center gap-5 border-t border-gray-200 pt-5 overflow-hidden">  
//                   <Image 
//                   src={rating.userId?.profileImage||"/default-profile.png"}
//                   width={50}
//                   height={50}
//                   alt="profile image"
//                   />
//                   <div>
//                     <h5 className="text-gray-900 font-medium">
//                       {rating.userId?.firstName} {rating.userId?.lastName}
//                     </h5>
//                     <span className="text-sm text-gray-500">
//   {rating.userId?.jobTitle?.[0]}
// </span>

//                   </div>
//                 </div>
//               </div>
//             </SwiperSlide>
//           ))}
//         </Swiper>
//       </div>
//     </section>
//   );
// };

// export default Testimonials;

"use client";

import { setAllRatings } from "@/lib/store/features/ratingSlice";
import { useAppSelector } from "@/lib/store/hooks";
import api from "@/utils/api";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};
export const AnimatedTestimonials = ({
  
  autoplay = false,
}: {
  testimonials: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);
  const testimonials = useAppSelector((state) => state.rating.ratings);

const dispatch=useDispatch()
  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index: number) => {
    return index === active;
  };
useEffect(()=>{
  setTimeout(() => {
    handleNext()
  }, 10000);
})
  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  useEffect(() => {
        const fetchRatings = async () => {
          const response = await api.get(`/rating/findallreviews`);
          if (response.status === 200) {
            dispatch(setAllRatings(response.data.allratings));
          }
        };
        fetchRatings();
      }, [dispatch]);
  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };
  return (
    <div className="max-w-sm  md:max-w-4xl mx-auto antialiased font-sans px-4 md:px-8 lg:px-12 py-20 bg-white">
        <span className="text-sm text-gray-500 font-medium block mb-2">
        TESTIMONIAL           </span>
      <div className="relative grid grid-cols-1 md:grid-cols-2  gap-20">
        
        <div>
      
          <div className="relative h-80 w-full">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 999
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 origin-bottom"
                >
                  <Image
                    src={testimonial.userId.profileImage}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    className="h-full w-full border rounded-3xl object-fill bg-[#715fbf] object-center"
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex justify-between flex-col py-4">
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold dark:text-white text-black">
              {testimonials[active].userId.firstName} {testimonials[active].userId.lastName}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials[active]?.userId.jobTitle}
            </p>
            <motion.p className="text-lg text-gray-500 mt-8 dark:text-neutral-300">
              {testimonials[active].review.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div className="flex gap-4 pt-12 md:pt-0">
            <button
              onClick={handlePrev}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowLeft className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:rotate-12 transition-transform duration-300" />
            </button>
            <button
              onClick={handleNext}
              className="h-7 w-7 rounded-full bg-gray-100 dark:bg-neutral-800 flex items-center justify-center group/button"
            >
              <IconArrowRight className="h-5 w-5 text-black dark:text-neutral-400 group-hover/button:-rotate-12 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
