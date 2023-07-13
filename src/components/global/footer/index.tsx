import Link from 'next/link';
import React, { FC, HTMLProps } from 'react';

type FooterProps = HTMLProps<HTMLElement>;

const Footer: FC<FooterProps> = (props) => {
  return (
    <footer className="shrink-0 py-12 px-4">
      <nav className="" {...props}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold tracking-tight ">Tools</h3>
            <ul className="text-gray-700 space-y-2">
              <li>
                <Link href="#">Insta Story Downloader</Link>
              </li>
              <li>
                <Link href="#">Reel Downloader</Link>
              </li>
              <li>
                <Link href="#">TikTok Downloader</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold tracking-tight ">Support</h3>
            <ul className="text-gray-700 space-y-2">
              <li>
                <Link href="#">Contact</Link>
              </li>
              <li>
                <Link href="#">Blog</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="font-semibold tracking-tight ">Legal</h3>
            <ul className="text-gray-700 space-y-2">
              <li>
                <Link href="#">Privacy Policy</Link>
              </li>
              <li>
                <Link href="#">Terms and Services</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </footer>
  );
};

export default Footer;
