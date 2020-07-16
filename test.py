from flask import Flask
from flask_table import Table, Col
from flask import Markup

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
    items = [Items(Markup('<img src="DurationStats.png">'), "Boy"), Items("DurationStats.png", "Girl")]
    table = Item_Table(items)
    print(table.__html__())
    return table.__html__()


@app.route('/about')
def about():
    return 'About me'


def convertExcelToJson(filename, sheetname):
    import pandas
    import json

    excel_data_df = pandas.read_excel(filename, sheet_name=sheetname)

    json_str = excel_data_df.to_json(orient='records')

    print('Excel Sheet to JSON:\n', json_str)
    # json.dump(json_str, "outputJson")


if __name__ == '__main__':
    # app.run(debug=True)

    # items = [Items("Pranjal", "Boy"), Items("Shivangi", "Girl")]
    # table = Item_Table(items)
    # print(table.__html__())
    convertExcelToJson(
        '/home/pranjal/Documents/PythonProjects/Large-Video-Dataset-Annotation-Strategies/Marathon_Eindhoven_velo_method.xlsx',
        'Full marathon sheet')
