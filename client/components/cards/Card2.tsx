import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface card2Prop{
    item:{
        src: StaticImageData;
        heading: string;
        desc: string;
        arrow: boolean;
    }
}

function Card2({ item } : card2Prop) {
    return (
        <>
            <div className="group cursor-pointer hover:border-white border-[rgba(50,87,101,0.40)] border p-[15px_16px] flex gap-1 bg-[rgba(50,87,101,0.40)] rounded-[8px]">
                <div className="flex flex-col justify-between">
                    <div className="flex gap-2 items-center">
                        <Image src={item.src} alt={item.heading} />
                        <p className="text-[20px] font-inter font-[700] leading-6">{item.heading}</p>
                    </div>
                    <div className="text-[14px] font-inter font-[400] leading-[19px] py-2">
                        {item.desc}
                    </div>
                </div>
                <div className="w-[22px]">
                    <svg className={`opacity-0 group-hover:opacity-100 duration-300`} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M11.0303 13.0303L13.5303 10.5303C13.8232 10.2374 13.8232 9.76256 13.5303 9.46967L11.0303 6.96967C10.7374 6.67678 10.2626 6.67678 9.96967 6.96967C9.67678 7.26256 9.67678 7.73744 9.96967 8.03033L11.1893 9.25L7 9.25C6.58579 9.25 6.25 9.58579 6.25 10C6.25 10.4142 6.58579 10.75 7 10.75L11.1893 10.75L9.96967 11.9697C9.67678 12.2626 9.67678 12.7374 9.96967 13.0303C10.2626 13.3232 10.7374 13.3232 11.0303 13.0303Z" fill="#2ED7B4" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18ZM10 16.5C6.41015 16.5 3.5 13.5898 3.5 10C3.5 6.41015 6.41015 3.5 10 3.5C13.5899 3.5 16.5 6.41015 16.5 10C16.5 13.5899 13.5898 16.5 10 16.5Z" fill="#2ED7B4" />
                    </svg>
                </div>
            </div>
        </>
    );
}

export default Card2;