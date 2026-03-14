'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ChevronRight, Phone, Mail, MapPin, Clock } from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export default function ContactClient() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.phone ||
      !formData.subject ||
      !formData.message
    ) {
      alert('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/xpwzgkvq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
          _subject: `WCC Contact: ${formData.subject}`,
        }),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        // Fallback to mailto
        const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`;
        const mailto = `mailto:admin@wc-con.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
        window.open(mailto, '_blank');
        setSubmitSuccess(true);
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      }
    } catch {
      // Fallback to mailto on network error
      const emailBody = `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\n\n${formData.message}`;
      const mailto = `mailto:admin@wc-con.com?subject=${encodeURIComponent(formData.subject)}&body=${encodeURIComponent(emailBody)}`;
      window.open(mailto, '_blank');
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container-wide section-padding py-4">
          <div className="flex items-center text-sm text-gray-600">
            <Link href="/" className="hover:text-brand-red">
              Home
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-brand-charcoal font-semibold">Contact</span>
          </div>
        </div>
      </div>

      {/* Contact Information & Form */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-8">
                Get In Touch
              </h2>

              {/* Office */}
              <div className="mb-8">
                <div className="flex items-start mb-4">
                  <MapPin className="w-6 h-6 text-brand-red mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-bold text-brand-charcoal mb-2">
                      Office Address
                    </h3>
                    <p className="text-gray-700">
                      450 East River Road<br />
                      Hinton, AB T7V 2A3<br />
                      Canada
                    </p>
                  </div>
                </div>
              </div>

              {/* Phone */}
              <div className="mb-8">
                <div className="flex items-start mb-4">
                  <Phone className="w-6 h-6 text-brand-red mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-bold text-brand-charcoal mb-2">
                      Phone
                    </h3>
                    <p className="text-gray-700 mb-2">
                      <a
                        href="tel:(780)865-3000"
                        className="hover:text-brand-red font-semibold"
                      >
                        (780) 865-3000
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">General inquiries</p>
                    <p className="text-gray-700 mt-3">
                      <a
                        href="tel:(780)865-0068"
                        className="hover:text-brand-red font-semibold"
                      >
                        (780) 865-0068
                      </a>
                    </p>
                    <p className="text-sm text-gray-600">Dispatch</p>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div className="mb-8">
                <div className="flex items-start mb-4">
                  <Clock className="w-6 h-6 text-brand-red mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-bold text-brand-charcoal mb-2">
                      Business Hours
                    </h3>
                    <div className="text-gray-700 text-sm space-y-1">
                      <p>Monday - Friday: 7:00 AM - 5:00 PM</p>
                      <p>Saturday: By appointment</p>
                      <p>Sunday: Closed</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <div className="flex items-start mb-4">
                  <Mail className="w-6 h-6 text-brand-red mr-4 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-heading font-bold text-brand-charcoal mb-2">
                      Email
                    </h3>
                    <p className="text-gray-700">
                      <a
                        href="mailto:info@wc-con.com"
                        className="hover:text-brand-red"
                      >
                        info@wc-con.com
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
                <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-6">
                  Send Us a Message
                </h2>

                {submitSuccess && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700">
                    <p className="font-semibold">Message sent successfully!</p>
                    <p className="text-sm">
                      We'll get back to you as soon as possible.
                    </p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Name"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                      />
                    </div>
                    <div>
                      <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="(780) 000-0000"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="e.g., Quote Request, Equipment Rental"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block font-heading font-semibold text-brand-charcoal mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your inquiry..."
                      rows={6}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-red"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary bg-brand-red text-white disabled:opacity-50"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="section-padding bg-gray-50 border-t border-gray-200">
        <div className="container-wide">
          <h2 className="font-heading text-2xl font-bold text-brand-charcoal mb-8">
            Find Us
          </h2>
          <div className="w-full h-96 rounded-lg overflow-hidden border border-gray-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2728.0!2d-117.53149!3d53.43531!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x539c8ebdb0bcea6d%3A0x5851f2b476451a5!2s450%20E%20River%20Rd%2C%20Hinton%2C%20AB%20T7V%202A3%2C%20Canada!5e0!3m2!1sen!2sca"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="West Central Contracting - 450 East River Road, Hinton, AB"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
