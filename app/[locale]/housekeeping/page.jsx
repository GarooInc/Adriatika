import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import InfoDisplay from '@/components/InfoDisplay/InfoDisplay'
import FooterItem from '@/components/FooterItem/FooterItem'
import ServicesItem from '@/components/ServicesItem/ServicesItem'
import { FaWhatsapp, FaPhone } from "react-icons/fa"
import { GoClock } from "react-icons/go";


const namespaces = ['frontdesk', 'home']

export default async function HouseKeeping({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-secondary">
            <HeaderItem v={"v3"} transparent/>
            <h2 className='italictiempos_title text-quaternary'>{t('home:nav3')}</h2>
            <div className='info_container gap-4'>
                <div className='fontdesk_item'>
                    <GoClock className="mr-2 text-quaternary text-2xl" />
                    <span className="fontdesk_item_text text-primary"><span className=''>{t('frontdesk:hours')} </span><span>{t('frontdesk:hours_value')}</span></span>
                </div>
                <div className="fontdesk_item">
                    <FaPhone className="mr-2 text-quaternary text-2xl" />
                    <a href="tel:+502 24962222 " className="fontdesk_item_text text-primary"><span className=''>{t('frontdesk:phone')} </span><span> +502 2496-2222 Ext. 3000 </span></a>
                </div>
                <a href="https://wa.me/35688881" className="fontdesk_item">
                    <FaWhatsapp className="mr-2 text-quaternary text-2xl" />
                    <span  className="fontdesk_item_text text-quaternary"><span className=''>{t('frontdesk:whatsapp')} </span><span> +502 3568-8881</span></span>
                </a>
                <InfoDisplay collection="Housekeeping" colorlines="quaternary" coloricon="tertiary" />
                <FooterItem  transparent logo={"v11"}/>
            </div>
        </div>
        <LanguageSwitcher />
        </TranslationsProvider>
    );
}