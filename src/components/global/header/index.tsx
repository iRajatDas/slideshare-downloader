import Link from 'next/link';
import React, { FC, HTMLProps } from 'react';

type HeaderProps = HTMLProps<HTMLElement>;

const Header: FC<HeaderProps> = (props) => {
  return (
    <header className="bg-gray-100 h-16 md:h-20 shrink-0 flex items-center justify-center px-4">
      <nav className="py-4 flex justify-between items-center" {...props}>
        <Link
          href={'/'}
          className="inline-block text-xl font-bold tracking-wide"
        >
          <span className="text-primary-brand">SS</span>SLIDESHARE
        </Link>
        <div className="Language"></div>
      </nav>
    </header>
  );
};

export default Header;
