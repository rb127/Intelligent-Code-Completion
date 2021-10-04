# Intelligent-Code-Completion
CSC302 Fall 2021 Javascript project on Intelligent Code Completion.
Team Javaslipt

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

#### (Optional) Running tests
Without coverage
```
docker run a1-302-container npm run test
```

With coverage
```
docker run a1-302-container npm run coverage
```
### (Optional) Scripts
There are two bash scripts in the scripts folder:
- `build.sh`: To build the docker container in a single step
- `test.sh`: To run the docker container, run test suite, and run code coverage in a single step
  
## Preliminary project development plan

### High-Level overview

A JavaScript code completion library that can provide relevant ‘autocomplete’ suggestions in alphabetical order such as keywords, variables, methods etc using contextual awareness - Adding scope based recognition with more immediate scope suggestions showing up first.

### Milestone 1

Parse a target program to return a data structure of all variable and method names, classes etc.

**Individual responsibilities:**

- Rohit: Efficient Traversal of the tree
- Chinmaya: Find Data structure for tree and store items
- Shahmir: Figure out user input and testing

### Milestone 2

Perform string matching based on the cursor position given (the character number in the editor) and accessible variables to return a list of suggestions for code completion. Add support for built-in keywords.
We will modularize and encapsulate the built-in keywords so this can be extended to support other languages easily.
   
**Individual responsibilities:**

- Rohit: Support for built in keywords, add test cases 
- Chinmaya: String matching, modularize keywords 
- Shahmir: Find node in tree based on cursor position, add tests

### Milestone 3

 Implement contextual autocorrect suggestions (instead of sorting alphabetically, sort by most immediate to farthest scope) 

Stretch Goal: Add ‘intelligence’ such as awareness about when to recommend variables vs methods vs built-in keywords. (Potential data type matching etc)
 

**Individual responsibilities:**

- Rohit: traversal of tree to add scope to data structure efficiently 
- Chinmaya: Pair program with Rohit
- Shahmir:  Add test cases and add preliminary support for stretch goal


### Immediate action items for Milestone 1:
* Shahmir: 
  1. Finding the best way for user to provide program, cursor position 
  2. Integrations testing 

* Rohit:
   1. Find an efficient way of traversing the ES tree returned by the parser and extracting items
  2. Write unit tests for parser and traversal
* Chinmaya:
  1. Figure out data structure used to store the variables, methods, etc taken from the parsed tree which can be extended to store scope as well
  2. Write unit tests for the data structure


## Proposed Workflow
We will be using branches for any feature we each work on and will be creating pull requests which need to be approved by at least one other team member. 
This will ensure that everyone understands the code and feature, and that it is thoroughly tested and reviewed before merging into our main branch. 

We will be using google meet, docs, zoom and discord to communicate and plan to have at least 2-3 meetings a week.


## Tech Stack and Tool Chain:

We opted for a dockerized node.js project that uses the Acorn Loose library to parse JavaScript code. We will use Yarn for package management and Mocha for testing.

Our considered solutions are outlined below. For more insight into the decision making process, see [meeting minutes](###meeting-minutes)

### Code Parsing Library

**Proposed Solution:** *Acorn Loose*

| Pros                                                  | Cons                                                    |
| ----------------------------------------------------- | ------------------------------------------------------- |
| Good error tolerance and handling of incomplete code. | Will need to traverse nested structure to obtain scopes |
| Outputs detailed breakdown in nested JSON structure   | Less extensive documentation                            |


**Considered Solutions:** 

*ANTLR 4*

| Pros                                         | Cons                                                |
| -------------------------------------------- | --------------------------------------------------- |
| Fair bit of documentation online             | Need to define grammar for the language ourselves.  |
| Many examples online that use it as a parser | Limited options for handling broken/incomplete code |

*Esprima*
| Pros                                        | Cons                                                        |
| ------------------------------------------- | ----------------------------------------------------------- |
| Outputs in a nested JSON structure (ESTree) | Not very error tolerant, only handled limited syntax errors |

### Containerization

**Proposed Solution:** *Docker*

| Pros                                 | Cons                                  |
| ------------------------------------ | ------------------------------------- |
| Lightweight                          | Can be difficult to set up on Windows |
| Easy to learn, many resources online |                                       |

**Considered Solutions:** 

*Vagrant*

| Pros                                          | Cons                                            |
| --------------------------------------------- | ----------------------------------------------- |
| Lots of plugins and community boxes available | Unnecessary to create an entire virtual machine |
|                                               | Steeper learning curve initially                |
|                                               | More prerequisites such as Virtual Box          |

### Package Management

**Proposed Solution:** *Yarn*

| Pros                                                                                                | Cons                                                       |
| --------------------------------------------------------------------------------------------------- | ---------------------------------------------------------- |
| More user friendly than npm                                                                         | Does not have support for Node.js 5.0 or previous versions |
| Rohit and Chinmaya have used it before                                                              |                                                            |
| Better performance than npm with parallel installing of dependencies, makes it much faster at scale |                                                            |

**Considered Solutions:** 

*Npm*

| Pros                                 | Cons                                      |
| ------------------------------------ | ----------------------------------------- |
| More ‘traditional’ than yarn         | Slower performance than yarn              |
| More documentation available         | Does not work well with many dependencies |
| Universally supported across node.js |                                           |

### Testing Framework

**Proposed Solution:** *Mocha*

| Pros                                                                                       | Cons                                |
| ------------------------------------------------------------------------------------------ | ----------------------------------- |
| More flexible than Jest                                                                    | Need to handle additional libraries |
| Separate libraries means more options for each component (e.g. stubbing, coverage reports) |                                     |
| Easy-to-use DSL. Shahmir has worked with it before.                                        |                                     |

**Considered Solutions:** 

*Jest*

| Pros                                                                                            | Cons                                                                    |
| ----------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------- |
| Does not have dependencies such as assertion library, coverage library, etc.                    | Originally built for React and offers a more front-end oriented toolkit |
| Simpler to set up since it is a framework which encompasses assertions, coverage, and stubbing. |                                                                         |


## Resources

### Meeting Minutes
- [Meeting 1: Wed 29th September, 2021](https://docs.google.com/document/d/1dXp0yEnjxPTp3kQefl_CnRdnL33O-jUv8pgA_KJQ2fQ/edit?usp=sharing)
- [Meeting 2: Thu 30th September, 2021](https://docs.google.com/document/d/18jUMXJImyhzzhKwzy0SrU01AEu82CpwTI77-9RHVskw/edit?usp=sharing)
