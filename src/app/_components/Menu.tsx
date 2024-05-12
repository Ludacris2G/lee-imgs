import Link from 'next/link';
import React, { useEffect } from 'react';

const Menu = ({ forwardedRef, onCloseMenu }: any) => {
  useEffect(() => {
    const handleClickOutsideMenu = (event: any) => {
      if (
        forwardedRef.current &&
        !forwardedRef.current.contains(event.target)
      ) {
        console.log('hi');
      }
    };

    document.addEventListener('mousedown', handleClickOutsideMenu);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideMenu);
    };
  }, [forwardedRef]);

  const handleLinkClick = () => {
    onCloseMenu();
  };

  return (
    <div
      className='absolute top-0 right-0 bg-white p-5 pr-20 z-10 text-black'
      ref={forwardedRef}
    >
      <ul className='flex flex-col space-y-4'>
        <li>
          <Link onClick={handleLinkClick} href='/'>
            Home
          </Link>
        </li>
        <li>
          <Link onClick={handleLinkClick} href='/gallery'>
            Gallery
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Menu;
