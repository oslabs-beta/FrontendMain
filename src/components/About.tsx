import '../css/about.css';
import { useEffect } from 'react';
import { useBgColor } from './BgColorContext';
import { motion, AnimatePresence } from 'framer-motion';

interface AboutProps {
  showDescription: boolean;
  setShowDescription: React.Dispatch<React.SetStateAction<boolean>>;
}

const About: React.FC<AboutProps> = ({
  showDescription,
  setShowDescription,
}) => {
  const { textColor } = useBgColor();

  useEffect(() => {
    setShowDescription(true);
  }, []);

  return (
    <div className='about-container' style={{ color: textColor }}>
      <h1 className='aboutHeader'>
        <img
          src='src/assets/KafkaLogo.png'
          alt='Kafka logo'
          className='KafkaLogo'
        />{' '}
        What is Kafka?
      </h1>
      <AnimatePresence>
        {showDescription && (
          <motion.div
            className='about-description'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1.5 }}
          >
            <p className='about1'>
              <div style={{ textIndent: '40px' }}>
                <strong>Apache Kafka</strong> is an open-source data streaming
                platform used to process, store, and analyze real-time and
                historical data. It offers several key features:
              </div>
              <br />
              <div style={{ textIndent: '40px' }}>
                <strong>Publish: </strong>Data events are published to Kafka
                topics.
              </div>
              <div style={{ textIndent: '40px' }}>
                <strong>Consume: </strong>
                Applications subscribe to topics to process data.
              </div>
              <div style={{ textIndent: '40px' }}>
                <strong>Process: </strong>
                Kafka Streams API enables real-time data processing.
              </div>
              <div style={{ textIndent: '40px' }}>
                <strong>Connect: </strong>
                Reusable connectors link Kafka topics with applications.
              </div>
              <div style={{ textIndent: '40px' }}>
                <strong>Store: </strong>Kafka provides durable, fault-tolerant
                storage.
              </div>
              <div style={{ textIndent: '40px' }}>
                <strong>Kafka</strong> is used to build real-time streaming
                pipelines and applications. For example, it can track website
                user activity or serve as a message broker between applications.
              </div>
              <br />
              <div style={{ textIndent: '40px' }}>
                Originally developed at LinkedIn to handle 1.4 trillion messages
                per day, Kafka was open-sourced in 2011 and graduated from the
                Apache Incubator in 2012. The name, inspired by writer Franz
                Kafka, reflects the system's focus on writing.
              </div>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      <h2 className='aboutHeader'>
        <img
          className='aboutSFLogo'
          src='src/assets/streamForgeObs-logo.png'
          alt='StreamForgeObs logo'
        />{' '}
        Why StreamForgeObs?
      </h2>
      <AnimatePresence>
        {showDescription && (
          <motion.div
            className='about-description'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 0.7, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 1.5 }}
          >
            <p className='about2' style={{ textIndent: '40px' }}>
              <strong>Our goal</strong> in developing this application is to
              provide developers with an intuitive, open-source observability
              tool for monitoring Kafka clusters. While there are established
              paid solutions in this space, we aim to offer a free alternative
              that enables both experienced and novice Kafka users to gain
              deeper insights into the operation of their clusters. Although
              StreamForge may not yet match the full functionality of larger
              players in the observability landscape, we are committed to
              continuously enhancing and expanding our platform. Our focus is to
              deliver clear, actionable metrics that empower users to
              effectively monitor and optimize their Kafka clusters.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default About;
