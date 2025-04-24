import "../App.css";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { Trophy, Award, Medal, Star } from "lucide-react";
import { timelineEvents } from "../constants/ashenData";
import { useTranslation } from "react-i18next";

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

const Timeline = ({title}:{title:string}) => {
  const { i18n } = useTranslation();

  return (<section className="timeline-section" id="timeline">
    <h2 className="section-title">{title}</h2>
    <VerticalTimeline>
      {timelineEvents.map((event, idx) => (
        <VerticalTimelineElement
          key={idx}
          className="vertical-timeline-element--work"
          date={ i18n.language === "es" ? event.date: event.dateEn}
          iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
          contentStyle={{ background: "#57329F" }}
          icon={getIcon(idx)}
        >
          <h3 className="vertical-timeline-element-title">{ event.title }</h3>
          <p>{ i18n.language === "es" ? event.text: event.textEn}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  </section>);
};

export default Timeline;
