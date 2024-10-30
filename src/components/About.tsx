import { color } from "framer-motion";
import '../css/about.css';
import { image } from "framer-motion/client";

const About: React.FC = () => {
  return <div>
    <h1 className="aboutHeader">
    {<img src="src/assets/KafkaLogo.png"className="KafkaLogo"/>} What is Kafka?
    </h1>
    <p className="about">
    Apache Kafka is an open-source data streaming platform used to process, store, and analyze real-time and historical data. It offers several key features:<br/>
    <br/>
    Publish: Data events are published to Kafka topics.<br/><br/>
    Consume: Applications subscribe to topics to process data.<br/><br/>
    Process: Kafka Streams API enables real-time data processing.<br/><br/>
    Connect: Reusable connectors link Kafka topics with applications.<br/><br/>
    Store: Kafka provides durable, fault-tolerant storage.<br/><br/>
    Kafka is used to build real-time streaming pipelines and applications. For example, it can track website user activity or serve as a message broker between applications.
    <br/>
    Originally developed at LinkedIn to handle 1.4 trillion messages per day, Kafka was open-sourced in 2011 and graduated from the Apache Incubator in 2012. The name, inspired by writer Franz Kafka, reflects the system's focus on writing.
    </p>
    <br/>
    <h2 className="aboutHeader">
    {<img className='aboutSFLogo' src="src/assets/steamForge-logo.png"/>} Why StreamForge?
    </h2>
    <p className="about">

Our goal in developing this application is to provide developers with an intuitive, open-source observability tool for monitoring Kafka clusters.<br/>
 While there are established paid solutions in this space, we aim to offer a free alternative that enables both experienced and novice Kafka users <br/>
 to gain deeper insights into the operation of their clusters. Although StreamForge may not yet match the full functionality of larger players in <br/>
 the observability landscape, we are committed to continuously enhancing and expanding our platform. Our focus is to deliver clear, actionable metrics<br/>
  that empower users to effectively monitor and optimize their Kafka clusters.
    </p>
  </div>;
};



export default About;

