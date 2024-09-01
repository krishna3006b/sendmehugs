import React from 'react';
import { facebook, instagram, twitter } from '@/assets';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

interface CardProp {
    card: {
        clas: string;
        src: any;
        heading: string;
        desc: string;
    }
}

function Card({ card }: CardProp) {

    const router = useRouter();

    return (
        <div onClick={()=>router.push('/help')} className={`flex flex-col p-3 gap-[27px] text-white font-inter bg-[rgba(50,87,101,0.50)] rounded-[8px] ${card.clas && card.clas}`}>
            <div className="">
                <div className="relative h-[130px] w-full">
                    <Image fill layout='cover' className="w-full" src={card.src} alt={card.heading} />
                </div>
                <h3 className="pt-4 pb-3 font-[700] text-[20px]">{card.heading}</h3>
                <p className="font-[400] text-[14px]">{card.desc}</p>
            </div>
            <div className="flex items-center justify-between">
                <div className="py-2 px-3 flex justify-center items-center font-popins text-[16px] bg-[#648997] font-[500] gap-[6px] rounded-[36px] w-fit hover:cursor-pointer">Donate</div>
                <div className="font-inter text-[14px] font-[500] flex justify-center items-center gap-5">
                    <p className="hover:cursor-pointer">Share</p>
                    <div className="flex justify-center items-center gap-[13px]">
                        <Image src={instagram} alt="Instagram Icon" />
                        <Image src={twitter} alt="Twitter Icon" />
                        <Image src={facebook} alt="Facebook Icon" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;