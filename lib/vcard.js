export function generateVCard(member) {
  const vcard = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${member.firstName} ${member.lastName}`,
    `N:${member.lastName};${member.firstName};;;`,
    `ORG:${member.company}`,
    `TITLE:${member.position}`,
    `EMAIL;TYPE=INTERNET:${member.email}`,
    `TEL;TYPE=VOICE:${member.phone}`,
    `ADR;TYPE=WORK:;;${member.address};;;;`,
    `URL:${member.website}`,
    'END:VCARD'
  ];

  return vcard.join('\n');
}

export function downloadVCard(vcard, fileName) {
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${fileName}.vcf`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
}