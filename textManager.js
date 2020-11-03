// known issues: the content on textGenManager has non common characters such as \n

class textGenManager{
    constructor(data){

        this.title = Object.values(Object.values(data)[0])[2];
        this.url = `https://en.wikipedia.org/?curid=`+Object.values(Object.values(data)[0])[0];
        this.content = Object.values(Object.values(data)[0])[3];
        this.length = this.content.length;
        this.contentArray = this.content.split('');
        //this.tempS = this.title+" "+this.url+" "+this.content+" "+this.length+" "+this.contentArray;
    }
    show_content(){
        const resultContent = document.getElementById("text-rw");
        //resultContent.insertAdjacentHTML('beforeend',data);
        //resultContent.innerHTML = this.tempS;
        console.info(this.contentArray);
        console.info(this.content);
        resultContent.innerHTML = this.content;
    }

    hide_content(){

    }
    // Known bug: the blank spaces are eliminated (or maybe it's ignored its printing?) together
    // with the first character on the text
    hide_character(){
        if(this.contentArray[1]=== " "){
            this.content = " "+this.content.slice(1);
        }else{
            this.content = this.content.slice(1);
        }
        this.contentArray.shift();
        this.show_content();
    }

}