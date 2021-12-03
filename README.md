# Intelligent-Code-Completion
CSC302 Fall 2021 Javascript project on Intelligent Code Completion.
Team Javaslipt.
- [Link to Assignment 1 Document](https://github.com/rb127/Intelligent-Code-Completion/blob/main/A1.md)
- [Link to Assignment 2 Document](https://github.com/rb127/Intelligent-Code-Completion/blob/main/A2.md)
- [Link to Assignment 3 Document](https://github.com/rb127/Intelligent-Code-Completion/blob/a3/A3.md)
## Setup Instructions

### Prerequisites
Instructions for Mac, Windows, Linux
- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Installation and Usage
1\. Clone this [repository](https://github.com/rb127/Intelligent-Code-Completion/tree/main)

```
git clone https://github.com/rb127/Intelligent-Code-Completion.git
```


2\. Build a new docker container image (Ensure you are in the root folder)

```
docker build -t a1-302-container ./
```

3\. Run the docker container
```
docker run a1-302-container
```

#### (Optional) Running tests
Without coverage
```
docker run a1-302-container yarn run test
```

With coverage
```
docker run a1-302-container yarn run coverage
```
### (Optional) Scripts
There are two bash scripts in the scripts folder:
- `build.sh`: To build the docker container in a single step
- `test.sh`: To run the docker container, run test suite, and run code coverage in a single step


## Resources
Documentation and links to libraries, resources considered are in the meeting notes.
### Meeting Minutes
- [Meeting 1: Wed 29th September, 2021](https://docs.google.com/document/d/1dXp0yEnjxPTp3kQefl_CnRdnL33O-jUv8pgA_KJQ2fQ/edit?usp=sharing)
- [Meeting 2: Thu 30th September, 2021](https://docs.google.com/document/d/18jUMXJImyhzzhKwzy0SrU01AEu82CpwTI77-9RHVskw/edit?usp=sharing)
- [Meeting 3: Sun 3rd October, 2021](https://docs.google.com/document/d/1gaOQP0YDE9rDRyqSPSuhMl68wrXjwTOpBjZSgq5URmw/edit?usp=sharing)
- [Meeting 4: Thu 21st October, 2021](https://docs.google.com/document/d/17bgFjYa88fyUErvEHocLtkDPqDFH4f5HkfHGC3tBhgs/edit?usp=sharing)
- [Meeting 5: Sat 23rd October, 2021](https://docs.google.com/document/d/1Z6i59fDntvy03hurxvEiZjc56CSQsSXYMxTVaD4YjjE/edit?usp=sharing)
- [Meeting 6: Fri 29th October, 2021](https://docs.google.com/document/d/1HnSQW0GWYvV1vFqOx1-_qWLVqEipzCK88eVPRSkGyl8/edit?usp=sharing)

