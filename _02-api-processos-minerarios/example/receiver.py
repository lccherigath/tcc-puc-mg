#!/usr/bin/env python
from random import randrange
import time
import pika

connection = pika.BlockingConnection(
    pika.ConnectionParameters(host='localhost')
)
channel = connection.channel()

channel.queue_declare(queue='hello')


def callback(channel, method_frame, header_frame, body):
    print(" [x] Received %r" % body)
    time.sleep(randrange(0, 5))
    print(" [x] Done")
    channel.basic_ack(delivery_tag=method_frame.delivery_tag)


channel.basic_qos(prefetch_count=1)
# channel.basic_consume('hello', callback, auto_ack=True)
channel.basic_consume('hello', callback)

print(' [*] Waiting for messages. To exit press CTRL+C')
try:
    channel.start_consuming()
except KeyboardInterrupt:
    channel.stop_consuming()
connection.close()
