# Cluster

Node.js Cluster is a built-in module that allows you to create a cluster of Node.js processes to take advantage of multiple CPU cores on a machine. By creating a cluster, you can distribute the workload across multiple workers and improve the performance and scalability of your Node.js application.

The master process will fork worker processes equal to the number of CPU cores on your machine. Each worker process runs the same application logic, and you can distribute the workload among them.

By leveraging the Node.js Cluster module, you can scale your application to handle more concurrent requests and improve its overall performance by utilizing the full potential of your machine's CPU cores.