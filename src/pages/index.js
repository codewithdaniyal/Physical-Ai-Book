import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <div className="row">
          {/* LEFT SIDE: TEXT */}
          <div className={clsx('col col--6', styles.heroText)}>
            <h1 className="hero__title">
              The Future is <span style={{color: '#25c2a0'}}>Physical</span>.
            </h1>
            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/docs/intro">
                📖 Read the Book
              </Link>
              <Link
                className="button button--secondary button--lg"
                style={{marginLeft: '10px'}}
                to="http://127.0.0.1:8000/docs">
                🤖 Talk to AI
              </Link>
            </div>
          </div>
          
          {/* RIGHT SIDE: VISUAL (Using Docusaurus default SVG as a placeholder) */}
          <div className="col col--6">
            <div className={styles.heroImage}>
              <img 
                src={require('@site/static/img/undraw_docusaurus_tree.svg').default} 
                alt="Robotics" 
                style={{width: '100%', maxHeight: '400px'}}
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Physical AI`}
      description="The textbook for the next industrial revolution">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}