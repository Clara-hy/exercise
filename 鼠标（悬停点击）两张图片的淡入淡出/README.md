全部代码来源于：https://www.zhangxinxu.com/wordpress/2010/11/css3-transitions-transforms-animation-introduction/ 

我在学习时会根据自己的情况对代码增加一些注解，存到这里是为了方便日后回顾和修改  
图片1为猪，图片2为我可以，图片3为公仔  
线上效果：https://clara-hy.github.io/exercise/%E9%BC%A0%E6%A0%87%EF%BC%88%E6%82%AC%E5%81%9C%E7%82%B9%E5%87%BB%EF%BC%89%E4%B8%A4%E5%BC%A0%E5%9B%BE%E7%89%87%E7%9A%84%E6%B7%A1%E5%85%A5%E6%B7%A1%E5%87%BA/css3-transition-demo-1.html  
css3-transition-demo-1.html为鼠标点击后两张图片进行淡入淡出  
css3-transition-demo-2.html为鼠标悬停时两张图片进行淡入淡出（仅有opacity）  
css3-transition-demo-3.html为鼠标悬停时两张图片进行淡入淡出（opacity+scale）  
css3-transition-demo-4.html为鼠标悬停时两张图片进行淡入淡出（opacity+scale+rotate）  
css3-transition-demo-5.html用transition+js实现选项卡切换  
css3-transition-demo-6.html用transition+js实现手风琴
对**demo-6**进行解析：用F12进行观察：  
一刷新，有下面两个图分别是1.详细的alls数组
[![alls数组](https://s2.ax1x.com/2019/12/02/QnCfl8.png)](https://imgse.com/i/QnCfl8)
2.arrEle以及原型方法click
[![arrEle以及原型方法click](https://s2.ax1x.com/2019/12/02/QnCWSf.png)](https://imgse.com/i/QnCWSf)  
由上面两幅图可看出一旦运行程序，先执行的是`$$(".acco_title")`  
当点击“纯粹两段文字”时，第1张图会重复一遍，而arrEle会变成：
![QnFFsO.png](https://s2.ax1x.com/2019/12/02/QnFFsO.png)
从图片可看出，点击之后执行click方法，该方法有三处调用了函数$$。

**有问题：**  
1. 为什么this.length会在代码运行的时候打印出来，而之后的点击事件中就没有调用了？  
2. jquery的$('.className')得到的对象是不是也像arrEle数组输出的那样，是将整一个div的节点保存起来？（我觉得是，如果只保存div这三个字母，之后用js修改css属性是修改不了的吧
