from flask import Flask, jsonify
import pika

app = Flask(__name__)


@app.route('/')
def hello_world():

    connection = pika.BlockingConnection(
        # pika.ConnectionParameters(host='localhost')
        pika.URLParameters('amqp://guest:guest@172.17.0.2:5672/%2F')
    )
    channel = connection.channel()

    channel.queue_declare(queue='mining-complex-queue', durable=True)

    channel.basic_publish(
        exchange='amq.direct', routing_key='mining_complex_rk', body='{"status": "Hello, World!"}'
    )
    print(" [x] Sent 'Hello World!'")
    connection.close()

    return jsonify({'status': 'Hello, World!'})
