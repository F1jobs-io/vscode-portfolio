import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import styles from '../styles/ExperienceCard.module.css';
import { getAssetPath } from '../lib/utils';

const ExperienceCard = ({ experience }) => (
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{
      background: '#eaeaec',
      color: '#292929',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }}
    contentArrowStyle={{ borderRight: '7px solid  #eaeaec' }}
    date={(
      <div className={styles.dateStyle}>
        {experience.date}
      </div>
    )}
    iconStyle={{ background: experience.iconBg, color: '#fff' }}
    icon={
      <div className={styles.iconContainer}>
        <img src={getAssetPath(experience.icon)} alt={experience.company} className={styles.iconSpan} />
      </div>
    }
  >
    <h3 className="vertical-timeline-element-title">{experience.title}</h3>
    <h4 className="vertical-timeline-element-subtitle">{experience.company}</h4>
    <p>{experience.description}</p>
  </VerticalTimelineElement>
);

export default ExperienceCard;