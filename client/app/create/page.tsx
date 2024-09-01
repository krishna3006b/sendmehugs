"use client";
import React, { ChangeEvent, useState } from 'react';
import axios from 'axios';
import { FormState } from '@/interfaces';
import { Input } from '@/components';

function Page() {
  const [form, setForm] = useState<FormState>({
    title: '',
    walletAddress: '',
    description: '',
    thumbnail: null,
    images: [],
    totalAmount: 0,
    role: 'Individual'
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = e.target;
    if (name === 'thumbnail') {
      setForm({ ...form, thumbnail: files ? files[0] : null });
    } else if (name === 'images') {
      setForm({ ...form, images: files ? Array.from(files) : [] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const createListing = async () => {
    if (form.totalAmount <= 0) {
      console.error('Total amount must be greater than 0');
      return;
    }

    if (!form.thumbnail) {
      console.error('No thumbnail');
      return;
    }

    const data = new FormData();
    data.append("file", form.thumbnail);
    data.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);
    data.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string);

    try {
      const thumbnailResponse = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, data);

      const imageUrls: string[] = [];
      for (const image of form.images) {
        const imageData = new FormData();
        imageData.append("file", image);
        imageData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string);
        imageData.append("cloud_name", process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string);

        const imageResponse = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, imageData);
        imageUrls.push(imageResponse.data.secure_url);
      }

      const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/raising`, { ...form, thumbnail: thumbnailResponse.data.secure_url, images: imageUrls });
      console.log(res)

    } catch (error: any) {
      console.error('Error uploading images:', error.response.data);
    }

  };

  return (
    <>
      <div className="px-12 mx-auto pt-28 min-h-screen bg-[#092731]">
        <div className="flex flex-col gap-8 py-6">
          <div className="flex justify-between w-full items-center">
            <h2 className="text-2xl font-semibold text-white">| Create New Fundraising</h2>
            <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setForm({ ...form, role: e.target.value as 'NGO' | 'Individual' })} className="flex gap-3 cursor-pointer items-center bg-transparent">
              <option className='btn bg-[#092731]' value='Individual'>Individual</option>
              <option className='btn bg-[#092731]' value='NGO'>NGO</option>
            </select>
          </div>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8">
            <Input handleChange={handleChange} type="text" name="title" required={true} />
            <Input handleChange={handleChange} type="text" name="walletAddress" required={true} />
            <Input handleChange={handleChange} type="text" name="description" required={true} />
            <Input handleChange={handleChange} type="numberAmount" name="totalAmount" required={true} />
            <Input handleChange={handleChange} type="text" name="name" required={true} />
            <Input handleChange={handleChange} type="text" name="address" required={true} />
            <Input handleChange={handleChange} type="email" name="email" required={true} />
            <Input handleChange={handleChange} type="file" name="thumbnail" required={true} />
            <Input handleChange={handleChange} type="file" name="images" multiple={true} required={true} />
          </div>
          <button className="btn btn1" onClick={createListing}>Create</button>
        </div>
      </div>
    </>
  );
}

export default Page;
