import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Tab.module.css';
import { getAssetPath } from '../lib/utils';

const Tab = ({ icon, filename, path }) => {
  const router = useRouter();

  return (
    <Link href={path}>
      <div
        className={`${styles.tab} ${router.pathname === path && styles.active}`}
      >
        <img src={getAssetPath(icon)} alt={filename} height={18} width={18} />
        <p>{filename}</p>
      </div>
    </Link>
  );
};

export default Tab;
