"use client";
import React, {useState, useEffect} from 'react'
import PocketBase from 'pocketbase'
import { useRouter } from "next/navigation"
import { useTranslation } from 'react-i18next';


const EventsItem = () => {
    const router = useRouter()
    const [experiences, setExperiences] = useState([]);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const pb = new PocketBase(backendUrl);
    pb.autoCancellation(false);
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('Events').getFullList({
                    sort: '-created',
                });
                console.log(records)
                setExperiences(records);
            } catch (error) {
                console.error("Error fetching data: ", error)
            }
        }

        fetchData()
    }, [])

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 grid-flow-row-dense auto-rows-auto p-10 w-full">
        {
            experiences.map((item, index) => (
                <div key={index} className={`md:pb-12 pb-8 gap-2 flex flex-col relative cursor-pointer bg-white text-black shadow-md rounded-md`}>
                    {
                        item.image && (
                            <img className="w-full md:h-60 h-40  object-cover rounded-t-md" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.image}?token=`} alt={item.name} />
                        )
                    }
                    {
                        !item.image && (
                            <div className="skeleton w-full md:h-60 h-40 bg-gray-200 animate-pulse"></div>
                        )
                    }
                    <div className='flex justify-center items-center flex-col px-4'>
                        <h3 className={`text-base leading-tight font-futura mt-2 uppercase text-center`} style={{color: item.text_color}}>{item[`title_${currentLocale}`]}</h3>
                        <span className="bg-white text-black font-futura text-center text-sm mt-2" dangerouslySetInnerHTML={{__html: item[`desc_${currentLocale}`]}}></span>
                    </div>
                </div>
            ))
        }
    </div>

  )
}

export default EventsItem