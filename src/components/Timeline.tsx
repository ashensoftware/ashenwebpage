import React from "react";
import "../App.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Trophy, Award, Medal, Star } from "lucide-react";
import { timelineEvents } from "../constants/ashenData";

const getIcon = (index: number) => {
  switch (index) {
    case 0:
      return <Trophy size={24} />;
    case 1:
      return <Award size={24} />;
    case 2:
      return <Medal size={24} />;
    default:
      return <Star size={24} />;
  }
};

const Timeline: React.FC = () => (
  <section className="timeline-section" id="timeline">
    <h2 className="section-title">Logros y Eventos</h2>
    <VerticalTimeline>
      {timelineEvents.map((event, idx) => (
        <VerticalTimelineElement
          key={idx}
          className="vertical-timeline-element--work"
          date={event.date}
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentStyle={{ background: "#57329F" }}
          icon={getIcon(idx)}
        >
          <h3 className="vertical-timeline-element-title">{event.title}</h3>
          <p>{event.text}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  </section>
);

export default Timeline;
