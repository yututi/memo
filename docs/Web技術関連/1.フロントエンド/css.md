

# CSS

## スタイルの優先度

高
1. 要素のstyle属性に書かれたプロパティ
1. !important
1. 詳細度

低

### 詳細度

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

## CSS-Preprocessors

scss, stylusでのいろいろまとめ

### ループ

scss
```scss
# マップ
$map: (primary: blue, secondary: green);

# ループ
@each $key, $val in $map {
    .app-#{$key} {
        background-color: #{$val};
    }
}
```

stylus
```css
map = {
  primary: blue
  secondary: green
}

for key, val in map
  .app-{key}
    background-color: val
```

### メディアクエリ

```scss
# media.scss

@mixin sp() {
  @media (min-width: 768px) {
    @content;
  }
}
```
```scss
#main.scss
@import "media.scss"

body {
    display: flex;
    @include sp() {
        flex-direction: column;
    }
}
```

stylus
```css
# media.styl

sp(){
  @media screen and (max-width: 768px) {
    {block}
  }
}
```
```css
# main.styl
@import "media.styl"

body {
    display: flex
    +sp(){
        flex-direction: column
    }
}
```
