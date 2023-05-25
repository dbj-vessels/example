# Docker Networks

Docker allows you to create and manage networks that enable communication between containers, as well as between containers and the host system or other external networks.

When you create a Docker container, it is attached to a network by default. Docker provides four types of networks:

## Bridge Network
   
This is the default network created by Docker. Containers attached to the bridge network can communicate with each other using IP addresses. They can also communicate with the host system and other networks through Network Address Translation (NAT). Bridge networks are useful for applications running on a single host.

## Host Network

When a container is attached to the host network, it shares the network namespace with the host system. This means that the container uses the host's network interfaces directly, without any isolation. Containers on the host network can access network services running on the host system without any port mapping. This type of network is useful when you want to maximize network performance and have the container directly use the host's network stack.

## Overlay Network

Overlay networks enable communication between containers running on different Docker hosts. They use an overlay network driver to encapsulate and route network traffic between hosts. This allows you to create distributed applications across multiple Docker hosts, forming a swarm cluster. Overlay networks are commonly used in scenarios where containers need to communicate across multiple hosts, such as in a microservices architecture.

## User-defined network

Provide more control and flexibility over container networking. You can create a user-defined network with custom settings, such as assigning a specific IP range or defining a network driver. User-defined networks are useful when you want to isolate containers or group them based on specific requirements.




&copy; by Dusan Jovanovic MSc Arch, TOGAF(R)  CC BY SA 3.0

---

Before printing please consider a lot of various things, although
 just the preservation of the environment might be enough.



