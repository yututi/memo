# HTTP

## HTTPヘッダ

### Connection: Keep-Alive
HTTP通信時のTCPコネクションをクローズしない。  
再接続時のオーバーヘッドをなくせる。  
HTTP1.0ではオプションだが、HTTP1.1からはデフォルトで有効になっている。
