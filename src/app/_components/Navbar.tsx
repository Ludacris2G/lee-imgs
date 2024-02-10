'use client';
import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import CodeIcon from '@mui/icons-material/Code';
import CameraIcon from '@mui/icons-material/Camera';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';

// MOVE ->
import { Database } from '../../../types/supabase';
import { createClient } from '@supabase/supabase-js';
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient<Database>(SUPABASE_URL || '', ANON_KEY || '');

const getData = async () => {
  const { data, error } = await supabase.storage.listBuckets();
  console.log(data);
};
// ->>>

getData();
function Navbar() {
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

  return (
    <div className='flex justify-between bg-dark-teal h-14 items-center font-bold font-mono'>
      <div className='flex space-x-1 pl-1'>
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
      <div className='flex align-middle text-[1.7rem]'>
        <h1 className='tracking-widest'>Lee</h1>
        <CameraIcon className='scale-150 mx-2 my-auto' />
        <h1 className='ml-[-2px] tracking-widest'>imgs</h1>
      </div>
      <div>
        <MenuIcon className='scale-150 mx-5' />
      </div>
    </div>
  );
}

export default Navbar;
