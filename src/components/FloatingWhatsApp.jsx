import React from 'react';
import './FloatingWhatsApp.css';

const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/12403513209"
      className="floating-whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
    >
      <svg
        viewBox="0 0 32 32"
        className="whatsapp-icon"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M16 2a13.9 13.9 0 0 0-11.85 21.3L2 30l6.9-2.05A13.9 13.9 0 1 0 16 2zm0 25.46a11.53 11.53 0 0 1-5.88-1.6l-.42-.25-4.36 1.3 1.16-4.25-.28-.44A11.53 11.53 0 1 1 16 27.46zm6.3-8.6c-.35-.18-2.04-1-2.35-1.12-.31-.11-.54-.18-.77.18-.23.35-.9 1.12-1.1 1.35-.2.23-.4.26-.74.08-2.18-1.07-3.66-2.04-5.07-4.48-.2-.35 0-.53.18-.7.15-.15.35-.4.53-.6.18-.2.23-.35.35-.6.12-.23.06-.44-.03-.62-.1-.18-.77-1.85-1.06-2.54-.28-.67-.56-.58-.77-.59h-.66c-.23 0-.6.08-.92.44-.31.35-1.2 1.17-1.2 2.85s1.23 3.31 1.4 3.54c.18.23 2.42 3.7 5.86 5.18 1.93.83 2.76.9 3.8.76 1.15-.16 2.04-.84 2.33-1.66.29-.82.29-1.52.2-1.66-.08-.14-.31-.22-.65-.4z" fill="#fff"/>
      </svg>
    </a>
  );
};

export default FloatingWhatsApp;
