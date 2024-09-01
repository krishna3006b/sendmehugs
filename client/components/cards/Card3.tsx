import Image, { StaticImageData } from 'next/image';
import React from 'react';

interface card3Props {
    sup: {
        donation: string;
        avatar: StaticImageData;
        receiver: string;
        user: string;
    }
}

function Card3({ sup }: card3Props) {
    return (
        <div className="flex gap-[17px] pb-3 border-b border-white">
            <Image className="h-fit" src={sup.avatar} alt="" />
            <div className="">
                <p className="font-inter text-[14px] font-[500] leading-5 capitalize">{sup.user}</p>
                <p className="font-inter text-[13.5px] leading-5 italic">{sup.receiver}</p>
                <p className="font-inter text-[13px] leading-5 pt-2">{sup.donation}</p>
            </div>
        </div>
    );
}

export default Card3;