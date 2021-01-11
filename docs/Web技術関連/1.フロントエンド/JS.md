# JavaScript

### Chunked Responseの受け取り方
レスポンスヘッダにTransfer-Encoding: chunkedがあるレスポンスの受け取り方の例
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

### 覚えておきたいAPI

1. requestIdleCallback  
    `window.requestIdleCallback((deadline)=>void):number`  
    アイドル状態になったら実行してくれるやつ。`deadline.timeRemainning`で次のPaintまであと何ミリ秒かわかる。  
    cancelIdleCallbackでキャンセル。

2. IntersectionObserver
    ```js
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            // #parentOfHoge内に入っている割合. 0より大きければ画面内
            console.log(entiry.intersectionRatio)
        })
    }, {root: document.getELementById("parentOfHoge")}) // rootのデフォルト値はviewPort
    obs.observe(document.getElementById("hoge"))
    ```

