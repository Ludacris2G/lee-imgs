'use client';
import React, { useEffect, useState } from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import CameraIcon from '@mui/icons-material/Camera';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isNarrowScreen, setIsNarrowScreen] = useState(false);

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);

    const resizeWindow = () => {
      setIsNarrowScreen(window.innerWidth < 768);
    };

    window.addEventListener('resize', resizeWindow);

    resizeWindow();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {}, []);

  return (
    <div
      className={`flex justify-between ${
        scrolled ? 'bg-white' : 'bg-transparent'
      } h-14 items-center font-bold font-mono w-full fixed ease-linear duration-500`}
    >
      {/* SOCIAL ICONS */}
      {!isNarrowScreen && (
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
      )}
      {/* LOGO - NAME */}
      <div
        className={`flex align-middle text-[1.7rem] ${
          !isNarrowScreen ? 'ml-[-68px]' : 'ml-2'
        } text-black`}
      >
        <h1 className='tracking-widest'>Lee</h1>
        <CameraIcon className='scale-150 mx-2 my-auto' />
        <h1 className='ml-[-2px] tracking-widest'>imgs</h1>
      </div>
      {/* MENU */}
      <div>
        <MenuIcon className='scale-150 mx-5 text-black' />
      </div>
    </div>
  );
}

export default Navbar;
