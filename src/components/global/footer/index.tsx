import React, { FC, HTMLProps } from "react";

type FooterProps = HTMLProps<HTMLElement>;

const Footer: FC<FooterProps> = (props) => {
  return (
    <header className="bg-gray-100">
      <nav className="py-16" {...props}>
        Footer
      </nav>
    </header>
  );
};

export default Footer;
