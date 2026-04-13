import React, { useState, useEffect } from 'react';
import './ContactForm.css';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    phone: '',
    email: '',
    problemDescription: '',
    consentDataProcessing: false,
    consentPromo: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [attemptedSubmit, setAttemptedSubmit] = useState(false); // Для подсветки ошибок

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAttemptedSubmit(true);

    // Валидация важных полей
    const isFormValid = 
      formData.name.trim() !== '' && 
      formData.phone.trim() !== '' && 
      formData.email.trim() !== '' && 
      formData.consentDataProcessing;

    if (!isFormValid) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const API_URL = import.meta.env.VITE_API_URL || "";

      const res = await fetch(`${API_URL}/api/contact/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Ошибка отправки");

      setIsSuccess(true);
      setAttemptedSubmit(false);

      setFormData({
        name: '',
        organization: '',
        phone: '',
        email: '',
        problemDescription: '',
        consentDataProcessing: false,
        consentPromo: false
      });

    } catch (err) {
      console.error(err);
      setError("Ошибка при отправке. Попробуйте позже.");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setIsSuccess(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const isInvalid = (name) => attemptedSubmit && !formData[name];

  return (
    <section id="order-form" className="contact">
      <div className="container">
        <div className="contact__wrapper">
          <h2 className="contact__title">Связаться с командой</h2>
          <p className="contact__subtitle">
            Оставьте данные и мы свяжемся с вами в течение 2-х рабочих дней
          </p>

          <form className="contact__form" onSubmit={handleSubmit} noValidate>
            <div className="contact__row">
              <input 
                type="text" 
                name="name" 
                placeholder="Имя *" 
                className={`contact__input ${isInvalid('name') ? 'contact__input--error' : ''}`}
                value={formData.name}
                onChange={handleChange}
              />
              <input 
                type="text" 
                name="organization" 
                placeholder="Организация" 
                className="contact__input"
                value={formData.organization}
                onChange={handleChange}
              />
            </div>

            <div className="contact__row">
              <input 
                type="tel" 
                name="phone" 
                placeholder="Телефон *" 
                className={`contact__input ${isInvalid('phone') ? 'contact__input--error' : ''}`}
                value={formData.phone}
                onChange={handleChange}
              />
              <input 
                type="email" 
                name="email" 
                placeholder="E-mail *" 
                className={`contact__input ${isInvalid('email') ? 'contact__input--error' : ''}`}
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="contact__row contact__row--full">
             <textarea 
              name="problemDescription" 
              placeholder="Опишите свою проблему" 
              className="contact__input contact__textarea"
              rows="1"
              value={formData.problemDescription}
              onChange={handleChange}
             ></textarea>
            </div>

            <div className="contact__checkboxes">
              <label className={`contact__checkbox-label ${isInvalid('agreement') ? 'contact__checkbox-label--error' : ''}`}>
                <input 
                  type="checkbox" 
                  name="consentDataProcessing" 
                  className="contact__checkbox-hidden"
                  checked={formData.consentDataProcessing}
                  onChange={handleChange}
                />
                <span className="contact__checkbox-custom"></span>
                Даю согласие на обработку персональных данных *
              </label>

              <label className="contact__checkbox-label">
                <input 
                  type="checkbox" 
                  name="consentPromo" 
                  className="contact__checkbox-hidden"
                  checked={formData.consentPromo}
                  onChange={handleChange}
                />
                <span className="contact__checkbox-custom"></span>
                Даю согласие на получение рекламных рассылок и персональных предложений
              </label>
            </div>

            <button type="submit" className="contact__btn" disabled={isSubmitting}>
              {isSubmitting ? (
                <div className="dot-loader">
                  <span></span><span></span><span></span>
                </div>
              ) : "Оставить заявку"}
            </button>
            
            {error && <p style={{color: '#ff4d4d', marginTop: '10px'}}>{error}</p>}
          </form>
        </div>
      </div>

      {isSuccess && (
        <div className="success-overlay">
          <div className="success-modal">
            <h3>Ваша заявка отправлена!</h3>
            <p>Свяжемся с вами по почте в течение 2-х рабочих дней.</p>
            <button className="success-close" onClick={() => setIsSuccess(false)}>Отлично</button>
          </div>
        </div>
      )}
    </section>
  );
}