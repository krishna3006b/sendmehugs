"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { Footer, FooterBottom, Navbar } from '@/components';
import axios from 'axios';
import { GetInTouchData } from '@/interfaces';

function GetInTouch() {
    const [navOpen, setNavOpen] = useState(false);

    const [formData, setFormData] = useState<GetInTouchData>({ name: '', email: '', message: '' });

    const [errors, setErrors] = useState({ name: '', email: '', message: '' });
    const [passwordStrength, setPasswordStrength] = useState('Poor');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' })
    };

    const validateForm = () => {
        const newErrors: GetInTouchData = { name: '', email: '', message: '' };
        if (!formData.name) newErrors.name = 'Field is required';
        if (!formData.message) newErrors.message = 'Field is required';
        if (!formData.email) {
            newErrors.email = 'Field is required';
        } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }

        setErrors(newErrors);

        return Object.values(newErrors).filter((data: string) => data).length === 0;
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                // const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/signup`, formData)

                // console.log(res.data.message);

                console.log(formData)

            } catch (e) {
                //@ts-ignore
                console.log(e.response.data.message)
            }
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0)
    }, []);

    return (
        <div className={`w-[100%] relative max-w-[100vw] bg-dark-cyan overflow-x-hidden `}>

            <Navbar navOpen={navOpen} setNavOpen={setNavOpen} />
            <div className="faq-background-circle-design"></div>
            <div className="background-circle-design1 faq-design1"></div>
            <div className="flex flex-col justify-center items-center  py-[64px]  gap-[28px] max-w-[1512px] relative z-[2] mx-auto text-white 2xl:px-[156px] lg:px-[32px] xl:px-[96px] px-[16px] md:py-[96px]">
                <div className="flex flex-col gap-4">
                    <h2 className="font-lato text-[32px] font-bold leading-10 text-center">Get In Touch</h2>
                    <p className="text-[16px] font-[500] font-inter text-center">24/7 We will answer to your questions and problems</p>
                </div>
                <div className="xlg:max-w-[793px] w-full flex flex-col gap-[22px] bg-[rgba(255,255,255,0.06)] p-[10px_16px_24px_16px]">
                    <div className="grid xlg:grid-cols-2 gap-[22px]">
                        <div className="form-group h-[64px] flex justify-end flex-col relative">
                            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="" className="form-input bg-transparent text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                            <label htmlFor="name" className="form-label bg-transparent text-[12px] font-[500]">Name</label>
                            {errors.name && <p className="text-red-500 text-xs absolute -bottom-5">{errors.name}</p>}
                        </div>
                        <div className="form-group h-[64px] flex justify-end flex-col relative">
                            <input type="text" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="" className="form-input bg-transparent text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                            <label htmlFor="email" className="form-label bg-transparent text-[12px] font-[500]">Email</label>
                            {errors.email && <p className="text-red-500 text-xs absolute -bottom-5">{errors.email}</p>}
                        </div>
                        <div className="form-group h-[64px] flex justify-end flex-col relative">
                            <textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="" className="form-input bg-transparent text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                            {errors.message && <p className="text-red-500 text-xs absolute -bottom-5">{errors.message}</p>}
                            <label htmlFor="message" className="form-label bg-transparent text-[12px] font-[500]">Message</label>
                        </div>
                        {/* <div className="form-group h-[64px] flex justify-end flex-col relative xlg:col-span-2">
                            <textarea {...register("message", { required: "Field is requiered" })} id="message" className="form-input text-[14px] h-auto outline-none border-b border-[#D0D2D5] bg-transparent py-2.5 px-1 leading-5 placeholder:text-[16px]" placeholder=" " ></textarea>
                            <label htmlFor="message" className="form-label textarea-label bg-transparent text-[12px] font-[500] font-inter">Your message here</label>
                        </div> */}
                        <div className="ml-auto xlg:col-span-2 opacity-50">
                            <button onClick={handleSubmit} className="bg-gradient-cyan bg-gradient-cyan-hover font-popins text-[16px] w-[200px] p-[10px_14px] rounded-[36px]">Submit</button>
                        </div>
                    </div>
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
    );
}

export default GetInTouch;