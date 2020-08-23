# JavaScript

### Chunked Responseの受け取り方
レスポンスヘッダにTransfer-Encoding: chunkedがあるレスポンスの受け取り方
```js
fetch("hoge/chunked").then(res => {
    const reader = response.body.getReader();
    const decorder = new TextDecoder();
    function readData() {
        return reader.read().then({value, done} => {
            const newData = decoder.decode(value, {stream: !done});
            if(done) return;
            return readData();
        })
    }
    return readData();
});
```
