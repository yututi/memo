# JavaScript

## モジュール関連の仕様

### CommonJs

Node.js上でのJavaScriptの標準仕様。  
`var hoge = require("hoge")`

### ESM (ECMAScript Module)

ブラウザがサポートする仕様。  
`import hoge from "hoge"`

### AMD (Asynchronous Module Definition)

名前の通り、非同期でモジュールを読み込めるようにしたもの。  
ほぼ使わない。(自分で書くことはない)

### UMD (Universal Model Definition)

CommonJs, AMD, ブラウザのすべての環境で動作する仕様。  
ほぼ使わない。(自分で書くことはない)

### まとめ

- 非Web環境で動作するjsライブラリを作成する場合  
    →CommonJs
- Web環境で動作するjsライブラリを作成する場合  
    →ESM
- すべての環境で動作するjsライブラリを作成する場合  
    →CommonJsやESMで作り、バンドルツールでUMDの形式に変換。


## ES6(ECMAScript2015)で追加された機能、構文

### let, const
再代入が可能かどうかを明示できる変数宣言。

```js
let hoge = "a"; // let: 再代入可能な変数であることを明示する。
const fuga = "b"; // const: 再代入不可能な変数であることを明示する。
```

`let`いらんくね？って思うけどvarとスコープの扱いが違う。  
`var`と違い変数の巻き上げの対象にならないっぽい。

### class構文

```js
class Hoge {
    // コンストラクタ
    constructor() {
        this.field = "aaa"; // ES6時点では、クラスメンバはコンストラクタ内で定義する。
    }

    // 関数
    someFunction() {
        // do something.
    }

    // static 関数
    static someStaticFunction(){
        // do something.
    }
}

// static 変数
Hoge.staticField = "bbb"; 
```

### arrow関数

```js
// as is
document.addEventListener(function(e) {
    console.log("hoge");
});

// to be
document.addEventListener((e) => {
    console.log("hoge");
});
```

シュガーシンタックスと思いきや`this`の扱いが違う。
```js
var list = ["a"];
var thisObj = { message1: "hello" };
this.message2 = "hellooo";

// 通常の関数は、そのコールバックを呼び出す関数の使用に従う。
// ※Array.prototype.forEachは第二引数が指定された場合、それをthisにする。
list.forEach(function(element) {
    console.log(this.message1); // => hello
    console.log(this.message2); // => undefined
}, thisObj);

// アロー関数は、その関数が定義されたスコープのthisを引き継ぐ
list.forEach((element) => {
    console.log(this.message1); // => undefined
    console.log(this.message2); // => hellooo
}, thisObj)
```

### デフォルト引数

```js
function hoge(messaeg = "default"){
    console.log(messaeg)
};

hoge("hello"); // => hello
hoge(); // => default
```

### 分割代入
```js

var sample = {
    hoge: "hello",
    fuga: function(msg){
        console.log(msg)
    }
}

var { hoge, fuga } = sample;
fuga(hoge); // => hello

// 関数の引数にも使える。デフォルト引数も使える。
function logMessage({hoge = "helloooo", fuga}){
    fuga(hoge);
}

logMessage(sample); // => hello

```

### `` ` `` (back quote)での文字列結合
`` ` ``で括った文字列の中で`${}`を使うと文字列に埋め込める。

```js
var message = "ES6";

// console.log("hello " + message);と同等
console.log(`hello! ${message}`); // => hello! ES6
```

### スプレッド構文
ほぼオブジェクトマージ用

```js
var obj1 = {
    a:"1",
    b:"2"
}

var obj2 = {
    b:"x",
    c:"3"
    ...obj1
}

console.log(obj2); // => { a:"1", b:"2", c:"3" }
```

### Promise
非同期処理用の仕組み

```js
function timer(number, callback) {
  setTimeout(function() {
    callback(number * 2);
  },1000);
}

// as is
timer(100, function(number) {
  timer(number, function(number) {
    timer(number, function(number) {
      timer(number, function(number) {
        timer(number, function(number) {
          console.log(number); // => 3200
        });
      });
    });
  });
});

function promiseTimer(number) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve(number * 2);
    },1000);
  });
}

// to be
promiseTimer(100)
  .then(promiseTimer)
  .then(promiseTimer)
  .then(promiseTimer)
  .then(promiseTimer)
  .then(function (value) {
    console.log(value) // => 3200
  });
```