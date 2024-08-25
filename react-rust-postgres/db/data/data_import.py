#CREATE TABLE atacs2024_db.member_tbl (UID varchar(5),row integer, group varchar(10), name varchar(50), yomi varchar(50), email varchar(30), grade varchar(10), type varchar(10), key1 varchar(50), key2 varchar(50), key3 varchar(50), title varchar(50), opt varchar(100));
# pip install openpyxl
# pip install xlrd

import pandas as pd
from sqlalchemy import create_engine

connection_config = {
  'user': 'sekiguchi',
  'password': 'kaseki',
  'host': 'localhost',
  'port': '5432',
  'database': 'atacs2024_db'
}

if __name__ == '__main__':

  url = 'postgresql://{user}:{password}@{host}:{port}/{database}'.format(**connection_config)
  engine = create_engine(url)

  with engine.connect() as conn:
    
    df = pd.read_excel('ATACKS2024_参加者一覧.xlsx', sheet_name='ForDatabase', index_col=0)
    df.to_sql(name='member_tb', con=conn,if_exists='replace', index=False) # , if_exists='append'
