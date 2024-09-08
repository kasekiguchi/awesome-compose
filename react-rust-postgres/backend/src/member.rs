use tokio_postgres::{Error, GenericClient, Row};

#[derive(Debug, serde::Serialize)]
pub struct Member {
    pub tag: String,
    pub row: i32,
    pub lab: String,
    pub name: String,
    pub yomi: String,
    pub email: String,
    pub grade: String,
    pub category: String,
    pub key1: String,
    pub key2: String,
    pub key3: String,
    pub title: String,
    pub opt: String,
    pub slot1: String,
    pub order1: String,
    pub slot2: String,
    pub order2: String,
}

impl From<Row> for Member {
    fn from(row: Row) -> Self {
        Self {
            tag: row.get(0),
            row: row.get(1),
            lab: row.get(2),
            name: row.get(3),
            yomi: row.get(4),
            email: row.get(5),
            grade: row.get(6),
            category: row.get(7),
            key1: row.get(8),
            key2: row.get(9),
            key3: row.get(10),
            title: row.get(11),
            opt: row.get(12),
            slot1: row.get(13),
            order1: row.get(14),
            slot2: row.get(15),
            order2: row.get(16),
        }
    }
}

impl Member {
    pub async fn all<C: GenericClient>(client: &C) -> Result<Vec<Member>, Error> {
        let stmt = client.prepare("SELECT * FROM member_tb").await?;
        let rows = client.query(&stmt, &[]).await?;

        Ok(rows.into_iter().map(Member::from).collect())
    }
}
