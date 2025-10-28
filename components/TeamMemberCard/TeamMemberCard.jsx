'use client';

import { useState, useEffect } from 'react';
import { pb } from '@/lib/pocketbase';
import { generateVCard, downloadVCard } from '@/lib/vcard';
import { FaEnvelope, FaPhone, FaGlobe } from 'react-icons/fa6';
import { useTranslation } from 'react-i18next';

export default function TeamMemberCard({ memberId }) {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { t } = useTranslation();

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  useEffect(() => {
    async function fetchMember() {
      try {
        setLoading(true);
        const data = await pb.collection('team').getOne(memberId);
        console.log('Member data:', data);
        setMember(data);
      } catch (err) {
        console.error('Error fetching member:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    if (memberId) {
      fetchMember();
    }
  }, [memberId]);

  const handleDownloadVCard = () => {
    if (member) {
      const vcard = generateVCard(member);
      downloadVCard(vcard, `${member.firstName}_${member.lastName}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error</h2>
          <p className="text-gray-600">{error || 'No se pudo cargar el contacto'}</p>
        </div>
      </div>
    );
  }

  const photoUrl = member.picture 
    ? `${backendUrl}/api/files/${member.collectionId}/${member.id}/${member.picture}`
    : null;

  console.log('Photo URL:', photoUrl);

    return (
    <div className="h-screen bg-white flex items-start justify-start">
      <div className="w-full  ">
        {/* Header Section with Background */}
        <div 
          className="relative h-[280px] bg-cover bg-center bg-[#646363] "
        >

          {/* Logo */}
          <div className="flex flex-col items-center pt-4">
            <img 
              src="/assets/images/logo_v1.png" 
              alt="Adriatika Logo" 
              className="w-32 h-auto"
            />
          </div>
        </div>

        {/* Profile Section */}
        <div className="relative bg-white -mt-20 pt-12 pb-8 px-8 rounded-t-2xl">
            
          {/* Avatar */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-20">
            <div className="relative w-40 h-40">

              <div className="relative w-40 h-40 rounded-full bg-white p-2 z-10">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-200">
                  <img 
                    src={photoUrl || '/assets/images/default_avatar.png'}
                    alt="Melissa peters"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Name and Title */}
          <div className="text-center mt-8 mb-4">
            <h1 className="text-black text-xl mb-2">{member.firstName} {member.lastName}</h1>
            <p className="text-gray-500">{member.title}</p>
          </div>

          {/* Description */}
          <p className="text-center text-gray-400 mb-8 px-4">
            Lorem ipsum dolor sit amet consectetur. Eget faucibus pretium ornare vehicula duis. Luctus id semper vitae vivamus et cursus eu libero.
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center items-center gap-6 mb-8">
            <a className="w-14 h-14 rounded-full bg-gradient-to-br from-[#646363] to-[#cd1316] flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow" href={`tel:${member.phone}`}>
              <FaPhone className="w-6 h-6" />
            </a>
            
            <div className="w-px h-8 bg-gray-300"></div>
            
            <a className="w-14 h-14 rounded-full bg-gradient-to-br from-[#646363] to-[#cd1316] flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow" href={`mailto:${member.email}`}>
              <FaEnvelope className="w-6 h-6" />
            </a>
            
            <div className="w-px h-8 bg-gray-300"></div>

            <a className="w-14 h-14 rounded-full bg-gradient-to-br from-[#646363] to-[#cd1316] flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow" href={member.website} target="_blank" rel="noopener noreferrer">
              <FaGlobe className="w-6 h-6" />
            </a>
          </div>

          {/* Contact Information Card */}
          <div className="bg-white rounded-2xl shadow-md p-6 space-y-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#646363] to-[#cd1316] flex items-center justify-center flex-shrink-0">
                <FaEnvelope className="w-5 h-5 text-white" />
              </div>
              <a className="text-gray-500 truncate max-w-[220px]" href={`mailto:${member.email}`}>{member.email}</a>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#646363] to-[#cd1316] flex items-center justify-center flex-shrink-0">
                <FaPhone className="w-5 h-5 text-white" />
              </div>
              <a className="text-gray-500" href={`tel:${member.phone}`}>
                {member.phone}
              </a>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#646363] to-[#cd1316] flex items-center justify-center flex-shrink-0">
                <FaGlobe className="w-5 h-5 text-white" />
              </div>
              <a className="text-gray-500 truncate max-w-60" href={member.website} target="_blank" rel="noopener noreferrer">
                {member.website}
              </a>
            </div>
          </div>
            {/* Download VCard Button */}
            <div className="flex justify-center mt-8">
              <a href={`/path/to/vcard/${member.id}.vcf`} className="bg-[#646363] text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transition-shadow">
                {
                    t('team:add_contact')
                }
              </a>
            </div>
          </div>
        </div>
      </div>
    );
}
    
