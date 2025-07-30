import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import InfoDisplay from '@/components/InfoDisplay/InfoDisplay'
import FooterItem from '@/components/FooterItem/FooterItem'
import WhatsappButton from '@/components/WhatsappButton/WhatsappButton'

const namespaces = ['contacts', 'home']

export default async function Contacts({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

    return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
        <div className="page bg-secondary">
            <HeaderItem v={"v12"} transparent />
            <h2 className='italictiempos_title text-quaternary'>{t('home:nav8')}</h2>
            <div className='info_container'>
                <InfoDisplay collection="Contacts" colorlines="primary" coloricon="primary" />
                <FooterItem  transparent logo={"v3"}/>
            </div>
        </div>
        <LanguageSwitcher />
        <WhatsappButton />
        </TranslationsProvider>
    );
}