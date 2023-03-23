import React from 'react';
import { useEffect } from 'react';

type ErrorProps = {
  title: string;
  content: string;
  handleCloseNotification: () => void;
};

export function Error({ title, content, handleCloseNotification }: ErrorProps) {
  useEffect(() => {
    setTimeout(handleCloseNotification, 10000);
  });

  return (
    <div className="fixed bg-[#ff7575] text-light max-w-fit p-4 px-8 left-10 bottom-8 grid grid-rows-[1fr_1fr] gap-3 justify-items-center rounded-[1rem] z-50">
      <h1 className="text-2xl tracking-widest">{title}</h1>
      <h1 className="text-lg tracking-wide text-light opacity-90">{content}</h1>
    </div>
  );
}

export default Error;
