

# CSS

## スタイルの優先度

高
1. 要素のstyle属性に書かれたプロパティ
1. !important
1. 詳細度

低

## 詳細度

詳細度 = {IDセレクタ}.{クラスセレクタ}.{要素セレクタ}

```css
# 例

# 詳細度 1.0.1
span#title { font-size: 24px; }

# 詳細度 1.1.1
span#title.hoge { font-size: 24px; }

# 詳細度 0.1.0
.title { font-size: 24px; }
```

