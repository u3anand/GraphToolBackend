from flask import request, url_for
from graphtt import app, mail, s, db
from flask_mail import Message
from itsdangerous import SignatureExpired
from graphtt.models import User, Graph

@app.route('/login', methods=['GET', 'POST'])
def auth():
    if request.method == 'GET':
        return {"action": "none"}
    email = request.get_json()['email']
    route = request.get_json()['route']
    token = s.dumps(email, salt='email-confirm')
    msg = Message('Email Confirmation', sender='graphtheorytool@gmail.com', recipients=[email])
    link = route + "confirm_email/" + token
    msg.body = 'Your email confirmation link is {}. Thanks and have a wonderful day!'.format(link)
    mail.send(msg)
    return {"token": token}


@app.route('/confirm_email/<token>', methods=['GET', 'POST'])
def confirm_email(token):
    if request.method == 'POST':
        try:
            mail = s.loads(token, salt='email-confirm', max_age=600)
        except SignatureExpired:
            return {'status': "Expired"}
        except:
            return {'status': "Invalid"}
        user = User.query.filter_by(email=mail)
        if user.count() == 0:
            new_user = User(email=mail)
            db.session.add(new_user)
            db.session.commit()

        return {'status': "Accepted", "email": mail}
    return {'status': "None"}


@app.route('/api/upload', methods=['GET', 'POST'])
def upload():
    if request.method == 'GET':
        return {"action": "none"}
    mail = request.get_json()['email']
    e = request.get_json()['edges']
    v = request.get_json()['vertices']
    bs = request.get_json()['bentpos']
    g = Graph.query.filter_by(em=mail).first()
    if g is not None:
        db.session.delete(g)
        db.session.commit()
    graph = Graph(edges=e, vertices=v, bentpos=bs, em=mail, user_id=1)
    db.session.add(graph)
    db.session.commit()
    return { 'upload' : 'done'}


@app.route('/api/retrieve', methods=['GET', 'POST'])
def retrieve():
    if request.method == 'GET':
        return {"action": "none"}

    m = request.get_json()['email']
    g = Graph.query.filter_by(em=m).first()
    ed = g.edges
    ve = g.vertices
    bp = g.bentpos
    if ve == "":
        return {'graph' : 'not uploaded'}
    return {'edges': ed, 'vertices': ve, 'bentpos': bp}


@app.route('/', methods=['GET', 'POST'])
def hello():
    return ""


if __name__ == '__main__':
    app.run(debug=True)