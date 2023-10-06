import * as React from "react"
import NextLink from "next/link";
import Image from 'next/image';

interface HeaderProps {
    siteTitle: string;
}

const Header = () => (
  <header
    className="sticky top-0 left-0 z-10 flex items-center justify-between w-full px-3 py-2 mx-auto md:py-5 md:px-5"
  >
    <NextLink href="/" passHref={true}>
      Blog Compilation Site
    </NextLink>
    <Image
        alt="logo"
        src="/images/logo.png"
        width={35}
        height={35}
        style={{ width: '35px', height: '35px' }}
    />
  </header>
)

export default Header
