#CREATE TABLE atacs2024_db.member_tbl (UID varchar(5),row integer, group varchar(10), name varchar(50), yomi varchar(50), email varchar(30), grade varchar(10), type varchar(10), key1 varchar(50), key2 varchar(50), key3 varchar(50), title varchar(50), opt varchar(100));
# pip install openpyxl
# pip install xlrd

import sys
import openpyxl as excel
import psycopg2 as pg

# シートのDB対応

excel_db_map = {
    'ForDatabase': {
        'min_row': 2,
        'table_name': 'member_tb',
        'column': {
            'tag': {'type':'text','index':1},#varchar(5),
            'row': {'type':'int','index':2},#integer, 
            'lab': {'type':'text','index':3},#varchar(10), 
            'name': {'type':'text','index':4},#varchar(50), 
            'yomi': {'type':'text','index':5},#varchar(50), 
            'email': {'type':'text','index':6},#varchar(30), 
            'grade': {'type':'text','index':7},#varchar(10), 
            'category': {'type':'text','index':8},#varchar(10), 
            'key1': {'type':'text','index':9},#varchar(50), 
            'key2': {'type':'text','index':10},#varchar(50), 
            'key3': {'type':'text','index':11},#varchar(50), 
            'title': {'type':'text','index':12},#varchar(50), 
            'opt': {'type':'text','index':13},#varchar(100))
            'slot': {'type':'text','index':14},#varchar(50), 
        }
    }
}

# DB接続情報
HOST = 'localhost'
PORT = '5432'
DB_NAME = 'atacs2024_db'
USER = 'sekiguchi'
PASSWORD = 'kaseki'


def db_init(db_map, db, sheet_name):
    param = []
    table_name = 'member_tb' #db_map[sheet_name]['table_name']

    for k, v in db_map[sheet_name]['column'].items():
        param.append(f"{k} {v['type']}")

    params = ','.join(param)

    db.execute(f'DROP TABLE IF EXISTS {table_name}')
    db.execute(f'CREATE TABLE {table_name}({params})')


def db_insert(book, db_map):

    conn = pg.connect(f'host={HOST} port={PORT} dbname={DB_NAME} user={USER} password={PASSWORD}')
    cur = conn.cursor()
    sheet_name = 'ForDatabase'
#    for sheet_name in db_map:
    db_init(db_map, cur, sheet_name)
    sheet = book[sheet_name]
    col_name = []
    val = []
    min_row = db_map[sheet_name]['min_row']
    table_name = db_map[sheet_name]['table_name']

    for k, v in db_map[sheet_name]['column'].items():
        col_name.append(k)
        val.append(v['index'])

    print(val)
    col_names = ','.join(col_name)

    for r in sheet.iter_rows(min_row=min_row):
        values = []
        place_holder = []

        if r[0].value is None:
            break

        for v in val:
            #print(r[0].value,r[1].value,r[2].value)
            cell_val = r[v-1].value
            place_holder.append('%s')

            if type(cell_val) is not str and type(cell_val) is not int:
                values.append(str(cell_val))
            else:
                values.append(cell_val)

        ph = ','.join(place_holder)
        sql = f'INSERT INTO {table_name} ({col_names}) VALUES({ph})'
        cur.execute(sql, tuple(values))

    conn.commit()
    cur.close()
    conn.close()


fp = sys.argv[1]
# print(fp,sys.argv[1])
# fp = "ATACKS2024_参加者一覧.xlsx"
wb = excel.load_workbook(fp, data_only=True)
# conn = pg.connect(f'host={HOST} port={PORT} dbname={DB_NAME} user={USER} password={PASSWORD}')
# cur = conn.cursor()
# db_init(db_map, cur, 'ForDatabase')

db_insert(wb, excel_db_map)