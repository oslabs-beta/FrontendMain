import React, { lazy, Suspense, useEffect } from 'react';
import { useBgColor } from './BgColorContext';
import '../css/config.css';
import { teamMembers } from '../assets/teamInfo';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLink as faLinkSimple,
  faArrowRightArrowLeft,
  faGlobe,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import { faDocker, faAws } from '@fortawesome/free-brands-svg-icons';

const TeamMember = lazy(() => import('./TeamMember'));

interface ConfigProps {
  showDescription: boolean;
  setShowDescription: React.Dispatch<React.SetStateAction<boolean>>;
}

const Config: React.FC<ConfigProps> = ({
  showDescription,
  setShowDescription,
}) => {
  const { textColor } = useBgColor();

  useEffect(() => {
    setShowDescription(true);
  });

  return (
    <>
      <div>
        <div className='config-content' style={{ color: `${textColor}` }}>
          <div className='headline'>
            <h1 style={{ fontSize: '55px' }}>
              <p style={{ fontSize: '45px', fontWeight: '900' }}>Spin up</p>
              <strong style={{ fontSize: '120px', color: '#845cc0' }}>
                KAFKA
                <span>
                  <img
                    className='logo'
                    alt='StreamForgeObs logo'
                    src='src/assets/streamForgeObs-logo.png'
                    style={{ height: '180px', padding: '20px' }}
                  />
                </span>
                CLUSTER
              </strong>
              <p
                style={{
                  fontSize: '45px',
                  paddingTop: '17px',
                  fontWeight: '900',
                }}
              >
                to get
              </p>
              <strong
                className='moving-gradient-text'
                style={{
                  fontSize: '80px',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                STARTED
              </strong>
            </h1>
          </div>
          <AnimatePresence>
            {showDescription && (
              <motion.div
                className='product-description'
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 0.7, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 1.5 }}
              >
                <p>
                  <strong>Effortlessly</strong> track and manage your Kafka
                  clusters with an intuitive interface.{' '}
                  <strong>Customize</strong> dashboards to visualize real-time
                  metrics, <strong>leverage</strong> built-in alerts for
                  proactive monitoring, and <strong>integrate</strong>{' '}
                  seamlessly with existing workflows. <strong>Harness</strong>{' '}
                  the power of advanced analytics and reporting features to gain
                  insights and optimize performance.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className='get-start'>
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              style={{
                fontSize: '80px',
                color: '#00CED1',
                marginBottom: '40px',
              }}
            />
            <p style={{ fontSize: '40px', fontWeight: '600' }}>
              Get started the way you want
            </p>
          </div>
          <div className='config-method'>
            <div className='kafka-cloud'>
              <FontAwesomeIcon icon={faGlobe} id='globe-icon' />
              <p style={{ fontSize: '30px' }}>In the cloud</p>
              <p>
                <strong style={{ fontSize: '15px' }}>You</strong> can connect
                our product to your Kafka cluster in the{' '}
                <span style={{ color: '#00a4ef' }}>cloud</span>. Here are the
                steps you need to follow to ensure a robust connection.
              </p>
              <a
                href='https://aws.amazon.com/ec2/'
                aria-label='Go to AWS EC2 site'
                target='_blank'
              >
                <FontAwesomeIcon
                  icon={faAws}
                  style={{ height: '50px', color: '#FF9900' }}
                />
              </a>
              <p>
                <strong style={{ fontSize: '15px' }}>Visit </strong> our{' '}
                <a
                  href='https://github.com/oslabs-beta/FrontendMain/blob/dev/README.md'
                  style={{ color: '#00a4ef', textDecoration: 'none' }}
                >
                  README
                </a>{' '}
                for detailed instructions on deploying your Kafka Cluster on the
                AWS EC2 service. If your cluster is already up and running, head
                to your profile to set your URL and port. Then, navigate to the
                system page to start adding your queries.
              </p>
            </div>
            <div className='kafka-local'>
              <FontAwesomeIcon icon={faDocker} id='docker-icon' />
              <p style={{ fontSize: '30px', marginTop: '15px' }}>
                On your machine
              </p>
              <motion.div
                className='clone-repo'
                whileHover={{ scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <FontAwesomeIcon
                  icon={faLinkSimple}
                  style={{ marginRight: '10px' }}
                />
                <a
                  href='https://github.com/chenaowang-debug/Kafka-Kraft-Docker-Config'
                  target='_blank'
                >
                  Kafka cluster
                </a>
              </motion.div>
              <div>
                <p>
                  Download{' '}
                  <span style={{ color: '#00a4ef' }}>Docker image</span> and
                  onto your local mahine
                </p>
                <p>
                  <strong style={{ fontSize: '15px' }}>kafka</strong> requires
                  JMX to expose its metrics. We have configured this in our
                  Kafka cluster, allowing you to easily spin it up and start
                  experimenting.
                </p>
              </div>
              <div className='docker-code-snippet'>
                <FontAwesomeIcon icon={faCode} />{' '}
                <code>
                  <span className='line'>
                    $ docker-compose up -d
                    <span className='docker-code'></span>
                  </span>
                </code>
              </div>
            </div>
          </div>

          <div className='team'>
            <motion.div
              style={{ fontSize: '65px', fontWeight: 'bold' }}
              whileHover={{ scale: 1.4, rotate: 10 }}
              whileTap={{
                scale: 1,
                rotate: 360,
                borderRadius: '100%',
              }}
            >
              Team
            </motion.div>
          </div>
          <div className='team-content'>
            {teamMembers.map((member) => (
              <Suspense key={member.id} fallback={<div>Loading...</div>}>
                <TeamMember member={member} />
              </Suspense>
            ))}
          </div>
        </div>
      </div>

      <footer></footer>
    </>
  );
};

export default Config;
