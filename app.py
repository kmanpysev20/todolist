from flask import Flask, render_template, request, jsonify

from bson.objectid import ObjectId

from pymongo import MongoClient
client = MongoClient("mongodb+srv://kmanpysev20:test@cluster0.cknzfkt.mongodb.net/?retryWrites=true&w=majority")
db = client.pirates_lv2

app = Flask(__name__)

@app.route('/')
def home():
    return render_template("index.html")

@app.route("/list" , methods=["GET"])
def list_todo():
    contents = list(db.todos.find({}))
    for content in contents:
        content['_id'] = str(content['_id'])
    return jsonify({"result": contents})

@app.route('/post', methods=["POST"])
def post_todo():
    content_receive = request.form["content_give"]
    doc = {
        'content':content_receive
    }
    db.todos.insert_one(doc)
    return jsonify({"msg": "등록 완료!"})

@app.route('/modify', methods=["POST"])
def modify_todo():
    id_receive = request.form["id_give"]
    id_receive = ObjectId(id_receive)

    content_receive = request.form["content_give"]
    db.todos.update_one({'_id':id_receive},{'$set':{'content':content_receive}})
    return jsonify({"msg": "수정 완료!"})

@app.route('/delete', methods=["POST"])
def delete_todo():
    id_receive = request.form["id_give"]
    id_receive = ObjectId(id_receive)
    db.todos.delete_one({'_id':id_receive})
    return jsonify({"msg": "삭제 완료!"})

@app.route('/check', methods=["POST"])
def check_todo():
    id_receive = request.form["id_give"]
    id_receive = ObjectId(id_receive)

    check_receive = request.form["check_give"]
    db.todos.update_one({'_id':id_receive},{'$set':{'check':check_receive}})
    return jsonify()

if __name__ == "__main__":
    app.run(debug=True, port=5001)