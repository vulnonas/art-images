import React, { useEffect, useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import SectionTitle from '../components/SectionTitle';

const TELEGRAM_BOT_TOKEN = '7716586293:AAH8-Saj1SD_j2iktWamrceBcw7Idyi8Za0';
const CHAT_ID = '860658491';

const ContactPage = () => {
  useEffect(() => {
    document.title = 'Контакты | Валерий Багаев';
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (!value.startsWith('7') && value.length > 0) {
      value = '7' + value;
    }
    
    if (value.length > 0) {
      value = '+' + value;
      
      if (value.length > 2) {
        value = value.slice(0, 2) + ' (' + value.slice(2);
      }
      if (value.length > 7) {
        value = value.slice(0, 7) + ') ' + value.slice(7);
      }
      if (value.length > 12) {
        value = value.slice(0, 12) + '-' + value.slice(12);
      }
      if (value.length > 15) {
        value = value.slice(0, 15) + '-' + value.slice(15);
      }
    }
    
    // Limit to full phone number length
    if (value.length <= 18) {
      setFormData(prev => ({ ...prev, phone: value }));
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === 'phone') return; // Phone is handled separately
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const messageText = `
Новое сообщение с сайта:
👤 Имя: ${formData.name}
📱 Телефон: ${formData.phone}
📋 Тема: ${formData.subject}
💬 Сообщение: ${formData.message}
    `.trim();

    try {
      const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: messageText,
          parse_mode: 'HTML'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setFormStatus({
        submitted: true,
        error: false,
        message: 'Сообщение успешно отправлено!'
      });
      setFormData({ name: '', phone: '', subject: '', message: '' });
    } catch (error) {
      setFormStatus({
        submitted: true,
        error: true,
        message: 'Произошла ошибка при отправке сообщения. Пожалуйста, попробуйте позже.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 animate-fadeIn">
      <div className="container mx-auto px-4">
        <SectionTitle 
          title="Обратная связь"
          subtitle="Есть вопросы о приобретении картины или хотите заказать? Напишите мне!"
        />

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h3 className="text-2xl font-serif font-medium text-[#586552] mb-6">
              Контактная информация
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <Mail className="h-6 w-6 text-[#586552] mt-1" />
                <div className="ml-4">
                  <p className="font-medium text-[#586552]">Email</p>
                  <a href="mailto:5valera@mail.ru" className="text-[#898873] hover:text-[#586552]">
                    5valera@mail.ru
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="h-6 w-6 text-[#586552] mt-1" />
                <div className="ml-4">
                  <p className="font-medium text-[#586552]">Телефон</p>
                  <a href="tel:+79202501022" className="text-[#898873] hover:text-[#586552]">
                    +7 920 250-10-22
                  </a>
                </div>
              </div>
              
              <div className="flex items-start">
                <MapPin className="h-6 w-6 text-[#586552] mt-1" />
                <div className="ml-4">
                  <p className="font-medium text-[#586552]">Адрес</p>
                  <p className="text-[#898873]">
                    Нижний Новгород, Россия
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h3 className="text-2xl font-serif font-medium text-[#586552] mb-6">
              Оставьте сообщение и я свяжусь с вами в ближайшее время!
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#586552]">
                  Имя
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-[#898873]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#586552]"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#586552]">
                  Телефон
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  required
                  placeholder="+7 (___) ___-__-__"
                  className="mt-1 block w-full px-4 py-2 border border-[#898873]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#586552]"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-[#586552]">
                  Тема
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full px-4 py-2 border border-[#898873]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#586552]"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#586552]">
                  Сообщение
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="mt-1 block w-full px-4 py-2 border border-[#898873]/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#586552] resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center bg-[#586552] text-white px-6 py-3 rounded-lg hover:bg-[#586552]/90 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  'Отправка...'
                ) : (
                  <>
                    Отправить
                    <Send className="ml-2 h-4 w-4" />
                  </>
                )}
              </button>

              {formStatus.submitted && (
                <div className={`p-4 rounded-lg ${formStatus.error ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                  {formStatus.message}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;