import React from "react";

const Footer = () => {
    return(
        <footer className="text-center opacity-50 mt-10 mb-5 md:mt-28 md:mb-10">
            © {new Date().getFullYear()} &middot; Built with
            <a href={`${process.env.NEXT_PUBLIC_WORDPRESS_BASE_URL}`} target="_blank">{` yasu's `}Blog</a>
        </footer>
    )
}

export default Footer;
