import React, { FC, HTMLProps } from "react";

type FooterProps = HTMLProps<HTMLElement>;

const Footer: FC<FooterProps> = (props) => {
  return (
    <footer className="bg-gray-100">
      <nav className="py-16" {...props}>
        Footer
      </nav>
    </footer>
  );
};

export default Footer;
