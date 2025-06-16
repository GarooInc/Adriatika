"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { useRouter } from "next/navigation";
import { useTranslation } from 'react-i18next';

const EventsItem = () => {
    const router = useRouter();
    const [experiences, setExperiences] = useState([]);
    const [modalImage, setModalImage] = useState(null);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const pb = new PocketBase(backendUrl);
    pb.autoCancellation(false);
    const { i18n, t } = useTranslation();
    const currentLocale = i18n.language;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('Events').getFullList({
                    sort: '-created',
                });
                setExperiences(records);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        fetchData();
    }, []);

    const openModal = (imageUrl) => {
        setModalImage(imageUrl);
    }

    const closeModal = () => {
        setModalImage(null);
    }

    return (
        <>
            {/* GRID DE TARJETAS */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3 p-10 w-full items-stretch">
                {experiences.map((item, index) => (
                    <div key={index} className="flex flex-col justify-between bg-white text-black shadow-md rounded-md cursor-pointer h-full pb-4">
                        {item.image ? (
                            <img
                                className="w-full md:h-60 h-40 object-cover rounded-t-md"
                                src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.image}?token=`}
                                alt={item.name}
                            />
                        ) : (
                            <div className="skeleton w-full md:h-60 h-40 bg-gray-200 animate-pulse"></div>
                        )}

                        <div className='flex justify-center items-center flex-col px-4'>
                            <h3 className="text-base leading-tight font-futura mt-2 uppercase text-center" style={{ color: item.text_color }}>
                                {item[`title_${currentLocale}`]}
                            </h3>
                            <span
                                className="bg-white text-black font-futura text-center text-sm mt-2"
                                dangerouslySetInnerHTML={{ __html: item[`desc_${currentLocale}`] }}
                            ></span>

                            <div className='flex justify-center items-center mt-4 w-full'>
                                <button className='bg-primary text-white px-4 py-2 rounded-md font-futura w-full'
                                onClick={() =>
                                        openModal(`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.map_img}?token=`)
                                }
                                >
                                    {t('events:btn1')}
                                </button>
                                <button className='bg-secondary border-primary border-2 text-primary px-4 py-2 rounded-md font-futura ml-2 w-full' 
                                onClick={() => 
                                    openModal('/assets/images/events/medidas.png')
                                }>
                                    {t('events:btn2')}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {modalImage && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
                    <div className="relative max-w-3xl w-full p-4">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-4 text-3xl font-bold text-red-400 rounded-full "
                        >
                            ×
                        </button>
                        <img src={modalImage} alt="Mapa del salón" className="w-full h-auto rounded-lg shadow-lg" />
                    </div>
                </div>
            )}
        </>
    );
}

export default EventsItem;
