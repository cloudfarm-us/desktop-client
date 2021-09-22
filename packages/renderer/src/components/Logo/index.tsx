import { chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react';

export const Logo = (props: HTMLChakraProps<'svg'>) => {
  return (
    <chakra.svg
      aria-hidden
      color={useColorModeValue('blue.500', 'blue.300')}
      viewBox="0 0 123 24"
      fill="none"
      h="6"
      flexShrink={0}
      {...props}
    >
      <svg
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 540.07 276.83"
      >
        <defs>
          <linearGradient
            id="New_Gradient_Swatch"
            x1="4.97"
            y1="269.27"
            x2="545.03"
            y2="269.27"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" stopColor="#585be8" />
            <stop offset="1" stopColor="#0ef" />
          </linearGradient>
        </defs>
        <path
          className="cls-1"
          d="M93.15,407.71c-15,0-26.06-12.26-26.06-27.76v-.16c0-15.34,10.89-27.92,26.49-27.92,9.59,0,15.32,3.4,20,8.33l-7.12,8.72c-3.92-3.78-7.91-6.09-13-6.09-8.56,0-14.73,7.55-14.73,16.81v.15c0,9.26,6,17,14.73,17,5.81,0,9.37-2.47,13.36-6.32l7.11,7.63C108.75,404,103,407.71,93.15,407.71Z"
          transform="translate(-4.97 -130.89)"
          fill="#2a98ff"
        />
        <path
          className="cls-1"
          d="M122.25,407.71V352.63h11v55.08Z"
          transform="translate(-4.97 -130.89)"
          fill="#2a98ff"
        />
        <path
          className="cls-1"
          d="M162.75,407.71a20.59,20.59,0,0,1-21-20.9v-.15a21.05,21.05,0,0,1,42.1-.15v.15A20.81,20.81,0,0,1,162.75,407.71Zm10.24-21c0-6-4.14-11.17-10.24-11.17-6.31,0-10.09,5.06-10.09,11v.15c0,6,4.14,11.17,10.24,11.17,6.31,0,10.09-5.06,10.09-11Z"
          transform="translate(-4.97 -130.89)"
          fill="#2a98ff"
        />
        <path
          className="cls-1"
          d="M216.17,407v-5.74c-2.54,3.4-5.8,6.49-11.39,6.49-8.35,0-13.21-5.73-13.21-15V366.51h11v22.56c0,5.44,2.47,8.23,6.68,8.23s6.89-2.79,6.89-8.23V366.51h11V407Z"
          transform="translate(-4.97 -130.89)"
          fill="#2a98ff"
        />
        <path
          className="cls-1"
          d="M265.16,407v-5.81c-2.68,3.77-6.38,6.56-12.12,6.56-9.07,0-17.71-7.39-17.71-20.9v-.15c0-13.51,8.49-20.9,17.71-20.9a14.75,14.75,0,0,1,12.12,6V351.87h11V407Zm.15-20.3c0-6.72-4.28-11.17-9.44-11.17s-9.51,4.38-9.51,11.17v.15c0,6.72,4.36,11.17,9.51,11.17s9.44-4.45,9.44-11.17Z"
          transform="translate(-4.97 -130.89)"
          fill="#2a98ff"
        />
        <path
          className="cls-1"
          d="M298.41,365.46V376.7h24.24v10.56H298.41v20.45H287.23V354.89h38.69v10.57Z"
          transform="translate(-4.97 -130.89)"
          fill="#2a98ff"
        />
        <path
          className="cls-1"
          d="M354.66,407v-4.38a14.72,14.72,0,0,1-11.76,5.13c-7.33,0-13.36-4.37-13.36-12.37v-.15c0-8.83,6.46-12.91,15.68-12.91a26.74,26.74,0,0,1,9.51,1.66v-.68c0-4.75-2.83-7.39-8.35-7.39a27.64,27.64,0,0,0-10.74,2.19l-2.76-8.76a33.24,33.24,0,0,1,15.1-3.24c12,0,17.35,6.49,17.35,17.43V407Zm.21-16.3a16.44,16.44,0,0,0-7-1.51c-4.71,0-7.62,2-7.62,5.58v.16c0,3.09,2.47,4.9,6,4.9,5.15,0,8.63-2.94,8.63-7.09Z"
          transform="translate(-4.97 -130.89)"
          fill="#2a98ff"
        />
        <path
          className="cls-1"
          d="M397.7,378.51c-7.33,0-11.83,4.6-11.83,14.26v14.94h-11V367.27h11v8.15c2.25-5.59,5.88-9.21,12.41-8.91v12Z"
          transform="translate(-4.97 -130.89)"
          fill="#2a98ff"
        />
        <path
          className="cls-1"
          d="M453.51,407.71V385.15c0-5.43-2.32-8.22-6.46-8.22s-6.67,2.79-6.67,8.22v22.56h-11V385.15c0-5.43-2.32-8.22-6.46-8.22s-6.67,2.79-6.67,8.22v22.56h-11V367.27h11V373c2.54-3.39,5.87-6.49,11.46-6.49,5.08,0,8.93,2.34,11,6.42,3.42-4.15,7.48-6.42,12.78-6.42,8.2,0,13.14,5.13,13.14,14.87v26.33Z"
          transform="translate(-4.97 -130.89)"
          fill="#2a98ff"
        />
        <path
          className="cls-2"
          d="M545,341.31c0-23.33-10.21-44.8-28.76-60.45C501,268,480.77,260,463.46,260a57.24,57.24,0,0,0-7.86.54c-11.3-26.37-36.6-43.57-65.28-43.57a69.14,69.14,0,0,0-20.87,3.28c-13.72-28-42.07-46.31-73.18-46.31a77.51,77.51,0,0,0-33.43,7.41c-15.78-30.95-46.79-50.43-81.5-50.43-48.84,0-89,39.1-92.39,88.48-24.06,5.94-43.82,22.86-54.45,45h0s-.43.87-1.11,2.41l-.23.54c-.24.55-.5,1.17-.77,1.85s-.63,1.58-.93,2.37c-.08.23-.17.47-.26.71-.2.55-.4,1.09-.59,1.64-2.67,7.69-5.64,19.11-5,30.74v0A30.73,30.73,0,0,0,5,333.83c0,17,13.41,30.8,29.91,30.8s29.92-13.82,29.92-30.8a30.78,30.78,0,0,0-20.21-29.1h0a46.69,46.69,0,0,1,0-11.35c3.55-29,25.76-52.9,54.43-57.09a9.21,9.21,0,0,0,7.76-9.19v-.86c0-42.33,33.44-76.78,74.58-76.78,30.67,0,57.72,18.89,68.93,48.13a9.16,9.16,0,0,0,5.56,5.41,8.79,8.79,0,0,0,7.59-.94,60,60,0,0,1,32.85-9.57c26.67,0,50.73,17.19,59.89,42.76a9.14,9.14,0,0,0,5,5.37,8.78,8.78,0,0,0,7.22-.14,51.7,51.7,0,0,1,21.94-5c23.51,0,44,15.44,50.95,38.44a9,9,0,0,0,11.09,6.17,39.14,39.14,0,0,1,11.1-1.59c22.8,0,63.54,21,63.54,62.88,0,.19-.16,19.78-13.31,33.46-9.06,9.43-22.44,14.21-39.78,14.21h-1.34v18.57h1.34c22.34,0,40-6.64,52.61-19.72C545.11,368.58,545.05,342.32,545,341.31ZM34.88,346.06a12.24,12.24,0,0,1,0-24.46,12.24,12.24,0,0,1,0,24.46Z"
          transform="translate(-4.97 -130.89)"
          style={{
            fill : 'url(#New_Gradient_Swatch)',
          }}
        />
      </svg>
    </chakra.svg>
  );
};
