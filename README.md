# ProducerConsumer
Arithmetic expressions generator/evaluator services

## Requirements

NodeJS v.4.4.1 or above, you may use the provided Vagrantfile for a simulation enviornment.

## Instalation

> npm install

## Unit Tests

> npm test

## Usage

### Evaluator

> node src/evaluator.js [Port Number or Unix Socket]

or

> npm run evaluator

Which will start Evaluator service on port 3000.
It also runs a reporting service on port 8000 which enables you to monitor the Evaluator op/sec performance by opening *monitor.html* file.

### Generator

> node src/generator.js [Port Number or Unix Socket] [Delay in Seconds]

or

> npm run generator-slow

Connects to port 3000 and generates arithmetic expressions at a rate of one per second.

> npm run generator-fast

Connects to port 3000 and generates arithmetic expressions at the fastest possible rate.

