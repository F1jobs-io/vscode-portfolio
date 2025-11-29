import { VerticalTimeline } from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import ExperienceCard from '../components/ExperienceCard';
import experienceData from '../data/experience.json';

const ExperiencePage = ({ experiences }) => {
  return (
    <VerticalTimeline>
      {experiences.map((experience) => (
        <ExperienceCard key={experience.id} experience={experience} />
      ))}
    </VerticalTimeline>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Experience', experiences: experienceData },
  };
}

export default ExperiencePage;
