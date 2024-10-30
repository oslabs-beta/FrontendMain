import React, { useEffect } from 'react';
import '../css/profile.css';
import { fetchData } from '../helpers/fetchData';
import updateDataSource from '../helpers/updateDataSource';

interface ProfileProps {
  dataSource: string;
  setDataSource: (value: string) => void;
  ip: string;
  setIp: (value: string) => void;
  port: string;
  setPort: (value: string) => void;
}

export default function Profile({
  dataSource,
  setDataSource,
  ip,
  setIp,
  port,
  setPort,
}: ProfileProps): JSX.Element {
  useEffect(() => {
    const savedDataSource = localStorage.getItem('dataSource');
    if (savedDataSource) {
      setDataSource(savedDataSource);
    }
  }, [setDataSource]);

  useEffect(() => {
    localStorage.setItem('dataSource', dataSource);
  }, [dataSource]);

  const handleSetDataSource = async (e: React.FormEvent) => {
    e.preventDefault();

    const newDataSource = `http://${ip}:${port}/api/v1/query?query=`;
    console.log(newDataSource);
    setDataSource(newDataSource);
    updateDataSource(newDataSource);
    setIp('');
    setPort('');

    //call fetch func
    try {
      const fetchedData = await fetchData();
      console.log(fetchedData);
    } catch (error) {
      console.error('Error fetching Data', error);
    }
  };
  return (
    <form onSubmit={handleSetDataSource}>
      <div className='user-container'>
        <div className='user-inputField'>
          <div>
            <label htmlFor='dataSource-ip'>IP address: </label>
            <input
              className='dataSource-ip'
              type='text'
              value={ip}
              onChange={(e) => setIp(e.target.value)}
              required
            ></input>
            <span style={{ fontSize: '10px', paddingLeft: '30px' }}>
              If you want to fetch from a local running application, use{' '}
              <span
                style={{
                  color: '#03A062', //matrix
                  fontWeight: 'bold',
                  fontSize: '15px',
                }}
              >
                [localhost]
              </span>{' '}
              for IP address
            </span>
          </div>
          <div>
            <label htmlFor='dataSource-port' style={{ paddingRight: '67px' }}>
              Port:{' '}
            </label>
            <input
              className='dataSource-port'
              type='text'
              value={port}
              onChange={(e) => setPort(e.target.value)}
              required
            ></input>
            <button type='submit'>Add</button>
          </div>
        </div>
        <div className='user-displayField'>
          <p>
            <span
              style={{
                color: '#03A062',
                fontWeight: 'bold',
                fontSize: '15px',
                paddingRight: '20px',
              }}
            >
              Data Source:
            </span>
            {dataSource}
          </p>
        </div>
      </div>
    </form>
  );
}
