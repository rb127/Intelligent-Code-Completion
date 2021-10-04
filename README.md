# Intelligent-Code-Completion
CSC302 Fall 2021 Javascript project on Intelligent Code Completion.

## Setup Instructions

### Prerequisites
Instructions for Mac, Windows, Linux
- [Docker](https://docs.docker.com/get-docker/)
- [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

### Installation and Usage
1\. Clone this [repository](https://github.com/rb127/Intelligent-Code-Completion/tree/a1-docker-test)

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

#### (Optional) Running tests.
Without coverage
```
docker run a1-302-container npm run test
```

With coverage
```
docker run a1-302-container npm run coverage
```


## Preliminary project development plan

### High-Level overview

A JavaScript code completion library that can provide relevant ‘autocomplete’ suggestions in alphabetical order such as keywords, variables, methods etc using contextual awareness - Adding scope based recognition with more immediate scope suggestions showing up first.

### Milestone 1

Parse a target program to return a JSON array of all variable and method names.

**Individual responsibilities:**

### Milestone 2

Perform string matching based on the cursor position and accessible variables to return a list of suggestions for code completion. Add support for built-in keywords.

**Individual responsibilities:**

### Milestone 3

Add ‘intelligence’ such as awareness about when to recommend variables vs methods vs built-in keywords.

**Individual responsibilities:**

### Immediate action items:
- Shahmir:
- Rohit:
- Chinmaya:




## Tech Stack and Tool Chain:

We opted for a dockerized node.js project that uses the Acorn Loose library to parse JavaScript code. We will use Yarn for package management and Mocha for testing.

Our considered solutions are outlined below. For more insight into the decision making process, see [meeting minutes](###meeting-minutes)

### Code Parsing Library

**Proposed Solution:** *Acorn Loose*

| Pros | Cons |
| ----------- | ----------- |
| Good error tolerance and handling of incomplete code. | Will need to traverse nested structure to obtain scopes |
| Outputs detailed breakdown in nested JSON structure | Less extensive documentation |


**Considered Solutions:** 

*ANTLR 4*

| Pros | Cons |
| ----------- | ----------- |
| Fair bit of documentation online | Need to define grammar for the language ourselves. |
| Many examples online that use it as a parser  | Limited options for handling broken/incomplete code |

### Containerization

**Proposed Solution:** *Docker*

| Pros | Cons |
| ----------- | ----------- |
| Lightweight | Can be difficult to set up on Windows |
| Easy to learn, many resources online |  |

**Considered Solutions:** 

*Vagrant*

| Pros | Cons |
| ----------- | ----------- |
| Lots of plugins and community boxes available | Unnecessary to create an entire virtual machine |
| | Steeper learning curve initially
| | More prerequisites such as Virtual Box |

### Package Management

**Proposed Solution:** *Yarn*

| Pros | Cons |
| ----------- | ----------- |
| More user friendly than npm | Does not have support for Node.js 5.0 or previous versions |
| Rohit and Chinmaya have used it before |  |
|Better performance than npm with parallel installing of dependencies, makes it much faster at scale | |

**Considered Solutions:** 

*Npm*

| Pros | Cons |
| ----------- | ----------- |
| More ‘traditional’ than yarn | Slower performance than yarn |
| More documentation available | Does not work well with many dependencies
| Universally supported across node.js | |

### Testing Framework

**Proposed Solution:** *Mocha*

| Pros | Cons |
| ----------- | ----------- |
| More flexible than Jest | Need to handle additional libraries|
| Separate libraries means more options for each component (e.g. stubbing, coverage reports) |  |
|Easy-to-use DSL. Shahmir has worked with it before. | |

**Considered Solutions:** 

*Jest*

| Pros | Cons |
| ----------- | ----------- |
| Does not have dependencies such as assertion library, coverage library, etc. | Originally built for React and offers a more front-end oriented toolkit |
| Simpler to set up since it is a framework which encompasses assertions, coverage, and stubbing.| |


## Resources

### Meeting Minutes
- [Meeting 1: Wed 29th September, 2021](https://docs.google.com/document/d/1dXp0yEnjxPTp3kQefl_CnRdnL33O-jUv8pgA_KJQ2fQ/edit?usp=sharing)
- [Meeting 2: Thu 30th September, 2021](https://docs.google.com/document/d/18jUMXJImyhzzhKwzy0SrU01AEu82CpwTI77-9RHVskw/edit?usp=sharing)
