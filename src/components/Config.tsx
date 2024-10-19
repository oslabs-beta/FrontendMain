import { useEffect, useState } from 'react';
import '../css/config.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import {
  faLink as faLinkSimple,
  faArrowRightArrowLeft,
  faGlobe,
  faCode,
} from '@fortawesome/free-solid-svg-icons';
import { faDocker } from '@fortawesome/free-brands-svg-icons';

interface TeamMember {
  id: string;
  name: string;
  image: string;
  github: string;
  linkedin: string;
}

const Config: React.FC = () => {
  const [showDescription, setShowDescription] = useState(false);
  const [textColor, setTextColor] = useState<string>('');
  const [BgColor, setBgColor] = useState<string>('');
  const checkBgColor = (): string => {
    return window.getComputedStyle(document.body).backgroundColor;
  };

  useEffect(() => {
    const handleBgColorChange = () => {
      const newBgColor = checkBgColor();
      setBgColor(newBgColor);
      if (
        newBgColor === 'rgb(17, 18, 24)' ||
        newBgColor === 'rgb(28, 28, 30)'
      ) {
        setTextColor('white');
      } else {
        setTextColor('black');
      }
    };
    // Create a new MutationObserver instance that listens for changes to the background color.
    const observer = new MutationObserver(handleBgColorChange);
    // Start observing the body element, specifically watching for changes to the style attribute.
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    });
    // Immediately call handleColorChange once to fetch the initial background color when the component mounts.
    handleBgColorChange();
    // When the component unmounts, stop the MutationObserver to prevent memory leaks.
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setShowDescription(true);
  }, []);

  const teamMembers: TeamMember[] = [
    {
      id: 'allie',
      name: 'Allie Itczak',
      image: 'src/assets/allie-hs.png',
      github: 'https://github.com/aitczak',
      linkedin: 'https://www.linkedin.com/in/allieitczak/',
    },
    {
      id: 'qianlin',
      name: 'Qianlin Zhang',
      image: 'src/assets/qianlin-hs.jpg',
      github: 'https://github.com/QianQian1997',
      linkedin: 'https://www.linkedin.com/in/qianlin-zhang-381972191/',
    },
    {
      id: 'david',
      name: 'David Schweitzer',
      image: 'src/assets/david-hs.png',
      github: 'https://github.com/DSchweitzer314',
      linkedin: 'https://www.linkedin.com/in/david-schweitzer-b34768333/',
    },
    {
      id: 'chenao',
      name: 'Chenao Wang',
      image: 'src/assets/chenao-hs.jpeg',
      github: 'https://github.com/chenaowang-debug',
      linkedin: 'https://www.linkedin.com/in/chenao-wang-ab3b84ab/',
    },
  ];
  return (
    <>
      <div>
        <div className='config-content' style={{ color: `${textColor}` }}>
          <div className='headline'>
            <h1 style={{ fontSize: '55px' }}>
              <p style={{ fontSize: '30px' }}>Spin up</p>
              <strong style={{ fontSize: '80px', color: '#845cc0' }}>
                Kafka
                <span>
                  <img
                    className='logo'
                    src='src/assets/steamForge-logo.png'
                    style={{ height: '180px', padding: '20px' }}
                  />
                </span>
                Cluster
              </strong>
              <p style={{ fontSize: '30px', paddingTop: '17px' }}>to get</p>
              <strong
                className='moving-gradient-text'
                style={{
                  fontSize: '70px',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                }}
              >
                started
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
                  Effortlessly track and manage your Kafka clusters with an
                  intuitive interface. Customize dashboards to visualize
                  real-time metrics, leverage built-in alerts for proactive
                  monitoring, and integrate seamlessly with existing workflows.
                  Harness the power of advanced analytics and reporting features
                  to gain insights and optimize performance.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <div className='get-start'>
            <FontAwesomeIcon
              icon={faArrowRightArrowLeft}
              style={{
                fontSize: '50px',
                color: '#00CED1',
                margin: '40px',
              }}
            />
            <p style={{ fontSize: '40px', fontWeight: '600' }}>
              Get started the way you want
            </p>
          </div>
          <div className='config-method'>
            <div className='kafka-cloud'>
              <FontAwesomeIcon icon={faGlobe} id='globe-icon' />
              <h3>In the cloud</h3>
              <p>
                You can connect our product to your Kafka cluster in the{' '}
                <span style={{ color: '#00a4ef' }}>cloud</span>. Here are the
                steps you need to follow to ensure a robust connection.
              </p>
            </div>
            <div className='kafka-local'>
              <FontAwesomeIcon icon={faDocker} id='docker-icon' />
              <h3>On your machine</h3>
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
                  <span style={{ color: '#0077b3' }}>Docker image</span> onto
                  your local mahine
                </p>
                <p>
                  kafka requires JMX to expose its metrics. We have configured
                  this in our Kafka cluster, allowing you to easily spin it up
                  and start experimenting.
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
              <div key={member.id} id={member.id}>
                <motion.img
                  src={member.image}
                  alt={`${member.name} headshot`}
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
                <p>{member.name}</p>
                <div className='team-icons'>
                  <motion.a
                    href={member.github}
                    target='_blank'
                    rel='noopener noreferrer'
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <FontAwesomeIcon icon={faGithub} className='icon' />
                  </motion.a>
                  <motion.a
                    href={member.linkedin}
                    target='_blank'
                    rel='noopener noreferrer'
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <FontAwesomeIcon icon={faLinkedin} className='icon' />
                  </motion.a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer></footer>
    </>
  );
};

export default Config;
