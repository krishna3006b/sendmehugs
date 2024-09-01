"use client";

import React, { useEffect, useRef, useState } from 'react';
import { bd3, bdlogo, larrow, rarrow } from '@/assets';
import CarouselCard from './CarouselCard';
import Image from 'next/image';

function ExampleFundraiser() {
    const [pos, setPos] = useState(0);

    const carousel = [
        {
            heading: "Medical",
        },
        {
            heading: "Sports",
        },
        {
            heading: "Memorial",
        },
        {
            heading: "Charity",
        },
        {
            heading: "Education",
        },
    ]

    const nextHandle = () => {
        if (pos == carousel.length - 1) {
            setPos(0)
        } else {
            setPos(pos + 1)
        }
    }

    const prevHandle = () => {
        if (pos == 0) {
            setPos(carousel.length - 1)
        } else {
            setPos(pos - 1)
        }
    }

    const timer = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {

        timer.current = setInterval(nextHandle, 5000);

        return () => {
            if (timer.current !== null) clearInterval(timer.current);
        };
    },)
    return (
        <>
            {/* max-w-[1512px] */}
            <div className="mt-[66px]  mx-auto 2xl:px-[156px] lg:px-[33px] px-[16px] xl:px-[96px] relative xlg:bg-[url(/src/assets/background-grad.png)] bg-cover pt-[64px] overflow-hidden">
                <div className="background-logo">
                    <Image className="hidden xlg:block" src={bdlogo} alt="background-logo" />
                </div>
                <div className="background-circle-design3"></div>

                <div className="background-circle-design4"></div>
                <div className="mx-w-[1093px] mx-auto flex flex-col gap-[71px] text-white relative  z-[2]">
                    <div className="md:max-w-[648px] mx-auto w-[100%]">
                        <h3 className="font-lato sm:text-[36px] xss:text-[28px] text-[32px] font-[700] text-center pb-[32px]">Examples of fundraisers happening on SendMeHugs </h3>
                        <div className="carousel-nav-shadow-right sm:hidden"></div>
                        <div className="overflow-auto max-w-[100%]  rounded-[100px]  ">
                            <div className="mx-auto w-fit p-2.5 flex gap-1 sm:gap-6 items-center bg-[rgba(255,255,255,0.10)] rounded-[100px] relative z-[2] ">
                                {
                                    carousel.map((item, idx) => <p className={`${pos == idx && "bg-gradient-cyan "} hover:cursor-pointer text-white p-[6px_8px] flex justify-center items-center gap-[4px] text-[14px] rounded-[36px] font-popins font-[500]`} onClick={() => setPos(idx)} key={idx}>{item.heading}</p>)
                                }
                            </div>
                        </div>
                    </div>
                    <div className=" flex xlg:items-center xlg:justify-between justify-center">
                        <div className="xlg:block hidden" onClick={prevHandle}>
                            <Image src={larrow} alt="Left Arrow" />
                        </div>
                        {
                            carousel.map((item, idx) => {
                                if (idx == pos) {
                                    return (
                                        <CarouselCard nextHandle={nextHandle} prevHandle={prevHandle} item={item} key={idx} />
                                    )
                                }
                            })
                        }
                        <div className="xlg:block hidden" onClick={nextHandle}>
                            <Image src={rarrow} alt="Right Arrow" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ExampleFundraiser;