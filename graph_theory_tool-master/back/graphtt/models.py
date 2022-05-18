from graphtt import db


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    graph = db.relationship('Graph', backref='graph', lazy=True)

    def __repr__(self):
        return f'{self.email}, {self.id}'


class Graph(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    em = db.Column(db.String(120))
    edges = db.Column(db.String(12000), default="")
    vertices = db.Column(db.String(12000), default="")
    bentpos = db.Column(db.String(12000), default="")
    user_id = db.Column(db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f'{self.id}, {self.vertices}, {self.edges}, {self.bentpos}, {self.em}'