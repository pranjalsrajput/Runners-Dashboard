from flask import Flask
from flask_table import Table, Col

app = Flask(__name__)


class Item_Table(Table):
    name = Col("Name")
    description = Col("Description")


class Items(object):
    def __init__(self, name, description):
        self.name = name
        self.description = description


@app.route('/')
@app.route('/home')
def sayHello():
    items = [Items("Pranjal", "Boy"), Items("Shivangi", "Girl")]
    table = Item_Table(items)
    print(table.__html__())
    return table.__html__()


@app.route('/about')
def about():
    return 'About me'


if __name__ == '__main__':
    app.run(debug=True)

    # items = [Items("Pranjal", "Boy"), Items("Shivangi", "Girl")]
    # table = Item_Table(items)
    # print(table.__html__())
