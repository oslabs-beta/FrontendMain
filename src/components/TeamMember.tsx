import { LazyLoadImage } from 'react-lazy-load-image-component';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';

export interface TeamMemberProps {
  member: {
    id: string;
    name: string;
    image: string;
    github: string;
    linkedin: string;
  };
}

const TeamMember: React.FC<TeamMemberProps> = ({ member }) => {
  return (
    <div key={member.id} id={member.id}>
      <motion.div
        whileHover={{ scale: 1.2 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <LazyLoadImage src={member.image} alt={`${member.name} headshot`} />
      </motion.div>
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
  );
};

export default TeamMember;
