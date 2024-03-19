<!-- # This is a [micro-monolith](https://dbj.org/micro-monolith/)&trade; container -->
# This is a localhost modules container

> 1. localhost modules container is **not** a multi-services container
> 2. localhost container implements one microservice, by using localhost modules internally
> 3. localhost mdules greatly improve resilience, and deployability and enhance resilience to change

This one contains public web API and one decoupled module, implemented as a Linux service. Thus, there are two processes.

It has a node js front-end app, using Redis inside the same container running as the Linux service. Linux service is a background process.

 Running on localhost:6379, completely encapsulated, fast and safe.

(For Ubuntu aficionados: https://en.ubuntu.perlzemi.com/blog/20200225174004.html)

PS: 2023Q4 all containers by default are Linux containers. 0.01% are not :)

PPS: [DAPR](https://dapr.io/) i a complex multiservice container. It exhibits multiple API's for multiple services.
