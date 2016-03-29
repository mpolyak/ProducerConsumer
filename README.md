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

