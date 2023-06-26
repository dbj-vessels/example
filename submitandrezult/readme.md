# This is a [micro-monolith](https://dbj.org/micro-monolith/)&trade; container

It constains public web api and one decoupled module running redis. 

It has a node js front end app, using the redis inside the same container running as the linux redis server.

 Redis is running on localhost:6379, completely encapsulated, fast and safe.

(for details see: "Run multiple services in a container": https://docs.docker.com/config/containers/multi-service_container/)

[Setting up Redis to run as a daemon under systemd](https://gist.github.com/mkocikowski/aeca878d58d313e902bb)