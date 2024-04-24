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
            ref={(el) => (elementsRef.current[3] = el)}
            className={`${abrilFatface.className} absolute top-[52%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:text-7xl lg:text-8xl text-5xl select-none scale-y-[1.5] transition-opacity duration-1000 opacity-0`}
          >
            EXPLORE
          </h1>
          <div
            className='absolute bottom-0 w-full overflow-hidden'
            ref={(el) => (elementsRef.current[4] = el)}
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
          className='flex justify-center items-center flex-col'
        >
          <h1
            ref={(el) => (elementsRef.current[1] = el)}
            className='relative z-2 top-[-50px] opacity-0 text-2xl'
          >
            Freezing Time, Unveiling Memories
          </h1>
          <Image
            ref={(el) => (elementsRef.current[2] = el)}
            src='https://nrrriqbsrzxkhtjbbxsf.supabase.co/storage/v1/object/public/landing/landing-imgs/2.1.jpg'
            alt='Photographer Picture'
            width={600}
            height={0}
            className='rounded-xl bg-contain opacity-0'
          />
        </div>
      </section>
      {/* ABOUT */}
      <section className=''>
        <div
          style={generateImageStyles('1', 'center', '36%', '100vh', true)}
          className='full-width bg-black'
        ></div>
      </section>
      <section></section>
    </div>
  );
};

export default Landing;
