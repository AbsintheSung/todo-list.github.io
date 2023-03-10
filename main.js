
    /*------------資料------------*/
    const textList = [

    ];
    function saveData(textValue){
        let obj = {}
        obj.isDone=false
        obj.text = textValue
        textList.push(obj)
    }

    function setLocalhost(data){
        let setLocalString = JSON.stringify(textList)
        localStorage.setItem('dataList',setLocalString)
    }

    function getLocation(){
        let getLocalString = localStorage.getItem('dataList');
        getDataArr = JSON.parse(getLocalString); 
        if(getDataArr===null){
            return
        }else{
            for(let i=0;i<getDataArr.length;i++){
                textList.push(getDataArr[i])
            }
        }
    }
    function delLocation(data){
        localStorage.clear()
        setLocalhost(data)
    }
    function deleteData(delNum,data){
        textList.splice(delNum,1)
    }

/*------------顯示------------*/
    const elTextList = [];
    let input_text = document.querySelector('.input_text')
    let save = document.querySelector('.save')
    let list = document.querySelector('.list')
    function reactView(){
        elTextList.forEach(function(item){
            console.log(item)
            item.remove();
        })
        textList.forEach(function(){
            elTextList.shift()
        })          
    }
    function createElementBtn_del(index){
        let btn = document.createElement('div')
        btn.classList.add('btn-del')
        btn.setAttribute('data-del',index)
        btn.textContent = 'X'
        return btn
    }
    function createElementBtn_don(index){
        let btn = document.createElement('div')
        btn.classList.add('btn-done')
        btn.setAttribute('data-done',index)
        btn.textContent = 'V'
        return btn
    }
    function createElementDivText(str){
        let text =document.createElement('div')
        text.classList.add('text')
        text.textContent=str
        return text
    }
    function createElementMainDiv(){
        let div =document.createElement('div')
        div.classList.add('textArea')
        elTextList.push(div)
        return list.appendChild(div)
    }
    function MainDiv(str,index){
        let V_btn =createElementBtn_don(index)
        let text = createElementDivText(str)
        let X_btn =  createElementBtn_del(index)
        createElementMainDiv().append(V_btn,text,X_btn)
    }

/*------------控制------------*/
        getLocation()
        reactView()
        checkMain()
        
    function checkLine(Num){
        if(textList[Num].isDone===false){
            textList[Num].isDone=true
        }else{
            textList[Num].isDone=false
        }
            
        if( textList[Num].isDone===true){
            elTextList[Num].classList.add('done')
        }
        if(textList[Num].isDone===false){
            elTextList[Num].classList.remove('done')
        }
    }
    function checkMain(){
        textList.forEach(function(item,index){
            MainDiv(item.text,index)
            if( textList[index].isDone===true){
                elTextList[index].classList.add('done')
            }
            if(textList[index].isDone===false){
                elTextList[index].classList.remove('done')
            }
        })
    }
    save.addEventListener('click',function(){
        saveData(input_text.value)
        setLocalhost(textList)
        reactView()
        checkMain()
        input_text.value=''
    })

    list.addEventListener('click',function(e){
        //點擊X
        if(e.target.getAttribute('class')==='btn-del'){
            let delNum = e.target.getAttribute('data-del')
            elTextList.forEach(function(item){
                item.remove();
            })
            deleteData(delNum)
            elTextList.splice(delNum,1)
            reactView()
            checkMain()
            delLocation(textList)
        }
        //點擊V
        if(e.target.getAttribute('class')==='btn-done'){
            let doneNum = e.target.getAttribute('data-done')
            checkLine(doneNum) 
            delLocation(textList)
        }
    })
