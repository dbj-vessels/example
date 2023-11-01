<!-- # This is a [micro-monolith](https://dbj.org/micro-monolith/)&trade; container -->
# This is a multi-proc&trade; container

It constains public web api and one decoupled module. Thus, two processes.

It has a node js front end app, using the redis inside the same container running as the linux service.

 Running on localhost:6379, completely encapsulated, fast and safe.

(for details see: "Run multiple services in a container": https://docs.docker.com/config/containers/multi-service_container/)

ps: 2023Q4 all containers by default are Linux containers.
