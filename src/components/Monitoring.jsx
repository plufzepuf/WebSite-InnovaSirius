import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import './Monitoring.css';

import photo1 from '../assets/photos/menu1.jpg';
import photo2 from '../assets/photos/menu2.png';
import photo3 from '../assets/photos/menu3.png';
import photo4 from '../assets/photos/menu4.png';
import photo5 from '../assets/photos/menu5.png';

const tabsData = [
  {
    id: 0,
    title: 'Образовательные учреждения',
    heading: 'Школы, вузы, колледжи, детские технопарки, учебные центры',
    photo: photo1,
    points: [
      {
        title: 'Слепые зоны — главная уязвимость',
        desc: 'Туалеты, раздевалки и дальние рекреации — места, где видеонаблюдение запрещено или неэффективно. Именно там школьники и студенты беспрепятственно используют электронные сигареты.'
      },
      {
        title: 'Профилактика не работает без фиксации',
        desc: 'Устные запреты и беседы не дают результата, пока у вас нет реальных инструментов. В итоге администрация остается один на один с жалобами родителей и рисками штрафов. Мы предоставляем вам точный инструмент для мониторинга скрытых зон.'
      }
    ]
  },
  {
    id: 1,
    title: 'Проживание',
    heading: 'Гостиницы, отели, апартаменты, хостелы, санатории',
    photo: photo2,
    points: [
      {
        title: 'Скрытые нарушения в номерах и санузлах',
        desc: 'Ночью, в закрытых номерах контролировать постояльцев практически невозможно. Вейпы используют в комнатах, общих кухнях и санузлах, что приводит к въевшемуся запаху, жалобам соседей и конфликтам.'
      },
      {
        title: 'Моментальное пресечение инцидентов',
        desc: 'Без системы мониторинга администратор узнает о нарушении слишком поздно. Наша система позволяет реагировать моментально: при появлении пара персонал получает пуш-уведомление и может пресечь нарушение «здесь и сейчас», обеспечив порядок и комфорт остальных гостей.'
      }
    ]
  },
  { 
    id: 3, 
    title: 'Транспорт', 
    heading: 'Поезда, вагоны, авиация, общественный транспорт, каршеринг',  
    photo: photo3, 
    points: [
      {
        title: 'Иллюзия безнаказанности в пути',
        desc: 'В замкнутом пространстве пар от электронных сигарет моментально вызывает недовольство других пассажиров. Нарушители прячутся в туалетах поездов или курят прямо за рулем арендованного авто, зная, что доказать вину будет сложно.'
      },
      {
        title: 'Доказательная база для урегулирования',
        desc: 'Итог для бизнеса — испорченный рейтинг, негативные отзывы и постоянные расходы на химчистку салона. Наша система фиксирует пар за 5 секунд, позволяя проводникам, стюардам или операторам каршеринга мгновенно выявлять нарушения.'
      }
    ] 
  },
  { 
    id: 2, 
    title: 'Офис', 
    heading: 'Коворкинги, офисы, бизнес-центры', 
    photo: photo4, 
    points: [
      {
        title: 'Нарушение дисциплины в рабочих зонах',
        desc: 'В современных офисах администрация нередко сталкивается с нарушением регламента, использованием вейпов на лестничных клетках или в зонах отдыха. Это не только вызывает дискомфорт у коллег, но и портит имидж всего бизнес-центра.'
      },
      {
        title: 'Защита от ложных пожарных тревог',
        desc: 'Густой пар от электронных сигарет часто провоцирует ложное срабатывание пожарной сигнализации, парализуя работу здания. Умные датчики реагируют только на компоненты вейпа, помогая службе эксплуатации обеспечивать мониторинг среды без установки камер.'
      }
    ] 
  },
  { 
    id: 4, 
    title: 'Медицина', 
    heading: 'Клиники, больницы, частные медицинские центры', 
    photo: photo5, 
    points: [
      {
        title: 'Угроза санитарным нормам и здоровью',
        desc: 'В клиниках и стационарах любые аэрозоли критически опасны для здоровья пациентов и строго запрещены санитарными нормами. Однако посетители и пациенты периодически нарушают правила в уборных или закрытых палатах.'
      },
      {
        title: 'Автоматический контроль без отрыва персонала',
        desc: 'Запах пара бьет по репутации учреждения. Анти-вейп система берет эту задачу на себя, обеспечивая круглосуточный скрытый контроль. Это помогает поддерживать чистоту среды и избегать проблем с надзорными органами.'
      }
    ] 
  }
];

export default function Monitoring() {
  const [activeTab, setActiveTab] = useState(0);
  const [indicatorStyle, setIndicatorStyle] = useState({
    width: 255, // Твоя стартовая ширина из CSS
    transform: 'translateX(0px)'
  });
  const [isAnimating, setIsAnimating] = useState(false);
  
  const tabsRef = useRef([]);

  const updateIndicator = () => {
    const currentTab = tabsRef.current[activeTab];
    if (currentTab) {
      setIndicatorStyle({
        width: currentTab.offsetWidth,
        transform: `translateX(${currentTab.offsetLeft}px)`
      });
    }
  };

  // Мгновенный расчет до отрисовки
  useLayoutEffect(() => {
    updateIndicator();
  }, [activeTab]);

  // Пересчет при изменении окна или загрузке шрифтов
  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(updateIndicator);
    }
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [activeTab]);

  const handleTabClick = (index) => {
    if (index === activeTab) return;
    setIsAnimating(true);
    setTimeout(() => {
      setActiveTab(index);
      setIsAnimating(false);
    }, 300);
  };

  const activeData = tabsData[activeTab];

  return (
    <section className="monitoring">
      <div className="container monitoring__container">
        <h2 className="monitoring__title">
          Инновационный мониторинг <br />
          воздуха там, где это важно
        </h2>

        <div className="monitoring__desktop-view">
          <div className="monitoring__tabs-wrapper">
            <div className="monitoring__tabs-list">
              <div 
                className="monitoring__tabs-indicator" 
                style={indicatorStyle}
              ></div>
              {tabsData.map((tab, index) => (
                <button
                  key={tab.id}
                  ref={(el) => (tabsRef.current[index] = el)}
                  className={`monitoring__tab-btn ${activeTab === index ? 'is-active' : ''}`}
                  onClick={() => handleTabClick(index)}
                >
                  {tab.title}
                </button>
              ))}
            </div>
          </div>

          <div className={`monitoring__content-box ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            <div className="monitoring__content-header">
              <span className="monitoring__arrows">⟫</span>
              <h3 className="monitoring__heading">{activeData.heading}</h3>
            </div>

            <div className="monitoring__content-body">
              <div className="monitoring__visual">
                <div className="monitoring__photo-frame">
                  <img src={activeData.photo} alt="Интерьер" className="monitoring__photo" />
                </div>
              </div>

              <div className="monitoring__text-content">
                {activeData.points.map((point, idx) => (
                  <div key={idx} className="monitoring__point">
                    <h4 className="monitoring__point-title">• {point.title}</h4>
                    <p className="monitoring__point-desc">{point.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="monitoring__mobile-accordion">
          {tabsData.map((tab, index) => (
            <div 
              key={tab.id} 
              className={`monitoring__accordion-item ${activeTab === index ? 'is-open' : ''}`}
            >
              <button
                className="monitoring__accordion-header"
                onClick={() => setActiveTab(index)}
              >
                {tab.title}
              </button>

              <div className="monitoring__accordion-body">
                <div className="monitoring__accordion-content">
                  <div className="monitoring__content-header">
                    <span className="monitoring__arrows">⟫</span>
                    <h3 className="monitoring__heading">{tab.heading}</h3>
                  </div>

                  <div className="monitoring__text-content">
                    {tab.points.map((point, idx) => (
                      <div key={idx} className="monitoring__point">
                        <h4 className="monitoring__point-title">• {point.title}</h4>
                        <p className="monitoring__point-desc">{point.desc}</p>
                      </div>
                    ))}
                  </div>

                  <div className="monitoring__visual">
                    <div className="monitoring__photo-frame">
                      <img src={tab.photo} alt="Интерьер" className="monitoring__photo" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}