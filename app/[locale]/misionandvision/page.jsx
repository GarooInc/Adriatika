import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import ChatBubble from '@/components/ChatBubble/ChatBubble'
import HeaderItem from '@/components/HeaderItem/HeaderItem'
import FormatedText from '@/components/FormatedText/FormatedText'

const namespaces = ['misionvision', 'header']

export default async function MisionVision({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, namespaces)

  return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
      <div className="page bg-secondary min-h-screen text-primary">
        <HeaderItem v={"v3"} nav={'/'} />

        <section className="max-w-4xl mx-auto space-y-12 mt-12 px-10">
          <div>
            <h2 className="mision_vision_title">{t('misionvision:mision')}</h2>
            <p className="text-lg leading-7">{t('misionvision:mision_desc')}</p>
          </div>

          <div>
            <h2 className="mision_vision_title ">{t('misionvision:vision')}</h2>
            <p className="text-lg leading-7">{t('misionvision:vision_desc')}</p>
          </div>

          <div>
            <h2 className="mision_vision_title">{t('misionvision:values')}</h2>
            <ul className="list-disc list-inside text-lg space-y-1">
              {t('misionvision:values_desc')
                .split('<br>')
                .map((value, index) => (
                  <li key={index}>{value.replace('• ', '').trim()}</li>
              ))}
            </ul>
          </div>
        </section>

        <ChatBubble />
        <div className="mt-10">
          <LanguageSwitcher />
        </div>
      </div>
    </TranslationsProvider>
  )
}