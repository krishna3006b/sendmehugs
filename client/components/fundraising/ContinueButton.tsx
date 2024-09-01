import React, { useEffect } from 'react';

function ContinueButton({ swiper, text, handleSubmit, disable }: any) {

    return (
        <div>
            {text != "Verify To Launch" ?
             <button disabled={disable} onClick={() => swiper?.current?.swiper?.slideNext()} className="lg:py-2 py-1.5 lg:px-3 px-2 flex justify-center items-center gap-1.5 rounded-[36px] bg-gradient-cyan text-white w-fit text-center cursor-pointer font-popins leading-6 lg:text-[16px] text-[14px] font-[500]">{text ? text : "Continue"}</button> 
             : <button onClick={() => { handleSubmit() }} className="lg:py-2 py-1.5 lg:px-3 px-2 flex justify-center items-center gap-1.5 rounded-[36px] bg-gradient-cyan text-white w-fit text-center cursor-pointer font-popins leading-6 lg:text-[16px] text-[14px] font-[500]">{text ? text : "Continue"}</button>}
        </div>
    );
}

export default ContinueButton;