1.flex(弹性布局)
当我们为父盒子设flex布局以后，子元素的float，clear和vertical-align属性将失效
总结原理：
就是通过给父盒子添加flex属性，来控制子盒子的位置和排列方式
2.常见父项属性：
2.1 flex-direction：设置主轴的方向
默认是x轴(row),从左到右123
row-reverse:从右到左321
可以设置为y轴(column)


2.2 justify-content:设置主轴上子元素的排列方式
flex-start:从左到右123xxx,flex-end从尾部开始排列xxx123
center:在主轴居中对齐(如果主轴是x轴则水平居中)
space-around:平分剩余空间
space-between:先两边贴边，再平分剩余空间


2.3 flex-wrap：设置子元素是否换行
默认不换行
flex-wrap:wrap换行

2.4 align-content：设置侧轴上的子元素的排列方式（多行），加上个flex-wrap：wrap
flex-start默认在侧轴的头部开始排列
flex-end在侧轴的尾部开始排列
center在侧轴中间显示
space-around子项在侧轴平分剩余空间
space-between子项在侧轴先分布在两头，在平分剩余空间
stretch设置子项元素高度平分父元素高度

2.5 align-items：设置侧轴上的子元素排列方式（单行）
flex-start默认值 从上到下
flex-end从下到上  
center;垂直居中
stretch拉伸
2.6 flex-flow：复合属性，相当于同事设置了flex-direction和flex-wrap
flex-flow:row wrap


3.flex布局子项常见属性
3.1.flex属性
flex属性定义子项目分配剩余空间，用flex来表示占多少份数

3.2 
align-self
控制子项自己在侧轴上的排列方式
允许单个项目有着与其他项目不一样的对齐方式
order
默认：123，给第二个子元素加上order:-1就变成了213

行内元素没有大小，块元素才有

3.box-sizing
border-box 告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。
也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，内容区的实际宽度是width减去(border + padding)的值。
大多数情况下，这使得我们更容易地设定一个元素的宽高。
div{
    box-sizing: border-box;
}





::after微元素选择器是行内元素，直接设置宽高无效，不能被看到，给它加上绝对定位，
则变成了块级元素，宽高设置有效，所以不用转换为块级元素display:block

.row{
    display: flex;
}
.row a {
    flex:1
}

.row a img {
    width: 100%;
}















