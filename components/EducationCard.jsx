import { VerticalTimelineElement } from 'react-vertical-timeline-component';
import styles from '../styles/EducationCard.module.css';
import { getAssetPath } from '../lib/utils';

const EducationCard = ({ education }) => (
  <VerticalTimelineElement
    className="vertical-timeline-element--education"
    contentStyle={{
      background: '#f9f9f9',
      color: '#333',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
    }}
    contentArrowStyle={{ borderRight: '7px solid #f9f9f9' }}
    date={<div className={styles.dateStyle}>{education.date}</div>}
    iconStyle={{ background: education.iconBg, color: '#fff' }}
    icon={<div className={styles.iconContainer}><img src={getAssetPath(education.icon)} alt={education.school} className={styles.iconSpan} /></div>}
  >
    <h3 className="vertical-timeline-element-title">{education.degree}</h3>
    <h4 className="vertical-timeline-element-subtitle">{education.school}</h4>
    <p>{education.description}</p>
  </VerticalTimelineElement>
);

export default EducationCard;
