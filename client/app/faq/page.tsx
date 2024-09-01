"use client";

import React, { useEffect, useState } from 'react';
import { Faq, Footer, FooterBottom, Navbar } from '@/components';

function FaqPage() {
    const [navOpen, setNavOpen] = useState(false);
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <>
            <div className={`w-[100%] overflow-x-hidden relative max-w-[100vw] bg-dark-cyan min-h-screen flex flex-col justify-between`}>

                <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
                <div className="faq-background-circle-design">
                </div>
                <div className="background-circle-design1 faq-design1"></div>
                <div className="max-w-[1512px] min-h-[90vh] md:min-h-[80vh] relative z-[2]  text-white 2xl:px-[156px] lg:px-[32px] xl:px-[96px] px-[16px] pt-6">
                    <div className=" max-w-[895px] ">
                        <h2 className="font-lato font-[700] pb-[28px] text-[32px] leading-[40px] md:text-start -tracking-[.64px]">Frequently asked Questions</h2>
                        <Faq />
                    </div>
                </div>
                <div className="bg-[rgba(53,85,92,0.30)]">
                    <Footer />
                    <div className="px-4 md:px-0 my-3">
                        <div className="h-[1px] w-[100%] bg-[#D9D9D9]"></div>
                    </div>
                    <FooterBottom />
                </div>
            </div>
        </>
    );
}

export default FaqPage;