# FrontendMain
Main branch for production on the frontend

# DAY 1 FRONTEND

# HOW TO CONNECT YOUR MSK CLUSTER TO PROMETHEUS

# Set up an ec2 service running prometheus
-Create a ec2 instance in the same vpc as your desired MSK cluster
-make sure you give your ec2 instance the right IAM role to access your MSK cluster as well as a security group to allow communication between your ec2 instance and MSK Cluster
- Download Prometheus(select your desired version https://prometheus.io/download/) and copy the link and use the command wget https://github.com/prometheus/prometheus/releases/download/v2.53.2/prometheus-2.53.2.darwin-amd64.tar.gz replacing the link with your desired version.
- Next untar the file using the command tar xvfz prometheus-2.48.0.linux-amd64.tar.gz replacing the file name with the downloaded prometheus tar file.(use ls to see file name)
# Copy the Prometheus binary to /usr/local/bin
sudo cp prometheus-2.48.0.linux-amd64/prometheus /usr/local/bin
# Copy promtool to /usr/local/bin/
sudo cp prometheus-2.48.0.linux-amd64/promtool /usr/local/bin/
# Copy the consoles directory to /etc/prometheus
sudo cp -r prometheus-2.48.0.linux-amd64/consoles /etc/prometheus
# Copy the 'console_libraries' directory to /etc/prometheus
sudo cp -r prometheus-2.48.0.linux-amd64/console_libraries /etc/prometheus
sudo cp prometheus-2.48.0.linux-amd64/promtool /usr/local/bin/
# Remove the Prometheus archive and extracted directory
rm -rf prometheus-2.48.0.linux-amd64.tar.gz prometheus-2.48.0.linux-amd64
# Add the Prometheus YML file to configure how prometheus will scrape metrics
We can do this by using either sudo nano /etc/prometheus/prometheus.yml or sudo vi /etc/prometheus/prometheus.yml

here is an example config file for prometheus with two jobs for brockers on your msk cluster(Note you will want to enable monitoring for prometheus on your MSK cluster with JMX Exporter and Node Exporter)

your broker endpoint can be found in the properties tab of your MSK Cluster
global:
  scrape_interval: 15s
  external_labels:
    monitor: 'Kafka'
scrape_configs:
  - job_name: 'Broker1-JMX'
    static_configs:      
      - targets: ['{YOUR-BROKER-ENDPOINT}:11001']  
  - job_name: 'Broker1-NODE'
    static_configs:
      - targets: ['{YOUR-BROKER-ENDPOINT}:11002']
By default AWS MSK set's your JMX Exporter to expose to port 11001, and your Node Exporter to expose to port 11002

# Create the service in your instances systemd
To do this we will create a service file using the command sudo nano /etc/systemd/system/prometheus.service

Then copy this into the service file
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]

User=prometheus
Group=prometheus
Type=simple
ExecStart=/usr/local/bin/prometheus \
    --config.file /etc/prometheus/prometheus.yml \
    --storage.tsdb.path /var/lib/prometheus/ \
    --web.console.templates=/etc/prometheus/consoles \
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target

Now save the file andwe will change the file permissions for the files we just created.
sudo chown prometheus:prometheus /etc/prometheus
sudo chown prometheus:prometheus /usr/local/bin/prometheus
sudo chown prometheus:prometheus /usr/local/bin/promtool
sudo chown -R prometheus:prometheus /etc/prometheus/consoles
sudo chown -R prometheus:prometheus /etc/prometheus/console_libraries
sudo chown -R prometheus:prometheus /var/lib/prometheus

Now all that is left to do is reload the system daemon then start our new service.
sudo systemctl daemon-reload
sudo systemctl start prometheus

Now we can check the status of the service using
sudo systemctl status prometheus


If you want to see the metrics you are scraping from your broker simply go to the public address of your ec2 instance on port 9090
{YOUR_EC2_INSTANCE_PUBLICIPv4}:9090(You will use this address later to connect your prometheus to our web application.)
