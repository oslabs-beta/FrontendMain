import "../css/system.css";
import { useMemo } from "react";

function System(): JSX.Element {
  const grafanaIframe = useMemo(() => {
    return (
      <>
        <div id="active">
          <iframe
            //acctive broker count
            src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=94"
            width="450"
            height="200"
          ></iframe>
          <iframe
            src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=75"
            width="450"
            height="200"
            //active controller count
          ></iframe>
        </div>
  
          <div id="memPanels">
            <iframe
              className="frames"
              src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=100"
              width="300"
              height="150"
              //free memory
            ></iframe>
            <iframe
              className="frames"
              src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&from=1729047986334&to=1729049786334&theme=dark&panelId=28"
              width="300"
              height="150"
              //total memory
            ></iframe>
          </div>
          <iframe
            className="frames"
            src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=58"
            width="600"
            height="300"
            //cpu
          ></iframe>

        <iframe
          id="largeframe"
          className="frames"
          src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=105"
          width="900"
          height="200"
          //memory pool
        ></iframe>
        <iframe
          className="frames"
          src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=62"
          width="450"
          height="200"
          //heartbeat reqs
        ></iframe>
        <iframe
          className="frames"
          src="http://localhost:3001/d-solo/qPkgGHg7k/kafka?orgId=1&theme=dark&panelId=108"
          width="450"
          height="200"
          //error reate
        ></iframe>
      </>
    );
  }, []);

  //metadata batch size /
  return (
    <>
      <div id="systempage">{grafanaIframe}</div>
    </>
  );
}

export default System;
