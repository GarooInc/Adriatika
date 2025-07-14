"use client";
import React, { useState, useEffect } from 'react';
import PocketBase from 'pocketbase';
import { MdLocationPin } from "react-icons/md";
import { TbClockHour3Filled } from "react-icons/tb";
import { useTranslation } from 'react-i18next';



const FoodDrinksItem = () => {
    const [foodDrinks, setFoodDrinks] = useState([]);
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL
    const pb = new PocketBase(backendUrl);
    pb.autoCancellation(false);
    const { t } = useTranslation();


    const openPdf = (item, menutype) => {
        menutype = menutype === 'menu1' ? item.menu1_pdf : item.menu2_pdf;
        const pdfUrl = `${backendUrl}/api/files/${item.collectionId}/${item.id}/${menutype}?token=`;
        window.open(pdfUrl, '_blank');
    };
    
    const { i18n } = useTranslation();
    const currentLocale = i18n.language;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const records = await pb.collection('Food_Drinks').getFullList({
                    sort: 'order_num',
                });
                setFoodDrinks(records);
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        };

        fetchData();
    }, []);
    


    return (
        <div className="food_container">
            {foodDrinks.map((item, index) => (
                <div key={index} className='food_drinks_inner'>
                    <img className="food_drinks_img" src={`${backendUrl}/api/files/${item.collectionId}/${item.id}/${item.cover_img}?token=`} alt={item.name} />
                    <div className='food_drinks_info'>
                        <h3 className="food_drinks_title">{item[`name_${currentLocale}`]}</h3>
                        <div className='food_drinks_description_container'>
                        <span 
                            className='food_drinks_description' 
                            dangerouslySetInnerHTML={{ __html: item[`description_${currentLocale}`] }} 
                            />
                        </div>
                        <div className='food_drinks_icons_container'>
                                <p className="food_drinks_text">
                                    <MdLocationPin className="text-primary text-md" />
                                    {item[`location_${currentLocale}`]}
                                </p>
                                <p className="food_drinks_text">
                                    <TbClockHour3Filled className="text-primary text-md" />
                                    {item.open} - {item.closes}
                                </p>
                                <div className='flex gap-4'>
                                {
                                    item.menu1_pdf && (
                                        <button className='menu_btn' onClick={() => openPdf(item, 'menu1')}>
                                            {
                                                t('food_drinks:menu1') || 'Menu 1'
                                            }
                                        </button>
                                    )
                                }
                                {item.menu2_pdf && (
                                    <button className='menu_btn' onClick={() => openPdf(item, 'menu2')}>
                                        {
                                            t('food_drinks:menu2') || 'Menu 2'
                                        }
                                    </button>
                                )}
                                </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FoodDrinksItem
