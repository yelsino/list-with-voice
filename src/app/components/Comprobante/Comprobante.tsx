import React, { useCallback, useRef, useState } from 'react';
import { toPng } from 'html-to-image';

export const ComprobanteDePago: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null)

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  return (
    <>
      <div   className='p-5 invisible'  ref={ref}  style={{ width: '1200px', border: '1px solid black', fontSize: '50px' }}>
     ewqewqewqe
     ewqewqewqe
     ewqewqewqe
     ewqewqewqe
     ewqewqewqe
     ewqewqewqe
     ewqewqewqe
     ewqewqewqe
     ewqewqewqe
     ewqewqewqe
      </div>
      <button onClick={onButtonClick} className='text-secondary-100'>Click me</button>
    </>
  )
}