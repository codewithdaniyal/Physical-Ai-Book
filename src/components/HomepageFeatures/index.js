import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link'; // Import Link for clicking
import styles from './styles.module.css';

// We turned the features into CHAPTER PREVIEWS
const FeatureList = [
  {
    title: 'Chapter 1: Sensors',
    // We use emojis instead of SVGs for a unique look without needing design skills
    emoji: '👁️', 
    link: '/docs/sensors',
    description: (
      <>
        How robots perceive the world using LiDAR, Cameras, and Depth sensors.
        Understand the "eyes" of the machine.
      </>
    ),
  },
  {
    title: 'Chapter 2: Actuators',
    emoji: '🦾',
    link: '/docs/actuators',
    description: (
      <>
        From electric motors to artificial muscles. Learn how robots interact
        physically with their environment.
      </>
    ),
  },
  {
    title: 'Chapter 3: Humanoids',
    emoji: '🤖',
    link: '/docs/humanoids',
    description: (
      <>
        Case studies of Tesla Optimus, Boston Dynamics Atlas, and Figure AI.
        The state of the art in 2025.
      </>
    ),
  },
];

function Feature({emoji, title, description, link}) {
  return (
    <div className={clsx('col col--4')}>
      {/* Wrap the whole card in a Link to make it clickable */}
      <Link to={link} style={{textDecoration: 'none', color: 'inherit'}}>
        <div className="card shadow--md" style={{height: '100%', padding: '20px', cursor: 'pointer', border: '1px solid #ddd'}}>
          <div className="text--center">
            <span style={{fontSize: '4rem'}}>{emoji}</span>
          </div>
          <div className="text--center padding-horiz--md">
            <Heading as="h3" style={{marginTop: '10px'}}>{title}</Heading>
            <p>{description}</p>
            <span className="button button--sm button--outline button--primary">Read Chapter &rarr;</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features} style={{padding: '50px 0'}}>
      <div className="container">
        <div className="text--center" style={{marginBottom: '40px'}}>
          <h2>Course Modules</h2>
          <p>Select a module to begin learning</p>
        </div>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}