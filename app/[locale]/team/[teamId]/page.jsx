"use client"
import { useState, useEffect } from 'react';
import TeamMemberCard from '@/components/TeamMemberCard/TeamMemberCard';
import TranslationsProvider from '@/components/TranslationsProvider'
import initTranslations from '@/app/i18n'

const namespaces = ['team', 'header'];
export default function TeamMemberPage({ params: { locale, teamId } }) {
        const [translations, setTranslations] = useState({ t: () => '', resources: {} });
    
        useEffect(() => {
          const loadTranslations = async () => {
            const { t, resources } = await initTranslations(locale, namespaces);
            setTranslations({ t, resources });
          };
          loadTranslations();
        }, [locale]);
      
        const { t, resources } = translations;
    
  return (
        <TranslationsProvider locale={locale} namespaces={namespaces} resources={resources}>
            <div className="min-h-screen">
                <TeamMemberCard memberId={teamId} />
            </div>
        </TranslationsProvider>
    );
}