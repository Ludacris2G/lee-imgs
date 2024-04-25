'use client';
import React, { useEffect, useRef, useState } from 'react';
import { GetPicturesResponse } from '../../../types/types';
import { Abril_Fatface } from 'next/font/google';
import SquareIcon from '@mui/icons-material/Square';
import Image from 'next/image';

const abrilFatface = Abril_Fatface({
  subsets: ['latin'],
  weight: '400',
});

const Landing = (props?: GetPicturesResponse | undefined) => {
  const [showFadeIns, setShowFadeIns] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const elementsRef = useRef<Array<HTMLDivElement | null>>([]);

  const generateImageStyles = (
    picNumber: any,
    horizontalPosition: string,
    verticalPosition: string,
    height: string,
    isFixed: boolean
  ) => {
    const imageStyle = {
      backgroundImage: `url('https://nrrriqbsrzxkhtjbbxsf.supabase.co/storage/v1/object/public/landing/landing-imgs/${picNumber}.jpg')`,
      backgroundAttachment: `${isFixed ? 'fixed' : ''}`,
      backgroundPosition: !isFixed
        ? `${horizontalPosition} ${verticalPosition}`
        : `${horizontalPosition} ${100 - scrollPosition * parallaxFactor}%`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: `${height}`,
    };

    return imageStyle;
  };

  const parallaxFactor = 0.1;

  const parallaxStyles = {
    backgroundImage: `url('https://nrrriqbsrzxkhtjbbxsf.supabase.co/storage/v1/object/public/landing/landing-imgs/2.jpg')`,
    backgroundAttachment: 'fixed',
    // backgroundPosition: 'center 100%',
    backgroundPosition: `center ${100 - scrollPosition * parallaxFactor}%`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    height: '100vh',
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowFadeIns(true);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        } else {
          entry.target.classList.remove('fade-in');
        }
      });
    }, options);

    elementsRef.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  });

  return (
    <div className='full-width'>
      {/* LANDING */}
      <section className='bg-black z-10 overflow-hidden'>
        <div
          style={generateImageStyles('1', 'center', '36%', '100vh', false)}
          className='full-width bg-black'
        >
          <h1
            ref={(el) => (elementsRef.current[1] = el)}
            className={`${abrilFatface.className} absolute top-[52%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:text-7xl lg:text-8xl text-5xl select-none scale-y-[1.5] transition-opacity duration-1000 opacity-0 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]
            `}
          >
            EXPLORE
          </h1>
          <div
            className='absolute bottom-0 w-full overflow-hidden'
            ref={(el) => (elementsRef.current[2] = el)}
          >
            <div className='h-[200px] flex justify-center'>
              <SquareIcon
                className={`h-[100px] scale-x-[.5] scale-y-[90] opacity-70 transition-opacity duration-1000`}
                style={{
                  height: showFadeIns ? '200px' : '0',
                  transition: 'height 10s ease',
                }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* PHOTOGRAPHER */}
      <section className='bg-black'>
        <div
          style={generateImageStyles('2', 'center', '36%', '100vh', true)}
          className='flex flex-col align-middle justify-center'
        >
          <h1
            ref={(el) => (elementsRef.current[3] = el)}
            className={`z-20 opacity-0 text-[2em] sm:text-[3em] lg:text-[3em]  font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]  top-10 text-center
            `}
          >
            Freezing Time, Unveiling Memories
          </h1>
          <button className='mb-20 lg:mb-5 mt-10 border-2 w-auto p-2 rounded-md m-auto hover:bg-white hover:text-black'>
            DISCOVER
          </button>
          <div className='flex justify-center items-center flex-col relative'>
            <div className='flex flex-row'>
              <div className='z-10'>
                <Image
                  ref={(el) => (elementsRef.current[4] = el)}
                  src='https://nrrriqbsrzxkhtjbbxsf.supabase.co/storage/v1/object/public/landing/landing-imgs/2.6.jpg'
                  alt='Photographer Picture'
                  width={800}
                  height={0}
                  className='rounded-xl bg-contain opacity-0 translate-x-[35%] translate-y-[0%] z-10 object-cover transition-opacity duration-[1s]'
                />
              </div>
              <div className=''>
                {/* CENTER IMAGE */}
                <Image
                  ref={(el) => (elementsRef.current[5] = el)}
                  src='https://nrrriqbsrzxkhtjbbxsf.supabase.co/storage/v1/object/public/landing/landing-imgs/2.1.jpg'
                  alt='Photographer Picture'
                  width={2000}
                  height={0}
                  className='rounded-xl bg-contain opacity-0 transition-opacity duration-[1s] lg:max-w-[90%]'
                />
              </div>
              <div>
                <Image
                  ref={(el) => (elementsRef.current[6] = el)}
                  src='https://nrrriqbsrzxkhtjbbxsf.supabase.co/storage/v1/object/public/landing/landing-imgs/2.2.jpg'
                  alt='Photographer Picture'
                  width={800}
                  height={0}
                  className='rounded-xl bg-contain opacity-0 translate-x-[-29%] translate-y-[-14%] transition-opacity duration-[1s]'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ABOUT */}
      <section className=''>
        <div
          style={generateImageStyles('3', 'center', '36%', 'fit-content', true)}
          className='full-width bg-black flex flex-col-reverse lg:grid grid-cols-2 p-10 items-center'
        >
          <div className='bg-black bg-opacity-70 p-2'>
            <h1 className='text-[2rem] white font-semibold text-orange'>
              About The Photographer
            </h1>
            <br />
            <p className='center'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
              temporibus dolore numquam eveniet perferendis mollitia! Ipsam
              aliquid optio doloribus harum quidem provident, distinctio,
              reiciendis quis laudantium reprehenderit ipsum nam neque nulla
              dolore, esse laboriosam? Doloribus nulla consectetur, ipsa,
              doloremque unde maiores blanditiis ratione enim cupiditate tempore
              quaerat iure accusamus debitis. Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ipsam unde consequuntur nesciunt in
              labore assumenda reiciendis iste velit dolore enim nemo, fuga
              veritatis accusantium delectus quis dolor. Qui, quod fugit
              laboriosam dolorem modi itaque nulla. Optio quis natus enim
              ducimus sequi quasi accusantium facere amet necessitatibus, animi
              consequuntur, aperiam fugit, doloribus quibusdam quidem
              dignissimos nobis quo minima dolorum dolorem. Maiores rem
              laudantium corporis perspiciatis nemo labore vero saepe ipsa
              obcaecati quidem iure iste, delectus a, quam modi optio
              voluptatem, nihil hic omnis assumenda explicabo? Alias fugiat sunt
              molestiae saepe aliquam reiciendis numquam quae. Laboriosam,
              voluptas! Consectetur perspiciatis fuga esse fugit!
            </p>
          </div>
          <div className='flex justify-center'>
            <Image
              ref={(el) => (elementsRef.current[7] = el)}
              src='https://nrrriqbsrzxkhtjbbxsf.supabase.co/storage/v1/object/public/landing/landing-imgs/3.1.jpg'
              alt='Photographer Picture'
              width={400}
              height={0}
              className='rounded-xl object-cover mb-2 lg:mb-0'
            />
          </div>
        </div>
      </section>
      <section>
        <div
          style={generateImageStyles('1', 'center', '36%', '100vh', true)}
          className='full-width bg-black grid grid-cols-2 p-10'
        ></div>
      </section>
    </div>
  );
};

export default Landing;
