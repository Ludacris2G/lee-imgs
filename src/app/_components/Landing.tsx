'use client';
import React, { lazy, useCallback, useEffect, useRef, useState } from 'react';
import { GetPicturesResponse } from '../../../types/types';
import { Abril_Fatface } from 'next/font/google';
import SquareIcon from '@mui/icons-material/Square';
import Image from 'next/image';
import Link from 'next/link';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import CameraIcon from '@mui/icons-material/Camera';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';

const abrilFatface = Abril_Fatface({
  subsets: ['latin'],
  weight: '400',
});

const images = [
  {
    src: 'https://nrrriqbsrzxkhtjbbxsf.supabase.co/storage/v1/object/public/landing/landing-imgs/2.jpg',
    width: 1600,
    height: 800,
  },
  {
    src: 'https://nrrriqbsrzxkhtjbbxsf.supabase.co/storage/v1/object/public/landing/landing-imgs/2.jpg',
    width: 1,
    height: 1,
  },
];

const widths = [500, 1000];
const ratios = [1, 2, 6];

const Landing = (props: GetPicturesResponse | undefined) => {
  console.log(props);
  const [showFadeIns, setShowFadeIns] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const elementsRef = useRef<Array<HTMLDivElement | null>>([]);
  const elementsRefY = useRef<Array<HTMLDivElement | null>>([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const aboutSectionRef = useRef<HTMLDivElement | null>(null);

  const scrollToAbout = () => {
    aboutSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCopyEmail = () => {
    const email = 'lee.imgsx@gmail.com';
    navigator.clipboard
      .writeText(email)
      .then(() => {
        alert('Email copied to clipboard!');
      })
      .catch((error) => {
        console.error('Unable to copy to clipboard', error);
      });
  };

  const openLightbox = useCallback((index: number) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

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

  // was 0.1
  const parallaxFactor = 0.03;

  const parallaxStyles = {
    backgroundImage: `../_assets/structures/2.jpg')`,
    backgroundAttachment: 'fixed',
    // backgroundPosition: 'center 100%',
    backgroundPosition: `center ${100 - scrollPosition * parallaxFactor}%`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '100%',
    height: '100%',
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

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3,
    };

    const observerY = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('pop-up');
        } else {
          entry.target.classList.remove('pop-up');
        }
      });
    }, options);

    elementsRefY.current.forEach((ref) => {
      if (ref) {
        observerY.observe(ref);
      }
    });

    return () => {
      observerY.disconnect();
    };
  });

  return (
    <div className='full-width'>
      {/* LANDING */}
      <section className='bg-black z-10 overflow-hidden'>
        <div
          style={generateImageStyles('1', 'center', '36%', '100vh', false)}
          className='full-width bg-black relative'
        >
          <h1
            ref={(el) => (elementsRef.current[1] = el)}
            className={`${abrilFatface.className} absolute top-[52%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 sm:text-7xl lg:text-8xl text-5xl select-none scale-y-[1.5] transition-opacity duration-1000 opacity-0 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.2)]
            `}
          >
            EXPLORE
          </h1>
          <div
            className='w-full overflow-hidden absolute bottom-0'
            ref={(el) => (elementsRef.current[2] = el)}
          >
            <div className='flex justify-center'>
              <SquareIcon
                className={`h-[100px] scale-x-[.5] scale-y-[90] opacity-70 transition-opacity duration-1000`}
                style={{
                  height: showFadeIns ? '200px' : '0',
                  transition: 'height 1s ease',
                }}
              />
            </div>
          </div>
        </div>
      </section>
      {/* PHOTOGRAPHER */}
      <section className='bg-black'>
        <div
          style={generateImageStyles('2', 'center', '36%', '100vh', false)}
          className='flex flex-col align-middle justify-center'
        >
          <h1
            ref={(el) => (elementsRefY.current[3] = el)}
            className={`z-20 opacity-0 text-[2em] sm:text-[3em] lg:text-[3em]  font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,1)]  top-10 text-center translate-y-[10px]
            `}
          >
            Freezing Time, Unveiling Memories
          </h1>
          <a
            onClick={scrollToAbout}
            className='mb-20 lg:mb-5 mt-10 border-2 w-auto p-2 rounded-md m-auto hover:bg-white hover:text-black cursor-pointer translate-y-[10px] opacity-0'
            // ref={(el) => (elementsRefY.current[1] = el)}
          >
            DISCOVER
          </a>
          <div className='flex justify-center items-center flex-col relative'>
            <div className='flex flex-row'>
              <div className='z-10'>
                <Image
                  ref={(el) => (elementsRefY.current[4] = el)}
                  src='https://nrrriqbsrzxkhtjbbxsf.supabase.co/storage/v1/object/public/landing/landing-imgs/2.6.jpg'
                  alt='Photographer Picture'
                  width={800}
                  height={0}
                  className='rounded-xl bg-contain opacity-0 translate-x-[35%] z-10 object-cover transition-opacity duration-[1s] translate-y-[10px]'
                  loading='lazy'
                />
              </div>
              <div className=''>
                {/* CENTER IMAGE */}
                <Image
                  ref={(el) => (elementsRefY.current[5] = el)}
                  src='https://nrrriqbsrzxkhtjbbxsf.supabase.co/storage/v1/object/public/landing/landing-imgs/2.1.jpg'
                  alt='Photographer Picture'
                  width={2000}
                  height={0}
                  className='rounded-xl bg-contain opacity-0 transition-opacity duration-[1s] lg:max-w-[90%] translate-y-[20px]'
                  loading='lazy'
                />
              </div>
              <div
                ref={(el) => (elementsRefY.current[2] = el)}
                className='translate-y-[20px]'
              >
                <Image
                  ref={(el) => (elementsRef.current[6] = el)}
                  src='https://nrrriqbsrzxkhtjbbxsf.supabase.co/storage/v1/object/public/landing/landing-imgs/2.2.jpg'
                  alt='Photographer Picture'
                  width={800}
                  height={0}
                  className='rounded-xl bg-contain opacity-0 translate-x-[-29%] translate-y-[-14%]'
                  loading='lazy'
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ABOUT */}
      <section id='about' ref={aboutSectionRef} className=''>
        <div
          style={generateImageStyles(
            '3',
            'center',
            '36%',
            'fit-content',
            false
          )}
          className='full-width bg-black flex flex-col-reverse lg:grid grid-cols-2 p-10 items-center'
        >
          <div className='bg-black bg-opacity-70 p-2 rounded-lg'>
            <h1
              ref={(el) => (elementsRefY.current[6] = el)}
              className='text-[2rem] white font-semibold text-orange translate-y-[20px] opacity-0'
            >
              About The Photographer
            </h1>
            <br />
            <p
              ref={(el) => (elementsRefY.current[7] = el)}
              className='center opacity-0'
            >
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
              ref={(el) => (elementsRefY.current[8] = el)}
              src='https://nrrriqbsrzxkhtjbbxsf.supabase.co/storage/v1/object/public/landing/landing-imgs/3.1.jpg'
              alt='Photographer Picture'
              width={300}
              height={0}
              className='rounded-xl object-cover mb-2 lg:mb-0 translate-y-[20px] opacity-0'
              loading='lazy'
            />
          </div>
        </div>
      </section>
      <section>
        <div
          style={generateImageStyles(
            '4',
            'center',
            '36%',
            'fit-content',
            false
          )}
          className='full-width bg-black p-10'
        >
          {props && props.data && props.data.section1 && (
            <div className=''>
              {/* <PhotoAlbum layout='rows' photos={images} /> */}
              <ResponsiveMasonry
                columnsCountBreakPoints={{ 350: 3, 750: 3, 900: 4 }}
              >
                <Masonry gutter='10px'>
                  {props.data.section1.map((img, index) => (
                    <Image
                      src={img.src}
                      onClick={() => openLightbox(index)}
                      loading='lazy'
                      alt={String(index)}
                      key={index}
                      width={200}
                      height={100}
                    />
                  ))}
                </Masonry>
              </ResponsiveMasonry>
              {viewerIsOpen && (
                <div className='lightbox-modal' onClick={closeLightbox}>
                  <div className='lightbox-content'>
                    <Image
                      src={props.data.section1[currentImage].src}
                      alt={`Image ${currentImage + 1}`}
                      className='lightbox-image'
                      width={400}
                      height={100}
                    />
                  </div>
                </div>
              )}
              {/* <Gallery {...{ images, widths, ratios }} /> */}
              {/* <div className='gallery-grid'>
                {props.data.section1.map((image, index) => (
                  <div
                    key={index}
                    className='gallery-item'
                    onClick={() => openLightbox(index)}
                  >
                    <img src={image.src} />
                  </div>
                ))}
              </div> */}
              {/* <Gallery photos={props?.data.section1} onClick={openLightbox} /> */}
              {/* <ModalGateway>
                {viewerIsOpen ? (
                  <Modal onClose={closeLightbox}>
                    <Carousel
                      currentIndex={currentImage}
                      views={
                        props?.data?.section1.map((x) => ({
                          ...x,
                        })) || []
                      }
                    />
                  </Modal>
                ) : null}
              </ModalGateway> */}
            </div>
          )}
        </div>
      </section>
      <section>
        <div
          style={generateImageStyles(
            'cars',
            'center',
            '36%',
            'fit-content',
            false
          )}
          className='p-3 lg:px-[20%]'
        >
          <h1 className='text-4xl lg:text-6xl text-center font-extrabold tracking-widest bg-black bg-opacity-70 rounded-lg py-1'>
            SERVICES
          </h1>
          <div className='mt-10 bg-black bg-opacity-70 p-2 rounded-lg'>
            <h1 className='font-bold text-xl text-orange lg:text-3xl'>
              PHOTOGRAPHY
            </h1>
            <li>
              Possible in all types of weather conditions and lighting settings.
              Final product is delivered in JPG format after the Lightroom
              post-processing of the RAW files.
            </li>
            <div className='pl-5'>
              <h1 className='mt-2 text-orange font-bold lg:text-3xl'>
                PHOTOGRAPHY GEAR
              </h1>
              <li>Canon R6 Mark ii</li>
              <li>Canon 24-105mm Lens + UV Filter</li>
              <li>24.2 MP</li>
            </div>
          </div>
          <div className='mt-10 bg-black bg-opacity-70 p-2 rounded-lg'>
            <h1 className='font-bold text-xl text-orange lg:text-3xl'>
              VIDEOGRAPHY
            </h1>
            <li>
              Can be done to accomodate any type of visual storytelling, whether
              it's content for social media like Instagram (vertical) or
              cinematic masterpieces for platforms like YouTube (horizontal).
              This can include timelapsing, slow motion (120fps) or any other
              modes.
            </li>
            <div className='pl-5'>
              <h1 className='mt-2 text-orange font-bold lg:text-3xl'>
                PHOTOGRAPHY GEAR
              </h1>
              <li>Up to 4K 60FPS video recording</li>
              <li>Dual Pixel CMOS AF for precise focusing</li>
              <li>
                Dual in-body and in-lens image stabilization for smooth footage
              </li>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          style={generateImageStyles(
            'mountains',
            'center',
            '36%',
            'fit-content',
            false
          )}
          className='full-width p-10 lg:px-[20%] flex flex-col'
        >
          <h1 className='text-6xl text-center mb-4'>GALLERY</h1>
          <Link href='/gallery' className='mx-auto'>
            <button className='mx-auto border p-3 hover:bg-white hover:text-black transition-all duration-300 text-2xl'>
              STILLS
            </button>
          </Link>
        </div>
      </section>
      <footer className='h-80 flex justify-center align-middle'>
        <div className='flex space-x-2 pl-4 text-black'>
          <a target='_blank' href='https://www.instagram.com/lee.imgs/'>
            <InstagramIcon />
          </a>
          <a href='#' onClick={() => handleCopyEmail()}>
            <EmailIcon />
          </a>
          <a target='_blank' href='https://ludacris2g.github.io/'>
            <CodeIcon />
          </a>
          <a
            target='_blank'
            href='https://www.youtube.com/channel/UCNA0BgcHQbIHaCXo6Hb5p4w'
          >
            <YouTubeIcon />
          </a>
        </div>
        <div>
          <h1>© 2024 // @Lee.imgs</h1>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
