import os
from flask import Flask, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)
app.config['MONGO_URI'] = os.environ.get('MONGO_URI')
mongo = PyMongo(app)

# example date retrieve: event['_id'].generation_time

@app.route('/event', methods=['GET'])
def get_events():
	events_query = mongo.db.events.find()
	return events_to_json(events_query)

@app.route('/event/<user_id>', methods=['GET'])
def get_user_events(user_id):
	events_query = mongo.db.events.find({ 'auth0_uid': user_id })
	return events_to_json(events_query)


## HELPERS ##

def events_to_json(mongo_cursor):
	event_jsons = []
	for event in mongo_cursor:
		event_json = {
			'creation_date': event['_id'].generation_time,
			'place_id': event['place_id'],
			'auth0_uid': event['auth0_uid'],
			'coords': {
				'lat': event['coords']['lat'],
				'lng': event['coords']['lng']
			}
		}
		event_jsons.append(event_json)
	return jsonify(event_jsons)

