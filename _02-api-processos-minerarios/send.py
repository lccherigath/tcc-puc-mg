#!/usr/bin/env python
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost'))
channel = connection.channel()

channel.queue_declare(queue='mining-complex-queue', durable=True)

channel.basic_publish(
    exchange='amq.direct', routing_key='mining_complex_rk', body='Hello World!'
)
print(" [x] Sent 'Hello World!'")
connection.close()
