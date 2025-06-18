"use client";
import React from 'react'
import { useTranslation } from 'react-i18next';

const ChatBubble = () => {
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;

  return (
    <div className="fixed bottom-4 cursor-pointer bg-tertiary">
      <a href="https://api.whatsapp.com/send?phone=50235688881" target="_blank" rel="noopener noreferrer" className='flex justify-center items-center px-4 py-2 gap-2'>
            <span className='text-white font-futura uppercase text-sm'>{currentLocale === 'es' ? 'Chatea con Recepción' : 'Chat with Reception'}</span>
      </a>
    </div>
  )
}

export default ChatBubble