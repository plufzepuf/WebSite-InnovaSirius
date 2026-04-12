import React from 'react';
import './Hero.css';
import sensorImg from '../assets/photos/main1.png';
import shapeSvg from '../assets/svg/Union2.svg';
import logo from '../assets/svg/logo.svg';
import shapeMobileSvg from '../assets/svg/Union3.svg'

const scrollToForm = () => {
    const formElement = document.getElementById('order-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

export default function Hero() {
  return (
    <header className="hero">
      <div className="container">
        <div className="hero__header">
          <img src={logo} alt="Logo" className="hero__logo" />
        </div>
        <hr className="hero__line" />
        
        <div className="hero__card-wrapper">
          <img src={shapeSvg} alt="" className="hero__shape hero__shape--desktop" />
          <img src={shapeMobileSvg} preserveAspectRatio="none" alt="" className="hero__shape hero__shape--mobile" />

          <div className="hero__content-overlay"> 
            <div className="hero__text-block">
              <h1 className="hero__title">
                Датчик электронных <br /> сигарет
              </h1>
              <p className="hero__subtitle">
                Инновационная антивейп-система
              </p>
              <button className="hero__btn" onClick={scrollToForm}>
                Оставить заявку
              </button>
            </div>

            <div className="hero__image-block">
              <img src={sensorImg} alt="Датчик" className="hero__sensor" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}