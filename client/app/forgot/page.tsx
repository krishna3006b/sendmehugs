"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { plant } from '@/assets';
import Image from 'next/image';
import axios from 'axios';
import { forgotPasswordData } from '@/interfaces';

function ForgotPassword() {
    const [formData, setFormData] = useState<forgotPasswordData>({ password: '12345678', cPassword: '12345678' });

    const [errors, setErrors] = useState({ password: '', cPassword: '' });
    const [passwordStrength, setPasswordStrength] = useState('Poor');

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {

        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors({ ...errors, [name]: '' })
    };

    const validateForm = () => {
        const newErrors: forgotPasswordData = { password: '', cPassword: '' };
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be more than 8 characters';
        }
        if (!formData.cPassword) {
            newErrors.cPassword = 'Password is required';
        } else if (formData.cPassword !== formData.password) {
            newErrors.cPassword = "Confirm password doesn't match with password";
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
        if (formData.password) {
            setPasswordStrength(formData.password.length < 8 ? 'Poor' : 'Strong');
        } else {
            setPasswordStrength('Poor');
        }
    }, [formData.password]);

    return (
        <div className="max-w-[1512px] mx-auto grid xl:grid-cols-2 min-h-[100vh] md:h-[100vh]  items-center">
            <div className="flex justify-center items-center">
                <div className="xs:max-w-[417px] xl:min-h-[511px] p-5 xss:px-2.5  md:pt-[52px] xs:px-[55.5px] md:pb-[33px] text-black flex flex-col gap-6" >
                    <div className="flex flex-col gap-[21px]">
                        <div className="">
                            <h3 className="text-black text-center font-inter text-[21px] leading-[13px] font-bold pb-[13px]">Reset Password</h3>
                            <p className="font-inter text-[14px] font-[400] leading-5 text-center max-w-[260px] mx-auto">Now, choose a password that’s at least as strong as your willpower.</p>
                        </div>
                        <div className="gap-3 flex flex-col">
                            <div className="form-group h-[64px] flex justify-end flex-col relative">
                                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder=".........." className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                                {errors.password && <p className="text-red-500 text-xs absolute -bottom-5">{errors.password}</p>}
                                <label htmlFor="password" className="form-label bg-white text-[12px] font-[500]">Password</label>
                            </div>
                            <div className="form-group h-[64px] flex justify-end flex-col relative">
                                <input type="text" id="cPassword" name="cPassword" value={formData.cPassword} onChange={handleChange} placeholder=".........." className="form-input text-[14px] outline-none border-b border-[#D0D2D5] py-2.5 px-1" />
                                {errors.cPassword && <p className="text-red-500 text-xs absolute -bottom-5">{errors.cPassword}</p>}
                                <label htmlFor="cPassword" className="form-label bg-white text-[12px] font-[500]">Confirm Password</label>
                            </div>

                        </div>

                    </div>
                    <div className="flex gap-[9px] flex-col">
                        <p className="text-[12px] font-[400] font-inter leading-4">Must be at least 8 characters and have one of each: uppercase letters, symbols, and numbers.</p>
                        <div className="">
                            {
                                passwordStrength === 'Poor' ?
                                    <>
                                        <div className="grid grid-cols-10">
                                            <span className="h-1.5 bg-[#ff2b2b] rounded-l-[5px]"></span>
                                            <span className="h-1.5 bg-[#ff2b2b] col-span-4"></span>
                                            <span className="h-1.5 rounded-r-[5px] bg-gray-200"></span>
                                        </div>
                                        <div className="font-inter text-[11px] font-[400] leading-5 text-[#737373] h5">

                                            <span className="text-[#a31010] font-bold">Poor</span>
                                            <span className="text-[14px]"> - </span>
                                            <span className="">An Insecure password.</span>
                                        </div>
                                    </>
                                    : <>
                                        <div className="grid grid-cols-10">
                                            <span className="h-1.5 bg-[#59A310] rounded-l-[5px]"></span>
                                            <span className="h-1.5 bg-[#59A310] col-span-8"></span>
                                            <span className="h-1.5 rounded-r-[5px] bg-gray-200"></span>
                                        </div>
                                        <div className="font-inter text-[11px] font-[400] leading-5 text-[#737373] h5">
                                            <span className="text-[#59A310] font-bold">Strong</span>
                                            <span className="text-[14px]"> - </span>
                                            <span className="">A secure password.</span>
                                        </div>
                                    </>
                            }

                        </div>
                    </div>
                    <div className="flex flex-col gap-[10px]">
                        <button onClick={handleSubmit} className="bg-gradient-cyan-hover bg-gradient-cyan  text-white font-[500] font-popins text-[16px] p-[10px_14px] rounded-[36px]">Change Password</button>
                    </div>
                </div>
            </div>
            <div className="hidden xl:block ml-auto">
                <Image src={plant} className="md:h-[100vh]" alt="Plant Image" />
            </div>
        </div>
    );
}

export default ForgotPassword;