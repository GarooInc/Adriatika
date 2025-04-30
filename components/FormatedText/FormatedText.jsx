'use client'
import { Trans } from 'react-i18next';

export default function FormatedText({text, css}) {
  return (
    <span className={`text-secondary text-md font-futuralight leading-6 tracking-tight my-4 ${css}`}>
    <Trans
      i18nKey={`${text}`}
      components={{ br: <br /> }}
    />
    </span>
  );
}
