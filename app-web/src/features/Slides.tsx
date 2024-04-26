// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Virtual } from "swiper/modules";
// Import Swiper styles
import "swiper/css";
import "swiper/css/virtual";

import { IPoem } from "./types";
import Poem from "./Poem";

const Slides = ({ poems }: { poems: IPoem[] }) => {
  return (
    <Swiper
      modules={[Virtual]}
      spaceBetween={0}
      slidesPerView={1}
      // onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper: any) => console.log(swiper)}
      virtual
      initialSlide={poems.length - 1}
    >
      {poems.map((poem, index) => (
        <SwiperSlide key={poem.id} virtualIndex={index}>
          <Poem poem={poem} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default Slides;
