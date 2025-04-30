import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import Carousel from '@/components/Carousel/Carousel'
import ChatBubble from '@/components/ChatBubble/ChatBubble'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import FormatedText from '@/components/FormatedText/FormatedText'



const namespaces = ['welcome', 'header']

export default async function Welcome({ params: { locale }}) {
    const { t, resources } = await initTranslations(locale, namespaces)

return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
    <div className="page bg-primary">
        <div className="flex flex-col w-full">
            <HeaderItem v={"v3"} nav={'/'} />
            <div className="w-full md:h-[600px]">
                <Carousel />
            </div>
            <div className='flex flex-col justify-center items-center w-full h-full bg-primary p-10 md:p-14'>
                <h1 className="principal_title">{t('welcome:title_main')}</h1>
                <FormatedText text={t('welcome:desc_main')} css={'text-center px-4'} />
            </div>
        </div>
        <ChatBubble />
      </div>
        <LanguageSwitcher />
    </TranslationsProvider>
  )
}