# ProducerConsumer
Arithmetic expressions generator/evaluator services

## Requirements

NodeJS v.4.4.1 or above, you may use the provided Vagrantfile for a simulation enviornment.

## Instalation

```bash
npm install
```

## Unit Tests

```bash
npm test
```

## Usage

### Evaluator

**Usage: node src/evaluator.js [Port Number or Unix Socket]**

```bash
node src/evaluator.js 3000
```

or

```bash
npm run evaluator
```

Which will start Evaluator service on port 3000.
It also runs a reporting service on port 8000 which enables you to monitor the Evaluator op/sec performance by opening **monitor.html** in your browser.

![Alt text](/monitor.png?raw=true "Evaluator Monitor")

```
20:10:39.895 (1091 op/sec): #2 Received expression (55--65)*(22-40*-35)=
20:10:39.896 (1091 op/sec): #2 Sending result 75600
20:10:39.897 (1091 op/sec): #1 Received expression 71/((2-11)*82)-47=
20:10:39.897 (1091 op/sec): #1 Sending result -47.09620596205962
20:10:39.898 (1091 op/sec): #1 Received expression 23+51/(3*9)=
20:10:39.899 (1091 op/sec): #1 Sending result 2.740740740740741
20:10:39.899 (1091 op/sec): #2 Received expression (35+(-65*67))*-27=
20:10:39.900 (1091 op/sec): #2 Sending result 116640
20:10:39.901 (1091 op/sec): #1 Received expression (-49+(73+(-80+28)-57))+13=
20:10:39.901 (1091 op/sec): #1 Sending result -72
20:10:39.902 (1091 op/sec): #2 Received expression 94-98=
20:10:39.902 (1091 op/sec): #2 Sending result -4
20:10:39.903 (1091 op/sec): #1 Received expression 88-(-56--75)=
20:10:39.903 (1091 op/sec): #1 Sending result 69
20:10:39.904 (1091 op/sec): #2 Received expression 75*36=
20:10:39.904 (1091 op/sec): #2 Sending result 2700
```

### Generator

**Usage: node src/generator.js [Port Number or Unix Socket] [Delay in Seconds]**

```bash
node src/generator.js 3000 1
```

or

```bash
npm run generator-slow
```

Connects to port 3000 and generates arithmetic expressions at a rate of one per second.

```bash
node src/generator.js 3000 0
```

or

```bash
npm run generator-fast
```

Connects to port 3000 and generates arithmetic expressions at the fastest possible rate.

```
20:10:39.897 (503 op/sec): Sending expression 71/((2-11)*82)-47=
20:10:39.898 (503 op/sec): Received result -47.09620596205962
20:10:39.898 (503 op/sec): Sending expression 23+51/(3*9)=
20:10:39.899 (503 op/sec): Received result 2.740740740740741
20:10:39.901 (503 op/sec): Sending expression (-49+(73+(-80+28)-57))+13=
20:10:39.902 (503 op/sec): Received result -72
20:10:39.903 (503 op/sec): Sending expression 88-(-56--75)=
20:10:39.904 (503 op/sec): Received result 69
```
