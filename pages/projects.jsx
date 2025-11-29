import ProjectCard from '../components/ProjectCard';
import projectsData from '../data/projects.json';
import styles from '../styles/ProjectsPage.module.css';

const ProjectsPage = ({ projects }) => {
  return (
    <>
      <h3>Stuff I've Built So Far</h3>
      <div className={styles.container}>
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: { title: 'Projects', projects: projectsData },
  };
}

export default ProjectsPage;
