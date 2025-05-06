import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import EventsItem from '@/components/EventsItem/EventsItem'
import FooterItem from '@/components/FooterItem/FooterItem'


const namespaces = ['events', 'header']

export default async function Events({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="bg-secondary page md:justify-start relative">
            <HeaderItem v={"v11"} transparent/>
            <div className='flex flex-col pb-20 md:px-20'>
                <h1 className="italictiempos_title text-primary italic">{t('amenities:title')}</h1>
                <div className='flex flex-col justify-center items-center w-full px-10 mt-4 gap-2'>
                    <span className='futura_description text-center text-primary italic'>Ext: 3009</span>
                    <h3 className='futura_description text-center text-primary'>{t('events:desc')}</h3>
                    <span className='futura_description text-center text-black italic'>{t('events:lemma')}</span>
                </div>
                <EventsItem />
            </div>
            <FooterItem logo={"v12"} />
        </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}