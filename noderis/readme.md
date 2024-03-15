<!-- # This is a [micro-monolith](https://dbj.org/micro-monolith/)&trade; container -->
# This is a localhost modules container

It constains public web api and one decoupled module, implemented as Linux service. Thus, two processes.

It has a node js front end app, using the redis inside the same container running as the linux service. Linux service is a background process.

 Running on localhost:6379, completely encapsulated, fast and safe.

(for details see: "Run multiple services in a container": https://docs.docker.com/config/containers/multi-service_container/)

For Ubuntu aficionados: https://en.ubuntu.perlzemi.com/blog/20200225174004.html

ps: 2023Q4 all containers by default are Linux containers. 0.01% are not :)
