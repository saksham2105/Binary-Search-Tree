var canvas = document.getElementById("tree-view");
var context = canvas.getContext("2d");
var leastNode=null;
var currentXCoordinate;
var currentYCoordinate;
var animationStatus;
var flag=false;
var searchAnimationStatus;
var nodeToDelete=null;
var deleteAnimationStatus;
var traversalSpeed=700;
var ongoingProcess;
var fromx,fromy;
var tox,toy;
var rubikCubeAnimationStatus;
var borderAnimationStatus;
var xDirectionFactor=1;
var currentNode;
var rootNode=null;
var hasToggleProperty=false;
var rad=30;
var nodes=[];
var searchingOrderNodes=[];
var lines=[];
class Line
{
constructor()
{
this.fromxcord=0;
this.fromycord=0;
this.toxcord=0;
this.toycord=0;    
}
setFrom(fromxcord,fromycord)
{
this.fromxcord=fromxcord;
this.fromycord=fromycord;    
}
setTo(toxcord,toycord)
{
this.toxcord=toxcord;
this.toycord=toycord;   
}
}
class Node
{
constructor()
{
this.xCoordinateOfCenter=0;
this.yCoordinateOfCenter=0;
this.data=0;
this.tox=0;
this.toy=0;
this.radius=0;
this.rightChild=null;
this.leftChild=null;
this.parentNode=null;
}
setXCoordinate(xc)
{
this.xCoordinateOfCenter=xc;
}
getXCoordinate()
{
return this.xCoordinateOfCenter;
}
setYCoordinate(yc)
{
this.yCoordinateOfCenter=yc;
}
getYCoordinate()
{
return this.yCoordinateOfCenter;
}
setData(data)
{
this.data=data;
}
getData()
{
return this.data;
}
}

//insertion animation and main code starts...
function stopSearchAnimation()
{
clearInterval(searchAnimationStatus);   
}
var count=0;
function startSearchAnimation()
{
    if(count==searchingOrderNodes.length)
    {
    stopSearchAnimation();
    count=0;
    }
var ctx=document.getElementById("tree-view").getContext("2d");
var k=0;
var nn=new Node();
for(var n of searchingOrderNodes)
{
if(k==count)
{
nn.setXCoordinate(n.getXCoordinate());
nn.setYCoordinate(n.getYCoordinate());
nn.radius=n.radius;
nn.setData(n.getData());
nn.rightChild=n.rightChild;
nn.leftChild=n.leftChild;
break;
}
k++;
}
ctx.beginPath();
ctx.arc(nn.getXCoordinate(),nn.getYCoordinate(),nn.radius,0,2*Math.PI);
ctx.fillStyle="purple";
ctx.fill();
ctx.lineWidth=7;
context.strokeStyle="red";
ctx.stroke();
ctx.beginPath();
ctx.fillStyle="white";
ctx.font="18px Arial";
ctx.fillText(nn.getData().toString(),nn.getXCoordinate()-8-nn.getData().length*2,nn.getYCoordinate()+1+nn.getData().length*2);
ctx.fill();
ctx.stroke();
alert(nn.getData());
for(var n of searchingOrderNodes)
{
 if(n.getData()!=nn.getData())
 {
    ctx.beginPath();
    ctx.arc(nn.getXCoordinate(),nn.getYCoordinate(),nn.radius,0,2*Math.PI);
    ctx.fillStyle="purple";
    ctx.fill();
    context.strokeStyle="purple";
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.font="18px Arial";
    ctx.fillText(nn.getData().toString(),nn.getXCoordinate()-8-nn.getData().length*2,nn.getYCoordinate()+1+nn.getData().length*2);
    ctx.fill();
    ctx.stroke();
    
 }   
}
count++;
}

function search()
{
searchAnimationStatus=setInterval(startSearchAnimation,1000);
}

function drawAll(drawingCount)
{
    var ctx=document.getElementById("tree-view").getContext("2d");
    for(n of nodes)
    {
        if(n.getData()!=currentNode.getData())
        {
        ctx.beginPath();
        ctx.arc(n.getXCoordinate(),n.getYCoordinate(),n.radius,0,2*Math.PI);
        ctx.fillStyle="purple";
        ctx.fill();
        context.strokeStyle="purple";
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle="white";
        ctx.font="18px Arial";
        ctx.fillText(n.getData().toString(),n.getXCoordinate()-8-n.getData().length*2,n.getYCoordinate()+1+n.getData().length*2);
        ctx.fill();
        ctx.stroke();
    
    }
    }
    for(l of lines)
    {
     if(l.fromxcord==fromx && l.fromycord==fromy && l.toxcord==tox && l.toycord==toy)
     {
     continue;  
     }
     else
     {
     drawArrowHead(l.fromxcord,l.fromycord,l.toxcord,l.toycord);
     }
    }
    if(drawingCount==1)
    {
        search();
    }

}
var numberOfTimes=0;

function startBorderAnimation()
{
  if(numberOfTimes==0)
  {
      document.getElementById("rubik").innerHTML="";
      document.getElementById("rubik").innerHTML="<img src='rubik.gif'>";
  }
    if(numberOfTimes==3){
        stopBorderAnimation();
        numberOfTimes=0;
        animationStatus=setInterval(startAnimation,10);
        return;
    } 
    context.beginPath();
    context.arc(currentXCoordinate, currentYCoordinate,currentNode.radius, 0, 2 * Math.PI);
    context.lineWidth=7;
    context.strokeStyle="red";
    context.stroke();
    context.fillStyle="purple";
    context.fill(); 
    context.beginPath();
    context.fillStyle="white";
    context.font="18px Arial";
    context.fillText(currentNode.getData().toString(),currentXCoordinate-8-currentNode.getData().length*2,currentYCoordinate+1+currentNode.getData().length*2);
    context.fill();
    numberOfTimes+=1;

}
function stopBorderAnimation()
{
clearInterval(borderAnimationStatus);
}
function drawArrowHead(fromx, fromy, tox, toy) 
{
    var c = document.getElementById("tree-view");
    var ctx = c.getContext("2d");
    var headlen = 4;

    var angle = Math.atan2(toy-fromy,tox-fromx);

    //starting path of the arrow from the start square to the end square and drawing the stroke
    ctx.beginPath();
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.strokeStyle = "green";
    ctx.lineWidth = 3;
    ctx.stroke();

    //starting a new path from the head of the arrow to one of the sides of the point
    ctx.beginPath();
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    //path from the side point of the arrow, to the other side point
    ctx.lineTo(tox-headlen*Math.cos(angle+Math.PI/7),toy-headlen*Math.sin(angle+Math.PI/7));

    //path from the side point back to the tip of the arrow, and then again to the opposite side point
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox-headlen*Math.cos(angle-Math.PI/7),toy-headlen*Math.sin(angle-Math.PI/7));

    //draws the paths created above
    ctx.strokeStyle = "green";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.fillStyle = "green";
    ctx.fill();
}
function stopAnimation(){
    document.getElementById("rubik").innerHTML="";
    clearInterval(animationStatus);
}
function Insert()
{
    ongoingProcess="insertion";
    var rslt=document.getElementById("result").getContext("2d");
    rslt.clearRect(0,0,canvas.width,canvas.height);
    var btnId=document.getElementById("insert-btn");
        btnId.removeAttribute("data-toggle","modal");
        btnId.removeAttribute("data-target","#myModal");
        hasToggleProperty=false;
               
    var rr=30
    var data=document.getElementById("input-text").value;
    if(data=="" || data.length==0 || data.length>10 || !isNaN(data)==false){
        document.getElementById("modalId").innerText="Please feed appropriate integer number in textfield";
        btnId.setAttribute("data-toggle","modal");
        btnId.setAttribute("data-target","#myModal");
        hasToggleProperty=true;
        return;
    }
    let exists=false;
    for(n of nodes){
        if(n.getData().trim()==data.trim()) exists=true;
    }
    if(exists){
        document.getElementById("modalId").innerText="Number Exists Please try with some different number";
        btnId.setAttribute("data-toggle","modal");
        btnId.setAttribute("data-target","#myModal");
        hasToggleProperty=true;
        return;
    }
    if(data.length<5){
        rad=data.length*3+rr;
 
    }
    else{
        rad=data.length*6+rr;
    }
    node=new Node();
    node.data=data;
    node.leftChild=null;
    node.rightChild=null;
    if(rootNode==null)
    {
        currentXCoordinate=650-rad-30;
        currentYCoordinate=150+rad+30;
        node.setXCoordinate(650);
        node.setYCoordinate(150);
        node.radius=rad;
        nodes.push(node);
        currentNode=node;
        rootNode=node;
        rootNode.parentNode=null;
        borderAnimationStatus=setInterval(startBorderAnimation,300);
    }
    else{
        var localData=parseInt(data);
        let nodeToAdd=new Node();
        nodeToAdd.data=data;
        nodeToAdd.leftChild=null;
        nodeToAdd.rightChild=null;
        nodeToAdd.radius=rad;
        let isLeftChild=false;
        let isRightChild=false;
        let parentNode;
        let tempNode=rootNode;
        while(tempNode!=null)
        {
        if(localData>tempNode.getData())
        {
            parentNode=tempNode;
            searchingOrderNodes.push(parentNode);
            tempNode=tempNode.rightChild;
            isRightChild=true;
            isLeftChild=false;
        }
        else
        {
            parentNode=tempNode;
            searchingOrderNodes.push(parentNode);
            tempNode=tempNode.leftChild;
            isRightChild=false;
            isLeftChild=true;
        }
        }
        if(isLeftChild){
            nodeToAdd.setXCoordinate(parentNode.getXCoordinate()-parentNode.radius-20-nodeToAdd.radius);
            nodeToAdd.setYCoordinate(parentNode.getYCoordinate()+parentNode.radius+20+nodeToAdd.radius);
            currentXCoordinate=nodeToAdd.getXCoordinate()-rad-20;
            currentYCoordinate=nodeToAdd.getYCoordinate()+nodeToAdd.radius+20;
            xDirectionFactor=1;
            parentNode.leftChild=nodeToAdd;
            fromx=parentNode.getXCoordinate()+parentNode.radius*-1*Math.cos(Math.PI/4);
            fromy=parentNode.getYCoordinate()+parentNode.radius*Math.sin(Math.PI/4);
            tox=nodeToAdd.getXCoordinate()+nodeToAdd.radius*Math.cos(Math.PI/4);
            toy=nodeToAdd.getYCoordinate()+nodeToAdd.radius*-1*Math.sin(Math.PI/4);
            nodeToAdd.tox=tox;
            nodeToAdd.toy=toy;
           var l=new Line();
            l.setFrom(fromx,fromy);
            l.setTo(tox,toy);
            lines.push(l);
            parentNode.leftChild=nodeToAdd;
            nodeToAdd.parentNode=parentNode;
            currentNode=nodeToAdd;
        }
        if(isRightChild){
            nodeToAdd.setXCoordinate(parentNode.getXCoordinate()+parentNode.radius+20+nodeToAdd.radius);
            nodeToAdd.setYCoordinate(parentNode.getYCoordinate()+parentNode.radius+20+nodeToAdd.radius);
            currentXCoordinate=nodeToAdd.getXCoordinate()+rad+20;
            currentYCoordinate=nodeToAdd.getYCoordinate()+nodeToAdd.radius+20;
            xDirectionFactor=-1;
            parentNode.rightChild=nodeToAdd;
            fromx=parentNode.getXCoordinate()+parentNode.radius*Math.cos(Math.PI/4);
            fromy=parentNode.getYCoordinate()+parentNode.radius*Math.sin(Math.PI/4);
            tox=nodeToAdd.getXCoordinate()+nodeToAdd.radius*-1*Math.cos(Math.PI/4);
            toy=nodeToAdd.getYCoordinate()+nodeToAdd.radius*-1*Math.sin(Math.PI/4);
            nodeToAdd.tox=tox;
            nodeToAdd.toy=toy;
           var l=new Line();
            l.setFrom(fromx,fromy);
            l.setTo(tox,toy);
            lines.push(l);
            parentNode.rightChild=nodeToAdd;
            nodeToAdd.parentNode=parentNode;
            currentNode=nodeToAdd;
        }
        nodes.push(nodeToAdd);
        drawArrowHead(fromx,fromy,tox,toy);
        borderAnimationStatus=setInterval(startBorderAnimation,300);
        //animationStatus=setInterval(startAnimation,10);

    }
}
var dCount=1;
function startAnimation(){
    if(nodes.length==1)
    {
    context.clearRect(0,0,canvas.width,canvas.height);
    context.beginPath();
    if(currentXCoordinate==currentNode.getXCoordinate() && currentYCoordinate==currentNode.getYCoordinate()) stopAnimation();
    context.arc(currentXCoordinate, currentYCoordinate,currentNode.radius, 0, 2 * Math.PI);
    context.lineWidth=3;
    context.fillStyle="purple";
    context.fill(); 
    context.beginPath();
    context.fillStyle="white";
    context.font="18px Arial";
    context.fillText(currentNode.getData().toString(),currentXCoordinate-8-currentNode.getData().length*2,currentYCoordinate+1+currentNode.getData().length*2);
    context.fill();
    currentXCoordinate=currentXCoordinate+xDirectionFactor;
    currentYCoordinate=currentYCoordinate-1;
    }
    else
    {
        context.clearRect(0,0,canvas.width,canvas.height);
        drawArrowHead(fromx,fromy,tox,toy);
        //console.log("DCount  : "+dCount);
         drawAll(0);
        if(currentXCoordinate==currentNode.getXCoordinate() && currentYCoordinate==currentNode.getYCoordinate())
        {
            dCount=1;
            stopAnimation();
        } 
        context.beginPath();
        context.arc(currentXCoordinate, currentYCoordinate,currentNode.radius, 0, 2 * Math.PI);
        context.lineWidth=3;
        context.fillStyle="purple";
        context.fill(); 
        context.beginPath();
        context.fillStyle="white";
        context.font="18px Arial";
        context.fillText(currentNode.getData().toString(),currentXCoordinate-8-currentNode.getData().length*2,currentYCoordinate+1+currentNode.getData().length*2);
        context.fill();
        currentXCoordinate=currentXCoordinate+xDirectionFactor;
        currentYCoordinate=currentYCoordinate-1;
        dCount+=1;
       
    }
}
//insertion ends.
//search code starts..
function searchNode()
{    
    var rr=document.getElementById("result");
    var rslt=document.getElementById("result").getContext("2d");
    rslt.clearRect(0,0,rr.width,rr.height);
var ctx=document.getElementById("tree-view").getContext("2d");
var data=document.getElementById("input-text").value;
var btnId=document.getElementById("search-btn");
if(hasToggleProperty){
    btnId.removeAttribute("data-toggle","modal");
    btnId.removeAttribute("data-target","#myModal");
    hasToggleProperty=false;
           
}
var data=document.getElementById("input-text").value;
if(data=="" || data.length==0 || data.length>10 || !isNaN(data)==false){
    document.getElementById("modalId").innerText="Please feed appropriate integer number in textfield";
    btnId.setAttribute("data-toggle","modal");
    btnId.setAttribute("data-target","#myModal");
    hasToggleProperty=true;
    return;
}
var node=null;
let exists=false;
for(n of nodes){
    if(n.getData().trim()==data.trim()) {
        exists=true;
        node=n;
    }
}
if(exists && node!=null)
{ 
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var n of nodes)
    {
    if(node.getData()==n.getData())
    {
    ctx.beginPath();
    ctx.arc(node.getXCoordinate(),node.getYCoordinate(),node.radius,0,2*Math.PI);
    ctx.fillStyle="purple";
    ctx.fill();
    ctx.lineWidth=5;
    context.strokeStyle="red";
    ctx.stroke();
    ctx.beginPath();
    ctx.fillStyle="white";
    ctx.font="18px Arial";
    ctx.fillText(node.getData().toString(),node.getXCoordinate()-8-node.getData().length*2,node.getYCoordinate()+1+node.getData().length*2);
    ctx.fill();
    ctx.stroke();
    }
    else
    {
        ctx.beginPath();
        ctx.arc(n.getXCoordinate(),n.getYCoordinate(),n.radius,0,2*Math.PI);
        ctx.fillStyle="purple";
        ctx.fill();
        context.strokeStyle="purple";
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle="white";
        ctx.font="18px Arial";
        ctx.fillText(n.getData().toString(),n.getXCoordinate()-8-n.getData().length*2,n.getYCoordinate()+1+n.getData().length*2);
        ctx.fill();
        ctx.stroke();
    

    }
    }
    for(var l of lines)
    {
      drawArrowHead(l.fromxcord,l.fromycord,l.toxcord,l.toycord);
    }
   
    
}
if(!exists)
{
    document.getElementById("modalId").innerText="Number : "+data+" not found";
    btnId.setAttribute("data-toggle","modal");
    btnId.setAttribute("data-target","#myModal");
    hasToggleProperty=true;
    return;
}
}
//search node ends..

//clear node starts
function clearNodes()
{
    var rr=document.getElementById("result");
    var rslt=document.getElementById("result").getContext("2d");
    rslt.clearRect(0,0,rr.width,rr.height);
numberOfTimes=0;
nodeToDelete=null;
deleteAnimationStatus=0;
rootNode.leftChild=null;
rootNode.rightChild=null;
PreorderStack=[];
rad=30;
PostorderStack=[];
InorderStack=[];
animationStatus=null;
borderAnimationStatus=null;
searchingOrderNodes=[];
searchAnimationStatus=null;
inorderCount=0;
preorderCount=0;
postorderCount=0;
inorderAnimationStatus=null;
preorderAnimationStatus=null;
postorderAnimationStatus=null;
dCount=0;
count=0;
rootNode=null;
currentNode=null;
currentXCoordinate=0;
currentYCoordinate=0;
nodes=[];
lines=[];
context.clearRect(0,0,canvas.width,canvas.height);
}
//clear node ends..

//inorder code starts...
var InorderStack=[];
var inorderAnimationStatus;
function stopInorderAnimation()
{
    document.getElementById("rubik").innerHTML="";
clearInterval(inorderAnimationStatus);
}
var inorderCount=0;
function startInorderAnimation()
{
    document.getElementById("rubik").innerHTML="<img src='rubik.gif'>";
    var ctx=document.getElementById("tree-view").getContext("2d");
    if(inorderCount==InorderStack.length)
    {
        inorderCount=0;
        for(var node of InorderStack)
        {  
            ctx.beginPath();
            ctx.arc(node.getXCoordinate(),node.getYCoordinate(),node.radius,0,2*Math.PI);
            ctx.fillStyle="purple";
            ctx.fill();
            context.strokeStyle="purple";
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle="white";
            ctx.font="18px Arial";
            ctx.fillText(node.getData().toString(),node.getXCoordinate()-8-node.getData().length*2,node.getYCoordinate()+1+node.getData().length*2);
            ctx.fill();
            ctx.stroke();
        
    
        }
        var result=document.getElementById("result");
        let xcord=0;
        var ct=result.getContext("2d");
        var maxHeight=InorderStack[0].radius*2;
        for(var n of InorderStack)
        {
        if(2*n.radius>maxHeight) maxHeight=2*n.radius;
        }
        result.height=maxHeight+10;
        ct.clearRect(0,0,result.width,result.height);
        for(var n of InorderStack)
        {
        ct.beginPath();
        ct.arc(xcord+n.radius+2,n.radius+5,n.radius,0,2*Math.PI);
        ct.fillStyle="blue";
        ct.fill();
        ct.strokeStyle="blue";
        ct.stroke();
        ct.beginPath();
        ct.fillStyle="white";
        ct.font="18px Arial";
        ct.fillText(n.getData().toString(),xcord+n.radius-8-n.getData().length*2,n.radius+1+n.getData().length*2+5);
        ct.fill();
        ct.stroke();
       xcord=xcord+2*n.radius;
        }
          stopInorderAnimation();
        return;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var line of lines)
    {
        drawArrowHead(line.fromxcord,line.fromycord,line.toxcord,line.toycord);
    }
    for(var node of InorderStack)
    {
    if(node.getData()==InorderStack[inorderCount].getData())
    {
        ctx.beginPath();
        ctx.arc(node.getXCoordinate(),node.getYCoordinate(),node.radius,0,2*Math.PI);
        ctx.fillStyle="purple";
        ctx.fill();
        ctx.lineWidth=5;
        context.strokeStyle="red";
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle="white";
        ctx.font="18px Arial";
        ctx.fillText(node.getData().toString(),node.getXCoordinate()-8-node.getData().length*2,node.getYCoordinate()+1+node.getData().length*2);
        ctx.fill();
        ctx.stroke();
    
    }
    else{
        ctx.beginPath();
        ctx.arc(node.getXCoordinate(),node.getYCoordinate(),node.radius,0,2*Math.PI);
        ctx.fillStyle="purple";
        ctx.fill();
        context.strokeStyle="purple";
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle="white";
        ctx.font="18px Arial";
        ctx.fillText(node.getData().toString(),node.getXCoordinate()-8-node.getData().length*2,node.getYCoordinate()+1+node.getData().length*2);
        ctx.fill();
        ctx.stroke();
    

    }

    }
    inorderCount+=1;

}
function inorder(node)
{
if(node==null){
    return;
} 
inorder(node.leftChild);
InorderStack.push(node);
inorder(node.rightChild);
}
function inorderTraversal()
{
    var rr=document.getElementById("result");
    var rslt=document.getElementById("result").getContext("2d");
    rslt.clearRect(0,0,rr.width,rr.height);
    InorderStack=[];
    var btnId=document.getElementById("inorderBtn");
    btnId.removeAttribute("data-toggle","modal");
    btnId.removeAttribute("data-target","#myModal");
    hasToggleProperty=false;
   
if(nodes.length==0)
{
    document.getElementById("modalId").innerText="Please insert atleast one node in Binary Search Tree";
    btnId.setAttribute("data-toggle","modal");
    btnId.setAttribute("data-target","#myModal");
    hasToggleProperty=true;
    return;
}
inorder(rootNode);
inorderAnimationStatus=setInterval(startInorderAnimation,traversalSpeed);
}
//inorderorder code ends..


//preorder code starts..
var PreorderStack=[];
var preorderAnimationStatus;
function stopPreorderAnimation()
{
document.getElementById("rubik").innerHTML="";
clearInterval(preorderAnimationStatus);
}
var preorderCount=0;
function startPreorderAnimation()
{
    document.getElementById("rubik").innerHTML="<img src='rubik.gif'>";
    var ctx=document.getElementById("tree-view").getContext("2d");
    if(preorderCount==PreorderStack.length)
    {
        preorderCount=0;
        for(var node of PreorderStack)
        {  
            ctx.beginPath();
            ctx.arc(node.getXCoordinate(),node.getYCoordinate(),node.radius,0,2*Math.PI);
            ctx.fillStyle="purple";
            ctx.fill();
            context.strokeStyle="purple";
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle="white";
            ctx.font="18px Arial";
            ctx.fillText(node.getData().toString(),node.getXCoordinate()-8-node.getData().length*2,node.getYCoordinate()+1+node.getData().length*2);
            ctx.fill();
            ctx.stroke();
        
    
        }
        var result=document.getElementById("result");
        let xcord=0;
        var ct=result.getContext("2d");
        var maxHeight=PreorderStack[0].radius*2;
        for(var n of PreorderStack)
        {
        if(2*n.radius>maxHeight) maxHeight=2*n.radius;
        }
        result.height=maxHeight+10;
        ct.clearRect(0,0,result.width,result.height);
        for(var n of PreorderStack)
        {
        ct.beginPath();
        ct.arc(xcord+n.radius+2,n.radius+5,n.radius,0,2*Math.PI);
        ct.fillStyle="blue";
        ct.fill();
        ct.strokeStyle="blue";
        ct.stroke();
        ct.beginPath();
        ct.fillStyle="white";
        ct.font="18px Arial";
        ct.fillText(n.getData().toString(),xcord+n.radius-8-n.getData().length*2,n.radius+1+n.getData().length*2+5);
        ct.fill();
        ct.stroke();
       xcord=xcord+2*n.radius;
        }
        stopPreorderAnimation();
        return;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var line of lines)
    {
        drawArrowHead(line.fromxcord,line.fromycord,line.toxcord,line.toycord);
    }
    for(var node of PreorderStack)
    {
    if(node.getData()==PreorderStack[preorderCount].getData())
    {
        ctx.beginPath();
        ctx.arc(node.getXCoordinate(),node.getYCoordinate(),node.radius,0,2*Math.PI);
        ctx.fillStyle="purple";
        ctx.fill();
        ctx.lineWidth=5;
        context.strokeStyle="red";
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle="white";
        ctx.font="18px Arial";
        ctx.fillText(node.getData().toString(),node.getXCoordinate()-8-node.getData().length*2,node.getYCoordinate()+1+node.getData().length*2);
        ctx.fill();
        ctx.stroke();
    
    }
    else{
        ctx.beginPath();
        ctx.arc(node.getXCoordinate(),node.getYCoordinate(),node.radius,0,2*Math.PI);
        ctx.fillStyle="purple";
        ctx.fill();
        context.strokeStyle="purple";
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle="white";
        ctx.font="18px Arial";
        ctx.fillText(node.getData().toString(),node.getXCoordinate()-8-node.getData().length*2,node.getYCoordinate()+1+node.getData().length*2);
        ctx.fill();
        ctx.stroke();
    

    }

    }
    preorderCount+=1;




}
function preorder(node)
{
    if(node==null){
        return;
    } 
    PreorderStack.push(node);
    preorder(node.leftChild);
    preorder(node.rightChild);
    
}
function preorderTraversal()
{
PreorderStack=[];
var rr=document.getElementById("result");
var rslt=document.getElementById("result").getContext("2d");
rslt.clearRect(0,0,rr.width,rr.height);
var btnId=document.getElementById("preorderBtn");
btnId.removeAttribute("data-toggle","modal");
btnId.removeAttribute("data-target","#myModal");
hasToggleProperty=false;

if(nodes.length==0)
{
document.getElementById("modalId").innerText="Please insert atleast one node in Binary Search Tree";
btnId.setAttribute("data-toggle","modal");
btnId.setAttribute("data-target","#myModal");
hasToggleProperty=true;
return;
}
preorder(rootNode);
preorderAnimationStatus=setInterval(startPreorderAnimation,traversalSpeed);
}
//preorder ends..

//postOrder Code starts....
var PostorderStack=[];
var postorderAnimationStatus;
function stopPostorderAnimation()
{
document.getElementById("rubik").innerHTML="";
clearInterval(postorderAnimationStatus);
}
var postorderCount=0;
function startPostorderAnimation()
{
    document.getElementById("rubik").innerHTML="<img src='rubik.gif'>";
    var ctx=document.getElementById("tree-view").getContext("2d");
    if(postorderCount==PostorderStack.length)
    {
      postorderCount=0;
        for(var node of PostorderStack)
        {  
            ctx.beginPath();
            ctx.arc(node.getXCoordinate(),node.getYCoordinate(),node.radius,0,2*Math.PI);
            ctx.fillStyle="purple";
            ctx.fill();
            context.strokeStyle="purple";
            ctx.stroke();
            ctx.beginPath();
            ctx.fillStyle="white";
            ctx.font="18px Arial";
            ctx.fillText(node.getData().toString(),node.getXCoordinate()-8-node.getData().length*2,node.getYCoordinate()+1+node.getData().length*2);
            ctx.fill();
            ctx.stroke();
        
    
        }
        var result=document.getElementById("result");
        let xcord=0;
        var ct=result.getContext("2d");
        var maxHeight=PostorderStack[0].radius*2;
        for(var n of PostorderStack)
        {
        if(2*n.radius>maxHeight) maxHeight=2*n.radius;
        }
        result.height=maxHeight+10;
        ct.clearRect(0,0,result.width,result.height);
        for(var n of PostorderStack)
        {
        ct.beginPath();
        ct.arc(xcord+n.radius+2,n.radius+5,n.radius,0,2*Math.PI);
        ct.fillStyle="blue";
        ct.fill();
        ct.strokeStyle="blue";
        ct.stroke();
        ct.beginPath();
        ct.fillStyle="white";
        ct.font="18px Arial";
        ct.fillText(n.getData().toString(),xcord+n.radius-8-n.getData().length*2,n.radius+1+n.getData().length*2+5);
        ct.fill();
        ct.stroke();
       xcord=xcord+2*n.radius;
        }
        stopPostorderAnimation();
        return;
    }
    ctx.clearRect(0,0,canvas.width,canvas.height);
    for(var line of lines)
    {
        drawArrowHead(line.fromxcord,line.fromycord,line.toxcord,line.toycord);
    }
    for(var node of PostorderStack)
    {
    if(node.getData()==PostorderStack[postorderCount].getData())
    {
        ctx.beginPath();
        ctx.arc(node.getXCoordinate(),node.getYCoordinate(),node.radius,0,2*Math.PI);
        ctx.fillStyle="purple";
        ctx.fill();
        ctx.lineWidth=5;
        context.strokeStyle="red";
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle="white";
        ctx.font="18px Arial";
        ctx.fillText(node.getData().toString(),node.getXCoordinate()-8-node.getData().length*2,node.getYCoordinate()+1+node.getData().length*2);
        ctx.fill();
        ctx.stroke();
    
    }
    else{
        ctx.beginPath();
        ctx.arc(node.getXCoordinate(),node.getYCoordinate(),node.radius,0,2*Math.PI);
        ctx.fillStyle="purple";
        ctx.fill();
        context.strokeStyle="purple";
        ctx.stroke();
        ctx.beginPath();
        ctx.fillStyle="white";
        ctx.font="18px Arial";
        ctx.fillText(node.getData().toString(),node.getXCoordinate()-8-node.getData().length*2,node.getYCoordinate()+1+node.getData().length*2);
        ctx.fill();
        ctx.stroke();
    

    }

    }
    postorderCount+=1;
}
function postorder(node)
{
    if(node==null){
        return;
    } 
    postorder(node.leftChild);
    postorder(node.rightChild);
    PostorderStack.push(node);
}
function postorderTraversal()
{
    var rr=document.getElementById("result");
    var rslt=document.getElementById("result").getContext("2d");
    rslt.clearRect(0,0,rr.width,rr.height);
PostorderStack=[];
var btnId=document.getElementById("postorderBtn");
btnId.removeAttribute("data-toggle","modal");
btnId.removeAttribute("data-target","#myModal");
hasToggleProperty=false;

if(nodes.length==0)
{
document.getElementById("modalId").innerText="Please insert atleast one node in Binary Search Tree";
btnId.setAttribute("data-toggle","modal");
btnId.setAttribute("data-target","#myModal");
hasToggleProperty=true;
return;
}
postorder(rootNode);
postorderAnimationStatus=setInterval(startPostorderAnimation,traversalSpeed);
}

//postOrder End..

function changeAnimationSpeed()
{
var speed=document.getElementById("speed").value;
var valueToSet=20-parseInt(speed);
}

function draw()
{
var ctx=document.getElementById("tree-view").getContext("2d");
var i=0;
ctx.clearRect(0,0,canvas.width,canvas.height);
for(var node of nodes)
{   
ctx.beginPath();
ctx.arc(node.getXCoordinate(),node.getYCoordinate(),node.radius,0,2*Math.PI);
ctx.fillStyle="purple";
ctx.fill();
context.strokeStyle="purple";
ctx.stroke();
ctx.beginPath();
ctx.fillStyle="white";
ctx.font="18px Arial";
ctx.fillText(node.getData().toString(),node.getXCoordinate()-8-node.getData().length*2,node.getYCoordinate()+1+node.getData().length*2);
ctx.fill();
ctx.stroke();
}
for(var l of lines)
{
drawArrowHead(l.fromxcord,l.fromycord,l.toxcord,l.toycord);
}
document.getElementById("rubik").innerHTML="";
}
function stopDeleteAnimation()
{
var nodeIndex=-1;
var lineIndex=-1;
nodeIndex=nodes.indexOf(nodeToDelete);
var line=null;
for(var l of lines)
{
if((l.toxcord==nodeToDelete.tox) && (l.toycord==nodeToDelete.toy))
{
line=l;
break;
}
}
lineIndex=lines.indexOf(line);
var parent=nodeToDelete.parentNode;
if(parent==null)
{
nodes.splice(nodeIndex,1);
lines.splice(lineIndex,1);
rootNode=null;
nodeToDelete=null;
flag=false;
clearInterval(deleteAnimationStatus);
draw();
return;
}
else
{
if(parent.rightChild==nodeToDelete) parent.rightChild=null;
if(parent.leftChild==nodeToDelete) parent.leftChild=null;
nodes.splice(nodeIndex,1);
lines.splice(lineIndex,1);
nodeToDelete=null;
flag=false;
clearInterval(deleteAnimationStatus);
draw();
return;
}
}
var deleteAnimationCount=0;
function startDeleteAnimation()
{
    document.getElementById("rubik").innerHTML="<img src='rubik.gif'>";
if(deleteAnimationCount==3) {
    flag=true;
    deleteAnimationCount=0;
    stopDeleteAnimation();
    return;
}
var ctx=document.getElementById("tree-view").getContext("2d");
ctx.clearRect(0,0,canvas.width,canvas.height);
for(var node of nodes)
{   
if(nodeToDelete.getData()!=node.getData())
{
ctx.beginPath();
ctx.arc(node.getXCoordinate(),node.getYCoordinate(),node.radius,0,2*Math.PI);
ctx.fillStyle="purple";
ctx.fill();
context.strokeStyle="purple";
ctx.stroke();
ctx.beginPath();
ctx.fillStyle="white";
ctx.font="18px Arial";
ctx.fillText(node.getData().toString(),node.getXCoordinate()-8-node.getData().length*2,node.getYCoordinate()+1+node.getData().length*2);
ctx.fill();
ctx.stroke();
}
else
{
ctx.beginPath();
ctx.arc(node.getXCoordinate(),node.getYCoordinate(),node.radius,0,2*Math.PI);
ctx.fillStyle="purple";
ctx.fill();
ctx.lineWidth=5;
context.strokeStyle="red";
ctx.stroke();
ctx.beginPath();
ctx.fillStyle="white";
ctx.font="18px Arial";
ctx.fillText(node.getData().toString(),node.getXCoordinate()-8-node.getData().length*2,node.getYCoordinate()+1+node.getData().length*2);
ctx.fill();
ctx.stroke();
}
}
for(let l of lines)
{
drawArrowHead(l.fromxcord,l.fromycord,l.toxcord,l.toycord);
}
deleteAnimationCount+=1;
}
var deleteAnimationForOneChildStatus;
var deleteForOneChildCount=0;
function stopDeleteAnimationForOneChild()
{
clearInterval(deleteAnimationForOneChildStatus);
document.getElementById("rubik").innerHTML="";
var node=nodeToDelete;
var ctx=document.getElementById("tree-view").getContext("2d");
var parent=node.parentNode;
var nextChild=null;
var queue;
let isLeftChild=false;
let isRightChild=false;
var curr;
var LevelOrderStack;
//code for root Node...
if(parent==null) //rootNode
{
queue=new Array();
LevelOrderStack=new Array();
if(node.rightChild!=null) 
{
nextChild=node.rightChild;
isRightChild=true;
isLeftChild=false;
}
if(node.leftChild!=null)
{
nextChild=node.leftChild;
isRightChild=false;
isLeftChild=true;
} 
nextChild.setXCoordinate(node.getXCoordinate());
nextChild.setYCoordinate(node.getYCoordinate());
rootNode=nextChild;
rootNode.parentNode=null;
queue.push(node);
while(queue.length>=1)
{
curr=queue[0];
var popped=queue.shift();
if(curr.leftChild) queue.push(curr.leftChild);
if(curr.rightChild) queue.push(curr.rightChild);
LevelOrderStack.push(curr);
}
LevelOrderStack.splice(0,1);
for(let l of LevelOrderStack)
{
    parent=l.parentNode;
    if(parent==null) {
        continue;
    }
    if(parent.leftChild==l)
    {
    l.setXCoordinate(l.parentNode.getXCoordinate()-l.parentNode.radius-20-l.radius);
    l.setYCoordinate(l.parentNode.getYCoordinate()+l.parentNode.radius+20+l.radius);
    fromx=l.parentNode.getXCoordinate()+l.parentNode.radius*-1*Math.cos(Math.PI/4);
    fromy=l.parentNode.getYCoordinate()+l.parentNode.radius*Math.sin(Math.PI/4);
    tox=l.getXCoordinate()+l.radius*Math.cos(Math.PI/4);
    toy=l.getYCoordinate()+l.radius*-1*Math.sin(Math.PI/4);
    l.tox=tox;
    l.toy=toy;
    }
    else
    {
    l.setXCoordinate(l.parentNode.getXCoordinate()+l.parentNode.radius+20+l.radius);
    l.setYCoordinate(l.parentNode.getYCoordinate()+l.parentNode.radius+20+l.radius);
    fromx=l.parentNode.getXCoordinate()+l.parentNode.radius*Math.cos(Math.PI/4);
    fromy=l.parentNode.getYCoordinate()+l.parentNode.radius*Math.sin(Math.PI/4);
    tox=l.getXCoordinate()+l.radius*-1*Math.cos(Math.PI/4);
    toy=l.getYCoordinate()+l.radius*-1*Math.sin(Math.PI/4);
    l.tox=tox;
    l.toy=toy;
    }

}
let x=null;
for(var a of nodes)
{
if(node.getData()==a.getData()){
    x=a;
    break;
} 
}
nodes.splice(nodes.indexOf(x),1);
for(var a of nodes)
{
for(var b of LevelOrderStack)
{
if(b.getData()==a.getData()) 
{
a=b;
}
}    
}
lines=[];
for(var n of nodes)
{
parent=n.parentNode;
if(parent==null) continue;
if(parent.leftChild==n)
{
fromx=n.parentNode.getXCoordinate()+n.parentNode.radius*-1*Math.cos(Math.PI/4);
fromy=n.parentNode.getYCoordinate()+n.parentNode.radius*Math.sin(Math.PI/4);
tox=n.getXCoordinate()+n.radius*Math.cos(Math.PI/4);
toy=n.getYCoordinate()+n.radius*-1*Math.sin(Math.PI/4);
let line=new Line();
line.setFrom(fromx,fromy);
line.setTo(tox,toy);  
lines.push(line);
}
if(parent.rightChild==n)
{
fromx=n.parentNode.getXCoordinate()+n.parentNode.radius*Math.cos(Math.PI/4);
fromy=n.parentNode.getYCoordinate()+n.parentNode.radius*Math.sin(Math.PI/4);
tox=n.getXCoordinate()+n.radius*-1*Math.cos(Math.PI/4);
toy=n.getYCoordinate()+n.radius*-1*Math.sin(Math.PI/4);
let line=new Line();
line.setFrom(fromx,fromy);
line.setTo(tox,toy);  
lines.push(line);
}
}
ctx.clearRect(0,0,canvas.width,canvas.height);
for(var n of nodes)
{   
ctx.beginPath();
ctx.arc(n.getXCoordinate(),n.getYCoordinate(),n.radius,0,2*Math.PI);
ctx.fillStyle="purple";
ctx.fill();
context.strokeStyle="purple";
ctx.stroke();
ctx.beginPath();
ctx.fillStyle="white";
ctx.font="18px Arial";
ctx.fillText(n.getData().toString(),n.getXCoordinate()-8-n.getData().length*2,n.getYCoordinate()+1+n.getData().length*2);
ctx.fill();
ctx.stroke();
}
for(let l of lines)
{
drawArrowHead(l.fromxcord,l.fromycord,l.toxcord,l.toycord);
}
}
//when node isn't root

else
{
queue=new Array();
LevelOrderStack=new Array();
if(node.rightChild!=null) 
{
nextChild=node.rightChild;
isRightChild=true;
isLeftChild=false;
}
if(node.leftChild!=null)
{
nextChild=node.leftChild;
isRightChild=false;
isLeftChild=true;
} 
nextChild.setXCoordinate(node.getXCoordinate());
nextChild.setYCoordinate(node.getYCoordinate());
if(node.parentNode.rightChild==node) parent.rightChild=nextChild;
if(node.parentNode.leftChild==node) parent.leftChild=nextChild;
nextChild.parentNode=parent;
queue.push(node);
while(queue.length>=1)
{
curr=queue[0];
var popped=queue.shift();
if(curr.leftChild) queue.push(curr.leftChild);
if(curr.rightChild) queue.push(curr.rightChild);
LevelOrderStack.push(curr);
}
LevelOrderStack.splice(0,1);
LevelOrderStack.splice(0,1);
for(let l of LevelOrderStack)
{
    parent=l.parentNode;
    if(parent==null) {
        continue;
    }
    if(parent.leftChild==l)
    {
    l.setXCoordinate(l.parentNode.getXCoordinate()-l.parentNode.radius-20-l.radius);
    l.setYCoordinate(l.parentNode.getYCoordinate()+l.parentNode.radius+20+l.radius);
    fromx=l.parentNode.getXCoordinate()+l.parentNode.radius*-1*Math.cos(Math.PI/4);
    fromy=l.parentNode.getYCoordinate()+l.parentNode.radius*Math.sin(Math.PI/4);
    tox=l.getXCoordinate()+l.radius*Math.cos(Math.PI/4);
    toy=l.getYCoordinate()+l.radius*-1*Math.sin(Math.PI/4);
    l.tox=tox;
    l.toy=toy;
    }
    else
    {
    l.setXCoordinate(l.parentNode.getXCoordinate()+l.parentNode.radius+20+l.radius);
    l.setYCoordinate(l.parentNode.getYCoordinate()+l.parentNode.radius+20+l.radius);
    fromx=l.parentNode.getXCoordinate()+l.parentNode.radius*Math.cos(Math.PI/4);
    fromy=l.parentNode.getYCoordinate()+l.parentNode.radius*Math.sin(Math.PI/4);
    tox=l.getXCoordinate()+l.radius*-1*Math.cos(Math.PI/4);
    toy=l.getYCoordinate()+l.radius*-1*Math.sin(Math.PI/4);
    l.tox=tox;
    l.toy=toy;
    }

}
let x=null;
for(var a of nodes)
{
if(node.getData()==a.getData())
{
x=a;
break;
} 
}
nodes.splice(nodes.indexOf(x),1);
for(var a of nodes)
{
for(var b of LevelOrderStack)
{
if(b.getData()==a.getData()) 
{
a=b;
}
}    
}
lines=[];
for(var n of nodes)
{
parent=n.parentNode;
if(parent==null) continue;
if(parent.leftChild==n)
{
fromx=n.parentNode.getXCoordinate()+n.parentNode.radius*-1*Math.cos(Math.PI/4);
fromy=n.parentNode.getYCoordinate()+n.parentNode.radius*Math.sin(Math.PI/4);
tox=n.getXCoordinate()+n.radius*Math.cos(Math.PI/4);
toy=n.getYCoordinate()+n.radius*-1*Math.sin(Math.PI/4);
let line=new Line();
line.setFrom(fromx,fromy);
line.setTo(tox,toy);  
lines.push(line);
}
if(parent.rightChild==n)
{
fromx=n.parentNode.getXCoordinate()+n.parentNode.radius*Math.cos(Math.PI/4);
fromy=n.parentNode.getYCoordinate()+n.parentNode.radius*Math.sin(Math.PI/4);
tox=n.getXCoordinate()+n.radius*-1*Math.cos(Math.PI/4);
toy=n.getYCoordinate()+n.radius*-1*Math.sin(Math.PI/4);
let line=new Line();
line.setFrom(fromx,fromy);
line.setTo(tox,toy);  
lines.push(line);
}
}
ctx.clearRect(0,0,canvas.width,canvas.height);
for(var n of nodes)
{   
ctx.beginPath();
ctx.arc(n.getXCoordinate(),n.getYCoordinate(),n.radius,0,2*Math.PI);
ctx.fillStyle="purple";
ctx.fill();
context.strokeStyle="purple";
ctx.stroke();
ctx.beginPath();
ctx.fillStyle="white";
ctx.font="18px Arial";
ctx.fillText(n.getData().toString(),n.getXCoordinate()-8-n.getData().length*2,n.getYCoordinate()+1+n.getData().length*2);
ctx.fill();
ctx.stroke();
}
for(let l of lines)
{
drawArrowHead(l.fromxcord,l.fromycord,l.toxcord,l.toycord);
}
}
}
function startDeleteAnimationForOneChild()
{
document.getElementById("rubik").innerHTML="<img src='rubik.gif'>";
var ctx=document.getElementById("tree-view").getContext("2d");
if(deleteForOneChildCount==3)
{
stopDeleteAnimationForOneChild();
deleteForOneChildCount=0;
return;
}
ctx.clearRect(0,0,canvas.width,canvas.height);
for(var n of nodes)
{   
if(n.getData()==nodeToDelete.getData())
{
ctx.beginPath();
ctx.arc(n.getXCoordinate(),n.getYCoordinate(),n.radius,0,2*Math.PI);
ctx.fillStyle="purple";
ctx.fill();
ctx.lineWidth=5;
ctx.strokeStyle="red";
ctx.stroke();
ctx.beginPath();
ctx.fillStyle="white";
ctx.font="18px Arial";
ctx.fillText(n.getData().toString(),n.getXCoordinate()-8-n.getData().length*2,n.getYCoordinate()+1+n.getData().length*2);
ctx.fill();
ctx.stroke();
}
else
{
ctx.beginPath();
ctx.arc(n.getXCoordinate(),n.getYCoordinate(),n.radius,0,2*Math.PI);
ctx.fillStyle="purple";
ctx.fill();
ctx.strokeStyle="purple";
ctx.stroke();
ctx.beginPath();
ctx.fillStyle="white";
ctx.font="18px Arial";
ctx.fillText(n.getData().toString(),n.getXCoordinate()-8-n.getData().length*2,n.getYCoordinate()+1+n.getData().length*2);
ctx.fill();
ctx.stroke();
}
}
for(let l of lines)
{
drawArrowHead(l.fromxcord,l.fromycord,l.toxcord,l.toycord);
}
deleteForOneChildCount+=1;
}
function adjustChildrensPositions(node)
{
deleteAnimationForOneChildStatus=setInterval(startDeleteAnimationForOneChild,600);
}

var deleteAnimationForTwoChildStatus;
var deleteForTwoChildCount=0;
function stopDeleteAnimationForTwoChild()
{
clearInterval(deleteAnimationForTwoChildStatus);
var ctx=document.getElementById("tree-view").getContext("2d");
var leastNodeData=leastNode.getData();
document.getElementById("rubik").innerHTML="";
if(leastNode.leftChild==null && leastNode.rightChild==null)
{
var nodeIndex=-1;
var lineIndex=-1;
nodeIndex=nodes.indexOf(leastNode);
var line=null;
for(var l of lines)
{
if((l.toxcord==leastNode.tox) && (l.toycord==leastNode.toy))
{
line=l;
break;
}
}
lineIndex=lines.indexOf(line);
var parent=leastNode.parentNode;
if(parent==null)
{
nodes.splice(nodeIndex,1);
lines.splice(lineIndex,1);
rootNode=null;
leastNode=null;
}
else
{
if(parent.rightChild==leastNode) parent.rightChild=null;
if(parent.leftChild==leastNode) parent.leftChild=null;
nodes.splice(nodeIndex,1);
lines.splice(lineIndex,1);
leastNode=null;
}
for(var n of nodes)
{
if(n.getData()==nodeToDelete.getData())
{
n.setData(leastNodeData);
nodeToDelete.setData(leastNodeData);
}   
}
} //if ends...
else
{

    var parent=leastNode.parentNode;
    var nextChild=null;
    var queue;
    let isLeftChild=false;
    let isRightChild=false;
    var curr;
    var LevelOrderStack;
    //code for root Node...
    if(parent==null) //rootNode
    {
    queue=new Array();
    LevelOrderStack=new Array();
    if(leastNode.rightChild!=null) 
    {
    nextChild=leastNode.rightChild;
    isRightChild=true;
    isLeftChild=false;
    }
    if(leastNode.leftChild!=null)
    {
    nextChild=leastNode.leftChild;
    isRightChild=false;
    isLeftChild=true;
    } 
    nextChild.setXCoordinate(leastNode.getXCoordinate());
    nextChild.setYCoordinate(leastNode.getYCoordinate());
    rootNode=nextChild;
    rootNode.parentNode=null;
    queue.push(leastNode);
    while(queue.length>=1)
    {
    curr=queue[0];
    var popped=queue.shift();
    if(curr.leftChild) queue.push(curr.leftChild);
    if(curr.rightChild) queue.push(curr.rightChild);
    LevelOrderStack.push(curr);
    }
    LevelOrderStack.splice(0,1);
    for(let l of LevelOrderStack)
    {
        parent=l.parentNode;
        if(parent==null) {
            continue;
        }
        if(parent.leftChild==l)
        {
        l.setXCoordinate(l.parentNode.getXCoordinate()-l.parentNode.radius-20-l.radius);
        l.setYCoordinate(l.parentNode.getYCoordinate()+l.parentNode.radius+20+l.radius);
        fromx=l.parentNode.getXCoordinate()+l.parentNode.radius*-1*Math.cos(Math.PI/4);
        fromy=l.parentNode.getYCoordinate()+l.parentNode.radius*Math.sin(Math.PI/4);
        tox=l.getXCoordinate()+l.radius*Math.cos(Math.PI/4);
        toy=l.getYCoordinate()+l.radius*-1*Math.sin(Math.PI/4);
        l.tox=tox;
        l.toy=toy;
        }
        else
        {
        l.setXCoordinate(l.parentNode.getXCoordinate()+l.parentNode.radius+20+l.radius);
        l.setYCoordinate(l.parentNode.getYCoordinate()+l.parentNode.radius+20+l.radius);
        fromx=l.parentNode.getXCoordinate()+l.parentNode.radius*Math.cos(Math.PI/4);
        fromy=l.parentNode.getYCoordinate()+l.parentNode.radius*Math.sin(Math.PI/4);
        tox=l.getXCoordinate()+l.radius*-1*Math.cos(Math.PI/4);
        toy=l.getYCoordinate()+l.radius*-1*Math.sin(Math.PI/4);
        l.tox=tox;
        l.toy=toy;
        }
    
    }
    let x=null;
    for(var a of nodes)
    {
    if(leastNode.getData()==a.getData()){
        x=a;
        break;
    } 
    }
    nodes.splice(nodes.indexOf(x),1);
    for(var a of nodes)
    {
    for(var b of LevelOrderStack)
    {
    if(b.getData()==a.getData()) 
    {
    a=b;
    }
    }    
    }
    lines=[];
    for(var n of nodes)
    {
    parent=n.parentNode;
    if(parent==null) continue;
    if(parent.leftChild==n)
    {
    fromx=n.parentNode.getXCoordinate()+n.parentNode.radius*-1*Math.cos(Math.PI/4);
    fromy=n.parentNode.getYCoordinate()+n.parentNode.radius*Math.sin(Math.PI/4);
    tox=n.getXCoordinate()+n.radius*Math.cos(Math.PI/4);
    toy=n.getYCoordinate()+n.radius*-1*Math.sin(Math.PI/4);
    let line=new Line();
    line.setFrom(fromx,fromy);
    line.setTo(tox,toy);  
    lines.push(line);
    }
    if(parent.rightChild==n)
    {
    fromx=n.parentNode.getXCoordinate()+n.parentNode.radius*Math.cos(Math.PI/4);
    fromy=n.parentNode.getYCoordinate()+n.parentNode.radius*Math.sin(Math.PI/4);
    tox=n.getXCoordinate()+n.radius*-1*Math.cos(Math.PI/4);
    toy=n.getYCoordinate()+n.radius*-1*Math.sin(Math.PI/4);
    let line=new Line();
    line.setFrom(fromx,fromy);
    line.setTo(tox,toy);  
    lines.push(line);
    }
    }
    }
    //when node isn't root
    
    else
    {
    parent=leastNode.parentNode;
    queue=new Array();
    LevelOrderStack=new Array();
    if(leastNode.rightChild!=null) 
    {
    nextChild=leastNode.rightChild;
    isRightChild=true;
    isLeftChild=false;
    }
    if(leastNode.leftChild!=null)
    {
    nextChild=leastNode.leftChild;
    isRightChild=false;
    isLeftChild=true;
    } 
    nextChild.setXCoordinate(leastNode.getXCoordinate());
    nextChild.setYCoordinate(leastNode.getYCoordinate());
    if(leastNode.parentNode.rightChild==leastNode) parent.rightChild=nextChild;
    if(leastNode.parentNode.leftChild==leastNode) parent.leftChild=nextChild;
    nextChild.parentNode=parent;
    queue.push(leastNode);
    while(queue.length>=1)
    {
    curr=queue[0];
    var popped=queue.shift();
    if(curr.leftChild) queue.push(curr.leftChild);
    if(curr.rightChild) queue.push(curr.rightChild);
    LevelOrderStack.push(curr);
    }
    LevelOrderStack.splice(0,1);
    LevelOrderStack.splice(0,1);
    for(let l of LevelOrderStack)
    {
        parent=l.parentNode;
        if(parent==null) {
            continue;
        }
        if(parent.leftChild==l)
        {
        l.setXCoordinate(l.parentNode.getXCoordinate()-l.parentNode.radius-20-l.radius);
        l.setYCoordinate(l.parentNode.getYCoordinate()+l.parentNode.radius+20+l.radius);
        fromx=l.parentNode.getXCoordinate()+l.parentNode.radius*-1*Math.cos(Math.PI/4);
        fromy=l.parentNode.getYCoordinate()+l.parentNode.radius*Math.sin(Math.PI/4);
        tox=l.getXCoordinate()+l.radius*Math.cos(Math.PI/4);
        toy=l.getYCoordinate()+l.radius*-1*Math.sin(Math.PI/4);
        l.tox=tox;
        l.toy=toy;
        }
        else
        {
        l.setXCoordinate(l.parentNode.getXCoordinate()+l.parentNode.radius+20+l.radius);
        l.setYCoordinate(l.parentNode.getYCoordinate()+l.parentNode.radius+20+l.radius);
        fromx=l.parentNode.getXCoordinate()+l.parentNode.radius*Math.cos(Math.PI/4);
        fromy=l.parentNode.getYCoordinate()+l.parentNode.radius*Math.sin(Math.PI/4);
        tox=l.getXCoordinate()+l.radius*-1*Math.cos(Math.PI/4);
        toy=l.getYCoordinate()+l.radius*-1*Math.sin(Math.PI/4);
        l.tox=tox;
        l.toy=toy;
        }
    
    }
    let x=null;
    for(var a of nodes)
    {
    if(leastNode.getData()==a.getData())
    {
    x=a;
    break;
    } 
    }
    nodes.splice(nodes.indexOf(x),1);
    for(var a of nodes)
    {
    for(var b of LevelOrderStack)
    {
    if(b.getData()==a.getData()) 
    {
    a=b;
    }
    }    
    }
    lines=[];
    for(var n of nodes)
    {
    parent=n.parentNode;
    if(parent==null) continue;
    if(parent.leftChild==n)
    {
    fromx=n.parentNode.getXCoordinate()+n.parentNode.radius*-1*Math.cos(Math.PI/4);
    fromy=n.parentNode.getYCoordinate()+n.parentNode.radius*Math.sin(Math.PI/4);
    tox=n.getXCoordinate()+n.radius*Math.cos(Math.PI/4);
    toy=n.getYCoordinate()+n.radius*-1*Math.sin(Math.PI/4);
    let line=new Line();
    line.setFrom(fromx,fromy);
    line.setTo(tox,toy);  
    lines.push(line);
    }
    if(parent.rightChild==n)
    {
    fromx=n.parentNode.getXCoordinate()+n.parentNode.radius*Math.cos(Math.PI/4);
    fromy=n.parentNode.getYCoordinate()+n.parentNode.radius*Math.sin(Math.PI/4);
    tox=n.getXCoordinate()+n.radius*-1*Math.cos(Math.PI/4);
    toy=n.getYCoordinate()+n.radius*-1*Math.sin(Math.PI/4);
    let line=new Line();
    line.setFrom(fromx,fromy);
    line.setTo(tox,toy);  
    lines.push(line);
    }
    }
    }
    

    for(var n of nodes)
    {
    if(n.getData()==nodeToDelete.getData())
    {
    n.setData(leastNodeData);
    nodeToDelete.setData(leastNodeData);
    }   
    }
    

}
ctx.clearRect(0,0,canvas.width,canvas.height);
for(var n of nodes)
{
ctx.beginPath();
ctx.arc(n.getXCoordinate(),n.getYCoordinate(),n.radius,0,2*Math.PI);
ctx.fillStyle="purple";
ctx.fill();
ctx.strokeStyle="purple";
ctx.stroke();
ctx.beginPath();
ctx.fillStyle="white";
ctx.font="18px Arial";
ctx.fillText(n.getData().toString(),n.getXCoordinate()-8-n.getData().length*2,n.getYCoordinate()+1+n.getData().length*2);
ctx.fill();
ctx.stroke();    
}
for(let l of lines)
{
drawArrowHead(l.fromxcord,l.fromycord,l.toxcord,l.toycord);
}
}

function startAnimationForTwoChild()
{
var ctx=document.getElementById("tree-view").getContext("2d");
document.getElementById("rubik").innerHTML="<img src='rubik.gif'>";
if(deleteForTwoChildCount==3)
{
deleteForTwoChildCount=0;
stopDeleteAnimationForTwoChild();
return;
}
ctx.clearRect(0,0,canvas.width,canvas.height);
for(var n of nodes)
{
if(n.getData()==nodeToDelete.getData())
{
ctx.beginPath();
ctx.arc(n.getXCoordinate(),n.getYCoordinate(),n.radius,0,2*Math.PI);
ctx.fillStyle="purple";
ctx.fill();
ctx.lineWidth=5;
ctx.strokeStyle="red";
ctx.stroke();
ctx.beginPath();
ctx.fillStyle="white";
ctx.font="18px Arial";
ctx.fillText(n.getData().toString(),n.getXCoordinate()-8-n.getData().length*2,n.getYCoordinate()+1+n.getData().length*2);
ctx.fill();
ctx.stroke();
}
if(n.getData()==leastNode.getData())
{
ctx.beginPath();
ctx.arc(n.getXCoordinate(),n.getYCoordinate(),n.radius,0,2*Math.PI);
ctx.fillStyle="purple";
ctx.fill();
ctx.lineWidth=5;
ctx.strokeStyle="yellow";
ctx.stroke();
ctx.beginPath();
ctx.fillStyle="white";
ctx.font="18px Arial";
ctx.fillText(n.getData().toString(),n.getXCoordinate()-8-n.getData().length*2,n.getYCoordinate()+1+n.getData().length*2);
ctx.fill();
ctx.stroke();
}
if(n.getData()!=leastNode.getData() && n.getData()!=nodeToDelete.getData())
{
ctx.beginPath();
ctx.arc(n.getXCoordinate(),n.getYCoordinate(),n.radius,0,2*Math.PI);
ctx.fillStyle="purple";
ctx.fill();
ctx.strokeStyle="purple";
ctx.stroke();
ctx.beginPath();
ctx.fillStyle="white";
ctx.font="18px Arial";
ctx.fillText(n.getData().toString(),n.getXCoordinate()-8-n.getData().length*2,n.getYCoordinate()+1+n.getData().length*2);
ctx.fill();
ctx.stroke();
}
}
for(let l of lines)
{
drawArrowHead(l.fromxcord,l.fromycord,l.toxcord,l.toycord);
}
deleteForTwoChildCount+=1;
}

function deleteNodeHavingTwoChild()
{
leastNode=nodeToDelete.rightChild;
while(leastNode!=null)
{
if(leastNode.leftChild) leastNode=leastNode.leftChild;
else break;
}
deleteAnimationForTwoChildStatus=setInterval(startAnimationForTwoChild,1000);
}
function deleteNode()
{    
var rr=document.getElementById("result");
var rslt=document.getElementById("result").getContext("2d");
rslt.clearRect(0,0,rr.width,rr.height);
var ctx=document.getElementById("tree-view").getContext("2d");
var data=document.getElementById("input-text").value;
var btnId=document.getElementById("delete-btn");
btnId.removeAttribute("data-toggle","modal");
btnId.removeAttribute("data-target","#myModal");
hasToggleProperty=false;
var data=document.getElementById("input-text").value;
if(data=="" || data.length==0 || data.length>10 || !isNaN(data)==false)
{
document.getElementById("modalId").innerText="Please feed appropriate integer number in textfield";
btnId.setAttribute("data-toggle","modal");
btnId.setAttribute("data-target","#myModal");
hasToggleProperty=true;
return;
}
if(rootNode==null)
{
document.getElementById("modalId").innerText="Can not delete as root is null";
btnId.setAttribute("data-toggle","modal");
btnId.setAttribute("data-target","#myModal");
hasToggleProperty=true;
return;
}
let localData=parseInt(data);
let exists=false;
let i=0;
for(var n of nodes)
{
if(parseInt(n.getData())==localData) exists=true;
}
if(!exists)
{
document.getElementById("modalId").innerText="Can not delete as node with data : "+data+" doesn't exists";
btnId.setAttribute("data-toggle","modal");
btnId.setAttribute("data-target","#myModal");
hasToggleProperty=true;
return;
}
let node;
let indexOfNode=0;
for(var n of nodes)
{
if(parseInt(n.getData())==localData)
{
node=n;
break;
} 
indexOfNode++;
}
if(node.leftChild==null && node.rightChild==null)
{
nodeToDelete=node;
deleteAnimationStatus=setInterval(startDeleteAnimation,600);
return;
}
if((node.leftChild!=null && node.rightChild==null) || (node.leftChild==null && node.rightChild!=null))
{
nodeToDelete=node;
adjustChildrensPositions(nodeToDelete);
return;
}
if(node.leftChild!=null && node.rightChild!=null)
{
nodeToDelete=node;
deleteNodeHavingTwoChild();
}
}
