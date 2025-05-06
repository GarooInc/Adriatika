import React from 'react'
import initTranslations from '@/app/i18n'
import TranslationsProvider from '@/components/TranslationsProvider'
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher'
import ChatBubble from '@/components/ChatBubble/ChatBubble'
import HeaderItem from '@/components/HeaderItem/HeaderItem'

const namespaces = ['misionvision', 'header']

export default async function MisionVision({ params: { locale } }) {
  const { t, resources } = await initTranslations(locale, namespaces)

  return (
    <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
      <div className="page bg-secondary min-h-screen text-primary">
        <HeaderItem v={"v3"} nav={'/'} />

        <section className="mx-auto flex flex-col gap-4 px-10">
          <div>
            <h2 className="mision_vision_title">{t('misionvision:mision')}</h2>
            <p className="mision_vision_text">{t('misionvision:mision_desc')}</p>
          </div>

          <div>
            <h2 className="mision_vision_title ">{t('misionvision:vision')}</h2>
            <p className="mision_vision_text">{t('misionvision:vision_desc')}</p>
          </div>

          <div>
            <h2 className="mision_vision_title">{t('misionvision:values')}</h2>
            <ul className="list-disc list-inside mision_vision_text">
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