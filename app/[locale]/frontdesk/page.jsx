import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import InfoDisplay from '@/components/InfoDisplay/InfoDisplay'
import { FaWhatsapp, FaPhone, FaWifi } from "react-icons/fa"
import FooterItem from '@/components/FooterItem/FooterItem'

const namespaces = ['frontdesk', 'header']

export default async function FrontDesk({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-quaternary">
            <HeaderItem v={"v1"} transparent whiteArrow/>
            <div className='info_container'>
                <h2 className='italictiempos_title text-secondary'>{t('frontdesk:title')}</h2>
                        <div className='flex flex-col md:items-center justify-center gap-4 font-futura px-10'>
                            <div className="fontdesk_item">
                                <FaPhone className="mr-2 text-secondary text-2xl" />
                                <a href="tel:+502 24962222 " className="fontdesk_item_text text-secondary"><span className=''>{t('frontdesk:phone')} </span><span> +502 2496-2222 Ext. 3000 </span></a>
                            </div>
                            <a href="https://wa.me/35688881" className="fontdesk_item">
                                <FaWhatsapp className="mr-2 text-secondary text-2xl" />
                                <span  className="fontdesk_item_text text-secondary"><span className=''>{t('frontdesk:whatsapp')} </span><span> +502 3568-8881</span></span>
                            </a>
                            <div className="fontdesk_item">
                                <FaWifi className="mr-2 text-secondary text-2xl" />
                                <span className="fontdesk_item_text text-secondary ">WiFi</span>
                                <span className="fontdesk_item_text text-secondary"><span className=''>{t('frontdesk:wifi_name')}: AdriatikaWE</span></span>
                                <div className='flex justify-center items-center gap-2'>
                                    <span className="fontdesk_item_text text-secondary"><span className=''>{t('frontdesk:wifi_password')}:</span></span>
                                    <span className='fontdesk_item_text text-secondary'>2T8ru3st$</span>
                                </div>
                            </div>
                        </div>
                <InfoDisplay collection="Front_Desk" colorlines="white" coloricon="secondary" />
                <FooterItem  transparent logo={"v9"}/>
            </div>
        </div>
        <LanguageSwitcher />
        </TranslationsProvider>
    );
}