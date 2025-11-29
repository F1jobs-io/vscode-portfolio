import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import EducationCard from '../components/EducationCard';
import educationData from '../data/education.json';

const EducationPage = ({ educations }) => {
  return (
    <VerticalTimeline>
      {educations.map((education) => (
        <EducationCard key={education.id} education={education} />
      ))}
    </VerticalTimeline>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Education', educations: educationData },
  };
}

export default EducationPage;
