# SQL

## パフォーマンスチューニング

or / in 条件はインデックスが効かない
```sql
// OR条件
select * from items
where buyer_id = X or seller_id = X;

// IN条件
select * from items where supplyer_id in (X, Y);
```

unionでインデックスが効かせたほうが実行速度が速い
```sql
select * from items where buyer_id = X
union all
select * from items where seller_id = X;

select * from items where supplyer_id = X
union all
select * from items where supplyer_id = Y;
```

