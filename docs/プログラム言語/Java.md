# Java

## 新機能

Java11もしくはそれより後のLTSバージョンでの変更点で、覚えておきたいところだけをまとめる


### var
型推論でvarが使える。  
（java11環境で試したらコンパイルエラーになったのでexperimentalフラグみたいなので有効化するのかも）

```java
var string = "hoge";
```

### リフレクションAPIの変更

リフレクションAPIに変更が入る。  
基本Classインスタンスから呼び出すのは変わらない？  
deprecatedされてるメソッドのドキュメント読めばどう変わるかは書いてある。

```java
// as is
Object.class.newInstance();

// to be
Object.class.getDeclaredConstructor().newInstance();
```

### Collection APIの新機能

#### List/Set/Mapにof  
(もう自分で作らなくていい)

```java
Set<String> set = Set.of("A", "B", "C");

// Map は ofじゃなくてofEntries
Map<String, String> map = Map.ofEntries(
    Map.entry("A", "1"),
    Map.entry("B", "2")    
);
```

#### copyOf

```java
Set<String> copiedSet = Set.copyOf(set);
```

### Stream APIの新機能

#### Predicate#not  
(もう自分でry

```java
var notEmptylist = list.stream().filter(Predicate::not(String::isEmpty)).collect(Collectors::toList);
```

