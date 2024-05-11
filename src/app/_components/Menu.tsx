import Link from 'next/link';
import React, { useEffect } from 'react';

const Menu = ({ forwardedRef }: any) => {
  useEffect(() => {
    const handleClickOutsideMenu = (event: any) => {
      if (forwardedRef.current && !forwardedRef.current.contains(event.target)) {
        console.log('hi');
      }
    };

    document.addEventListener('mousedown', handleClickOutsideMenu);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, [forwardedRef]);

  return (
    <div className='absolute top-0 right-0 bg-black p-4' ref={forwardedRef}>
      <ul className='flex flex-col space-y-4'>
        <li>
          <Link href='/'>Home</Link>
        </li>
        <li>
          <Link href='/gallery'>Gallery</Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
