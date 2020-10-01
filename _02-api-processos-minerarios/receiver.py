#!/usr/bin/env python
import pika
import psycopg2
import os
from json import loads


def postgres_access(mining_complex_info):
    con = psycopg2.connect(host=os.getenv('DB_HOST', '172.18.0.2'), database=os.getenv('DB_NAME', 'mod2-processos-minerarios'),
                           user=os.getenv('DB_USER', 'postgres'), password=os.getenv('DB_PASSWORD', '12345678'))
    cur = con.cursor()
    sql = f"insert into complexo_minerario values ({mining_complex_info['id']}, \'{mining_complex_info['nome']}\', {mining_complex_info['situacao_operacional']})"
    cur.execute(sql)
    con.commit()
    con.close()
    print('Dados inseridos no banco.')


def callback(channel, method_frame, header_frame, body):
    body_string = body.decode('utf-8') # bytes to str
    body_dict = loads(body_string)
    print(body_dict)
    print()
    postgres_access(body_dict)
    channel.basic_ack(delivery_tag=method_frame.delivery_tag)


def main():
    rmq_host = os.getenv('RMQ_HOST', '172.17.0.2')
    rmq_user = os.getenv('RMQ_USER', 'guest')
    rmq_pass = os.getenv('RMQ_PASSWORD', 'guest')
    connection = pika.BlockingConnection(
        # pika.ConnectionParameters(host='localhost')
        # pika.URLParameters(f'amqp://{rmq_user}:{rmq_pass}@{rmq_host}:15672/%2F')
        pika.URLParameters('amqp://admin:admin@rabbit_mq:5672/%2F')
    )
    channel = connection.channel()

    channel.queue_declare(queue=os.getenv('RMQ_QUEUE', 'mining-complex-queue'), durable=True)

    channel.basic_qos(prefetch_count=1)
    # channel.basic_consume('mining-complex-queue', callback, auto_ack=True)
    channel.basic_consume(os.getenv('RMQ_QUEUE', 'mining-complex-queue'), callback)

    print(' [*] Waiting for messages. To exit press CTRL+C')
    try:
        channel.start_consuming()
    except KeyboardInterrupt:
        channel.stop_consuming()
    connection.close()

main()
