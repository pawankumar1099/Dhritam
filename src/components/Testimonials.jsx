import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

// Available assets
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.png'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.jpg'
import img6 from '../assets/img6.jpg'
// 3 cards per side — heights alternate to create stagger rhythm
const leftCards = [
  { src: img1,   alt: "Customer recovery journey", h: "h-32 md:h-40", delay: 0.1  },
  { src: img4,    alt: "Customer wearing Dhritam",  h: "h-44 md:h-52", delay: 0.22 },
  { src: img2,      alt: "Dhritam core device",       h: "h-28 md:h-36", delay: 0.34 },
];

const rightCards = [
  { src: img6,    alt: "Kavach X cardiac sensor",  h: "h-28 md:h-36", delay: 0.1  },
  { src: img3,     alt: "Agna BCI headband",         h: "h-44 md:h-52", delay: 0.22 },
  { src: img5,alt: "Dhritam hub device",        h: "h-32 md:h-40", delay: 0.34 },
];

const PhotoCard = ({ src, alt, h, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 36, scale: 0.93 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    transition={{ duration: 0.65, delay, ease: "easeOut" }}
    viewport={{ once: true, amount: 0.15 }}
    whileHover={{ y: -7, scale: 1.03, transition: { duration: 0.2 } }}
    className={`rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm shadow-[0_8px_32px_rgba(0,0,0,0.55)] w-full shrink-0 ${h}`}
  >
    <img src={src} alt={alt} className="w-full h-full object-cover" />
  </motion.div>
);

const Testimonials = ({ onOpenOnboarding }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <section
      ref={ref}
      className="relative w-full h-full bg-black py-20 md:py-28 overflow-hidden z-1000"
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-300 mx-auto px-6 flex flex-col md:flex-row items-center gap-10 md:gap-8">

        {/* ── LEFT: single column of 3, offset downward ── */}
        <div className="hidden md:flex flex-col gap-4 w-52 lg:w-60 shrink-0 mt-10">
          {leftCards.map((c, i) => <PhotoCard key={i} {...c} />)}
        </div>

        {/* ── CENTER CONTENT ── */}
        <div className="flex-1 flex flex-col items-center text-center px-2">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-5 px-4 py-1.5 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-white/60 text-xs uppercase tracking-[0.25em] font-outfit"
          >
            Real Stories
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[2.2rem] md:text-[2.8rem] lg:text-[3.2rem] font-extrabold leading-[1.1] tracking-tight zalando-sans-expanded-font mb-1"
          >
            <span className="text-white">Lives changed</span>
            <br />
            <span className="text-white/35">of our customers</span>
          </motion.h2>

          {/* Decorative line */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
            className="w-16 h-px bg-accent/60 my-5 origin-center"
          />

          {/* Sub-copy */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
            className="text-white/50 text-[0.95rem] md:text-[1.05rem] leading-[1.6] max-w-90 font-outfit"
          >
            Hear from real people who wore Dhritam and took back control of their
            heart health — one beat at a time.
          </motion.p>

          {/* CTA */}
          {/* <motion.button
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.55 }}
            onClick={onOpenOnboarding}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mt-8 inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 rounded-full font-semibold text-[0.95rem] hover:shadow-[0_10px_30px_rgba(255,255,255,0.15)] transition-all duration-300 cursor-pointer"
          >
            Read Their Stories <ArrowUpRight size={18} />
          </motion.button> */}
        </div>

        {/* ── RIGHT: single column of 3, offset upward ── */}
        <div className="hidden md:flex flex-col gap-4 w-52 lg:w-60 shrink-0 mt-10">
          {rightCards.map((c, i) => <PhotoCard key={i} {...c} />)}
        </div>

        {/* ── MOBILE: horizontal scroll strip ── */}
        <div className="flex md:hidden w-full overflow-x-auto gap-3 pb-2 scrollbar-hide">
          {[...leftCards, ...rightCards].map((card, i) => (
            <div
              key={i}
              className="shrink-0 w-28 h-32 rounded-xl overflow-hidden border border-white/10 bg-white/5"
            >
              <img src={card.src} alt={card.alt} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
