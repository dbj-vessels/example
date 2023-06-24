import os
print('                                                                                ')
print(' ALL of the environment variables the docker-compose has brought in, for all containers')
print(' Plus all the others Python env has brought in ')
print('                                                                                ')
for k,v in os.environ.items():
 print(k,v)