// known issues: the content on textGenManager has non common characters such as \n

class textGenManager{
    constructor(data){
        this.title = Object.values(Object.values(data)[0])[2];
        this.url = `https://en.wikipedia.org/?curid=`+Object.values(Object.values(data)[0])[0];
        this.content = Object.values(Object.values(data)[0])[3];
        this.length = this.content.length;
        this.contentArray = this.content.split('');
        this.process_content()
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

    /*
    Method to filter odd characters on contentArray <Array>
    */
    process_content(){
        this.contentArray.map(data => {
            if(data==="–")
                data = "-"
        });
    }    
 
    // Method to update user-written characters
    hide_character(){
        this.content = this.content.slice(1);
        this.contentArray.shift();
        this.show_content();
    }

}