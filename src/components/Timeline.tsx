import React from 'react';
import '../App.css';
import { timelineEvents } from '../constants/ashenData';

const Timeline: React.FC = () => (
  <section className="timeline-section" id="timeline">
    <h2 className="section-title">Logros y Eventos</h2>
    <div className="timeline-v2">
      <div className="timeline-v2-line" />
      {timelineEvents.map((event, idx) => (
        <div
          className={`timeline-v2-event ${idx % 2 === 0 ? 'left' : 'right'}`}
          key={idx}
        >
          <div className="timeline-v2-content">
            <img src={event.image} alt={event.title} className="timeline-v2-img" />
            <div>
              <span className="timeline-v2-date">{event.date}</span>
              <h3>{event.title}</h3>
              <p>{event.text}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Timeline; 