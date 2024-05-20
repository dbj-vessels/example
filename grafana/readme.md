
- [Grafana in a Docker container on a Windows 10 machine](#grafana-in-a-docker-container-on-a-windows-10-machine)
- [Using docker compose](#using-docker-compose)


# Grafana in a Docker container on a Windows 10 machine

**Follow these steps:**

1. **Install Docker Desktop**:
   - Download and install Docker Desktop from [Docker's official website](https://www.docker.com/products/docker-desktop).
   - Follow the installation instructions and ensure Docker is running on your machine.

2. **Pull the Grafana Docker Image**:
   - Open a terminal (Command Prompt, PowerShell, or any preferred terminal) and pull the Grafana Docker image by running:
     ```sh
     docker pull grafana/grafana
     ```

3. **Run the Grafana Container**:
   - To start a Grafana container, run the following command:
     ```sh
     docker run -d -p 3000:3000 --name=grafana grafana/grafana
     ```
   - This command does the following:
     - `-d` runs the container in detached mode.
     - `-p 3000:3000` maps port 3000 on your host to port 3000 on the container.
     - `--name=grafana` names the container "grafana".
     - `grafana/grafana` specifies the image to use.

4. **Access Grafana**:
   - Open your web browser and navigate to `http://localhost:3000`.
   - The default login credentials are:
     - **Username**: admin
     - **Password**: admin
   - You will be prompted to change the password after the first login.

5. **Persisting Data (Optional but Recommended)**:
   - To ensure your data persists even if the container is stopped or removed, you can mount a volume. First, create a directory on your host system to store Grafana data. For example, create a directory `C:\grafana_data`.
   - Run the container with a volume mount:
     ```sh
     docker run -d -p 3000:3000 --name=grafana -v C:\grafana_data:/var/lib/grafana grafana/grafana
     ```
   - This mounts the `C:\grafana_data` directory on your host to `/var/lib/grafana` in the container, where Grafana stores its data.

6. **Custom Configuration (Optional)**:
   - If you need to customize Grafana settings, you can create a configuration file on your host system and mount it to the container. For example, create a custom configuration file `C:\grafana_config\grafana.ini`.
   - Run the container with the configuration file mounted:
     ```sh
     docker run -d -p 3000:3000 --name=grafana -v C:\grafana_data:/var/lib/grafana -v C:\grafana_config\grafana.ini:/etc/grafana/grafana.ini grafana/grafana
     ```

By following these steps, you can have Grafana up and running on your Windows 10 machine using Docker without involving Datadog. This setup allows you to visualize data from various sources and create custom dashboards as per your needs.

# Using docker compose

To set up Grafana using Docker Compose on a Windows 10 machine, you can create a `docker-compose.yml` file. This file will define the services and configurations needed to run Grafana in a container. Here are the steps to achieve this:

1. **Install Docker Desktop**:
   - Why haven't you already?

2. **Create a Directory for Docker Compose**:
   - Create a directory on your Windows 10 machine where you will store your Docker Compose file. For example, create a directory `C:\grafana`.

3. **Create and Configure docker-compose.yml**:
   - Inside the `C:\grafana` directory, create a file named `docker-compose.yml`.
   - Open `docker-compose.yml` in a text editor and add the following content:

     ```yaml
     version: '3.8'

     services:
       grafana:
         image: grafana/grafana
         container_name: grafana
         ports:
           - "3000:3000"
         volumes:
           - grafana_data:/var/lib/grafana
           # Uncomment the following line if you have a custom configuration file
           # - ./grafana_config/grafana.ini:/etc/grafana/grafana.ini

     volumes:
       grafana_data:
         driver: local
     ```

   - This configuration specifies:
     - `version: '3.8'`: The version of the Docker Compose file format.
     - `services`: A list of services to run (in this case, only Grafana).
     - `grafana`: The Grafana service definition.
       - `image`: The Docker image to use.
       - `container_name`: The name of the container.
       - `ports`: Port mapping between host and container.
       - `volumes`: Volume mapping for data persistence.

4. **Create a Custom Configuration Directory (Optional)**:
   - If you want to use a custom configuration file, create a directory `C:\grafana\grafana_config` and place your custom `grafana.ini` file inside this directory.
   - Uncomment the relevant line in the `docker-compose.yml` file to mount the custom configuration.

5. **Run Docker Compose**:
   - Open a terminal (Command Prompt, PowerShell, or any preferred terminal).
   - Navigate to the directory where you created the `docker-compose.yml` file:
     ```sh
     cd C:\grafana
     ```
   - Run the following command to start the Grafana service:
     ```sh
     docker-compose up -d
     ```

6. **Access Grafana**:
   - Open your web browser and navigate to `http://localhost:3000`.
   - The default login credentials are:
     - **Username**: admin
     - **Password**: admin
   - You will be prompted to change the password after the first login.

Here is the complete `docker-compose.yml` content:

```yaml
version: '3.8'

services:
  grafana:
    image: grafana/grafana
    container_name: grafana
    ports:
      - "3000:3000"
    volumes:
      - grafana_data:/var/lib/grafana
      # Uncomment the following line if you have a custom configuration file
      # - ./grafana_config/grafana.ini:/etc/grafana/grafana.ini

volumes:
  grafana_data:
    driver: local
```

By following these steps, you will set up Grafana using Docker Compose on your Windows 10 machine, ensuring data persistence and easy service management.