"use client";
import React, { useEffect, useState } from 'react';
import { dnavarrow, loginBtn, logo, navArrow } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import axios from 'axios';
import { User } from '@/interfaces';
import { useDispatch } from 'react-redux';
import { setAlert } from '@/store/slices';

function Navbar({ navOpen, setNavOpen }: { navOpen: boolean, setNavOpen: (open: boolean) => void }) {

    const [user, setUser] = useState<User>({ email: '' })

    const router = useRouter();
    const pathname = usePathname();
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window !== undefined) {
            const userData = localStorage.getItem('credentials');
            if (userData)
                setUser(JSON.parse(userData));
        }
    }, []);

    const isActiveLink = (path: string) => pathname === path;

    const handleLogout = async () => {
        try {
            const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/logout`, {
                email: user.email
            })
            dispatch(setAlert({ message: res.data.message, type: 'success' }))

            localStorage.removeItem('credentials');
            setUser({ firstName: '', lastName: '', password: '', email: '' })

            setTimeout(() => router.push('/'), 1000);
        } catch (e: any) {
            console.log(e)
        }
        finally {
            setTimeout(() => dispatch(setAlert({ message: '', type: 'info' })), 1200)
        }
    }

    return (
        <>
            <nav className="w-[100vw] bg-dark-cyan p-[10px_16px] h-[78px] sm:p-[10px_32px] xl:p-[15px_96px] mx-auto 2xl:p-[15px_156px] flex justify-between items-center sticky top-0 z-[20]">
                <div className="logo flex justify-center items-center gap-[22px] xss:gap-2.5">
                    <div className="xlg:hidden" onClick={() => setNavOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M16.7083 9.16667H3.29167C2.85444 9.16667 2.5 9.52111 2.5 9.95833V10.0417C2.5 10.4789 2.85444 10.8333 3.29167 10.8333H16.7083C17.1456 10.8333 17.5 10.4789 17.5 10.0417V9.95833C17.5 9.52111 17.1456 9.16667 16.7083 9.16667Z" fill="white" />
                            <path d="M16.7083 13.3333H3.29167C2.85444 13.3333 2.5 13.6878 2.5 14.125V14.2083C2.5 14.6456 2.85444 15 3.29167 15H16.7083C17.1456 15 17.5 14.6456 17.5 14.2083V14.125C17.5 13.6878 17.1456 13.3333 16.7083 13.3333Z" fill="white" />
                            <path d="M16.7083 5H3.29167C2.85444 5 2.5 5.35444 2.5 5.79167V5.875C2.5 6.31223 2.85444 6.66667 3.29167 6.66667H16.7083C17.1456 6.66667 17.5 6.31223 17.5 5.875V5.79167C17.5 5.35444 17.1456 5 16.7083 5Z" fill="white" />
                        </svg>
                    </div>
                    <Image src={logo} alt="Logo SendMeHugs" />
                </div>
                <div className="hidden xlg:flex links items-center gap-[25px] lg:gap-[15px] text-white font-popins">
                    <Link href="/" className={`p-[6px_8px] flex justify-center items-center gap-[4px] text-[14px] hover:text-primary-500 duration-200 ${isActiveLink('/') ? 'text-primary-500' : 'text-white'}`}>
                        Home
                    </Link>

                    <div className="group p-[6px_8px]  flex justify-center items-center gap-[4px] text-[14px]  duration-200 relative">
                        <span>For charities</span>
                        <Image className="group-hover:hidden" src={navArrow} alt="Nav Arrow" />
                        <Image className="group-hover:block hidden" src={dnavarrow} alt="Nav Arrow" />
                        <div className="group-hover:grid duration-200 grid-cols-2 hidden  gap-1 p-1 z-[12] bg-[#10323C] absolute top-[35px]  h-fit left-0 s w-[280%]">
                            <div className="flex flex-col gap-2 items-start col-span-1 " >
                                <h4 className="font-inter text-[14px] text-white font-bold leading-6 px-[9px]">Discover</h4>
                                <div className="w-[100%]">
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Fundrasiers</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Success Stories</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Social impact Funds</Link>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-start col-span-1 " >
                                <h4 className="font-inter text-[14px] text-white  font-bold leading-6 px-[9px]">Fundraise for</h4>
                                <div className="w-[100%]">
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Medical</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Memorial</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Emergency</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Nonprofit</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="group p-[6px_8px] flex justify-center items-center gap-[4px] text-[14px]  duration-200 relative">
                        <span>For individuals</span>
                        <Image className="group-hover:hidden" src={navArrow} alt="Nav Arrow" />
                        <Image className="group-hover:block hidden" src={dnavarrow} alt="Nav Arrow" />
                        <div className="group-hover:grid grid-cols-2 hidden  gap-1 p-1 z-[12] bg-[#10323C] absolute top-[35px]  h-fit left-0 s w-[280%]">
                            <div className="flex flex-col gap-2 items-start col-span-1 " >
                                <h4 className="font-inter text-[14px] text-white font-bold leading-6 px-[9px]">Discover</h4>
                                <div className="w-[100%]">
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Fundrasiers</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Success Stories</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Social impact Funds</Link>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 items-start col-span-1 " >
                                <h4 className="font-inter text-[14px] text-white  font-bold leading-6 px-[9px]">Fundraise for</h4>
                                <div className="w-[100%]">
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Medical</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Memorial</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Emergency</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Nonprofit</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link href="/faq" className={`p-[6px_8px] flex justify-center items-center gap-[4px] text-[14px] hover:text-primary-500 duration-200 ${isActiveLink('/faq') ? 'text-primary-500' : 'text-white'}`}>
                        FAQ
                    </Link>
                    <Link href="/about" className={`p-[6px_8px] flex justify-center items-center gap-[4px] text-[14px] hover:text-primary-500 duration-200 ${isActiveLink('/about') ? 'text-primary-500' : 'text-white'}`}>
                        About us
                    </Link>
                </div>
                <div className="nav-buttons flex justify-center items-center gap-[20px] xss:gap-2.5">
                    <button className="bg-gradient-cyan bg-gradient-cyan-hover text-white p-[6px_8px] flex justify-center items-center gap-[4px] text-[14px] rounded-[36px]" onClick={() => router.push("/fundraising")}><span>Start</span>
                        <Image className="" src={dnavarrow} alt="Nav Arrow" />
                    </button>
                    <Image className="hover:cursor-pointer" src={loginBtn} alt="Login Button" onClick={() => !user.email ? router.push("/login") : handleLogout()} />
                </div>
            </nav>

            <div className={`mobile-nav pt-[15px] gap-[72px] h-[100vh] overflow-auto fixed z-[100] ${navOpen ? "left-[0px] duration-200" : "-left-[375px] "} top-0 min-w-[375px] xss:w-[100%] xss:min-w-[unset] bg-[#062832] flex items-center text-white flex-col xlg:hidden`}>
                <svg className="ml-auto mr-[19px]" onClick={() => setNavOpen(false)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M17 7L7 17M17 17L7 7" stroke="#626B7F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <div className="logo">
                    <Image src={logo} alt="Logo SendMeHugs" />
                </div>
                <div className="links flex flex-col gap-[24px] font-popins w-[210px]">
                    <Link href="/" className={`p-[6px_8px] flex justify-center items-center gap-[4px] text-[14px] hover:text-primary-500 duration-200 ${isActiveLink('/') ? 'text-primary-500' : 'text-white'}`} onClick={() => setNavOpen(false)} >Home</Link>
                    <div className="group flex flex-col justify-center items-center gap-[4px] text-[14px] duration-200">
                        <div className="flex  p-[6px_8px] hover:bg-[#1A3C46] w-[100%] justify-center">
                            <span>For Charities</span>
                            <Image className="group-hover:hidden" src={navArrow} alt="Nav Arrow" />
                            <Image className="group-hover:block hidden" src={dnavarrow} alt="Nav Arrow" />
                        </div>
                        <div className="group-hover:grid duration-200 grid-cols-1 hidden  gap-1 p-1 z-[12] bg-[#10323C] h-fit w-[100%]">
                            <div className="flex flex-col gap-2 items-start col-span-1 " >
                                <h4 className="font-inter text-[14px] text-white  font-bold leading-6 px-[9px]">Fundraise for</h4>
                                <div className="w-[100%]">
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Medical</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Memorial</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Emergency</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Nonprofit</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="group flex flex-col justify-center items-center gap-[4px] text-[14px] duration-200">
                        <div className="flex  p-[6px_8px] hover:bg-[#1A3C46] w-[100%] justify-center">
                            <span>For Individuals</span>
                            <Image className="group-hover:hidden" src={navArrow} alt="Nav Arrow" />
                            <Image className="group-hover:block hidden" src={dnavarrow} alt="Nav Arrow" />
                        </div>
                        <div className="group-hover:grid duration-200 grid-cols-1 hidden  gap-1 p-1 z-[12] bg-[#10323C] h-fit w-[100%]">
                            <div className="flex flex-col gap-2 items-start col-span-1 " >
                                <h4 className="font-inter text-[14px] text-white  font-bold leading-6 px-[9px]">Fundraise for</h4>
                                <div className="w-[100%]">
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Medical</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Memorial</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Emergency</Link>
                                    <Link href="/" className="font-inter text-[14px] font-[400] leading-6 text-white flex items-center p-2 hover:bg-[#1A3C46] ">Nonprofit</Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Link href="/faq" className={`p-[6px_8px] flex justify-center items-center gap-[4px] text-[14px] hover:text-primary-500 duration-200 ${isActiveLink('/') ? 'text-primary-500' : 'text-white'}`} onClick={() => setNavOpen(false)} >FAQ</Link>
                    <Link href="/about" className={`p-[6px_8px] flex justify-center items-center gap-[4px] text-[14px] hover:text-primary-500 duration-200 ${isActiveLink('/') ? 'text-primary-500' : 'text-white'}`} onClick={() => setNavOpen(false)} >About Us</Link>
                </div>
            </div>
        </>
    );

}

export default Navbar;
