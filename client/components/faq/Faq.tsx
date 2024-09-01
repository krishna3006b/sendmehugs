"use client";

import React, { useState } from 'react';

import { darrow, uarrow } from '@/assets';
import Image from 'next/image';

function Faq() {
    const [faq, setFaq] = useState([
        {
            ques: "Is it okay to raise money for myself?",
            ans: "Yes, millions of people have started a fundraiser on GoFundMe for themself or their family amidst a financial crisis. Rebuilding and recovering after a natural disaster, unexpected bills, and many more emergency use cases find support though crowdfunding.",
            checked: true
        },
        {
            ques: "Can I create a Send me hugs for someone else and have the funds go directly to them?",
            ans: "Yes, millions of people have started a fundraiser on GoFundMe for themself or their family amidst a financial crisis. Rebuilding and recovering after a natural disaster, unexpected bills, and many more emergency use cases find support though crowdfunding.",
            checked: false
        },
        {
            ques: "Can I create a Send me hugs for a charity or nonprofit?",
            ans: "Yes, millions of people have started a fundraiser on GoFundMe for themself or their family amidst a financial crisis. Rebuilding and recovering after a natural disaster, unexpected bills, and many more emergency use cases find support though crowdfunding.",
            checked: false
        },
        {
            ques: "How can I share and promote my Send me hugs?",
            ans: "Yes, millions of people have started a fundraiser on GoFundMe for themself or their family amidst a financial crisis. Rebuilding and recovering after a natural disaster, unexpected bills, and many more emergency use cases find support though crowdfunding.",
            checked: false
        },
        {
            ques: "In what countries can I start a Send me hugs?",
            ans: "Yes, millions of people have started a fundraiser on GoFundMe for themself or their family amidst a financial crisis. Rebuilding and recovering after a natural disaster, unexpected bills, and many more emergency use cases find support though crowdfunding.",
            checked: false
        },
    ])

    const handleFaq = (index: number) => {
        let newFaq = faq.map((item, idx) => {
            if (idx == index) {
                item.checked = !item.checked;
            } else {
                item.checked = false;
            }
            return item;
        })
        setFaq(newFaq);
    }

    return (
        <>
            <div className="">
                {
                    faq.map((item, idx) => {
                        return (
                            <div className="grid gap-[22px] grid-cols-1" key={idx}>
                                <div className=" flex justify-between items-center hover:cursor-pointer" onClick={() => handleFaq(idx)}>
                                    <p className="font-inter text-[16px] font-[600] max-w-[90%] ">{item.ques}</p>
                                    <div className="ml-3 w-[20px] h-[20px]">
                                        {
                                            item.checked ? <Image className="flex-1" src={uarrow} alt="Checked" /> : <Image src={darrow} alt="Un Checked" />
                                        }
                                    </div>
                                </div>
                                {
                                    !item.checked &&
                                    <div className="h-[1px] bg-white w-full"></div>

                                }
                                <div className={`font-sans text-[14px] text-[rgba(255,255,255,0.70)] font-[400] ${item.checked ? "h-auto " : "h-0 overflow-hidden"}`}>{item.ans}</div>
                                {
                                    item.checked &&
                                    <div className="h-[1px] bg-white w-full mb-[22px]"></div>

                                }
                            </div>
                        )
                    })
                }
            </div>
        </>
    );
}

export default Faq;