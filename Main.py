#-*- coding: utf-8 -*-

from flask import request, Flask, jsonify, render_template
import requests
import config
from decimal import Decimal
YO_API_TOKEN = config.DEVKEY

app = Flask(__name__)
userList = []

class User():
    def __init__(self, name="", lat=0, lon=0):
        self.name = name
        self.lat = lat
        self.lon = lon
    def serialize(self):
        return {
            'usr': self.name,
            'lat': self.lat,
            'lng': self.lon
        }

#  user = User(username, Decimal(latitude), Decimal(longitude))
def toUserList():
    f = open ("DATA.txt", 'r')
    for line in f:
        line.rstrip()
        split = line.split()

        userList.append(User(split[0],Decimal(split[1]),Decimal(split[2])))
    # for e in userList:
    #     print (e)
    return userList

@app.route('/_getUsers')
def getUsers():
    return jsonify(userList)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/_add_numbers')
def add_numbers():
    print (userList)
    a = request.args.get('a', 0, type=int)
    b = request.args.get('b', 0, type=int)
    return jsonify(result=[e.serialize() for e in userList])

@app.route("/yo/")
def yo():
    # extract and parse query parameters
    username = request.args.get('username')
    # get location and split it
    location = request.args.get('location')
    split = location.split(";")
    latitude = split [0]
    longitude = split[1]

    f = open ('DATA.txt', 'a')
    print (username + " " + latitude + " " + longitude, file=f)
    userList.append(User(username, Decimal(latitude), Decimal(longitude)))
    # Yo the result back to the user
    requests.post("http://api.justyo.co/yo/", data={'api_token': YO_API_TOKEN, 'username': username, 'link': 'http://432066f2.ngrok.com/'})

    return 'OK'


if __name__ == "__main__":
    app.debug = True
    toUserList()
    app.run(host="0.0.0.0", port=5000)
