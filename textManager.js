// It needs to filter non-UTF-8 characters (Japanese's, Korean's, Hindi's, Russian's, etc)

class textGenManager{

    constructor(data, button, textArea, anchor){
        this.title = Object.values(Object.values(data)[0])[2];
        this.url = `https://en.wikipedia.org/?curid=`+Object.values(Object.values(data)[0])[0];
        this.content = Object.values(Object.values(data)[0])[3];
        this.length = this.content.length;
        this.contentArray = this.content.split('');
        this.process_content();
        this.buttonDOM = button;
        this.textAreaDOM = textArea;
        this.anchor = anchor;
        //this.tempS = this.title+" "+this.url+" "+this.content+" "+this.length+" "+this.contentArray;
    }

    show_content(){
        //resultContent.insertAdjacentHTML('beforeend',data);
        //resultContent.innerHTML = this.tempS;
        //console.info(this.contentArray);
        //console.info(this.content);
        this.buttonDOM.disabled = true;
        this.textAreaDOM.readOnly = true;
        this.anchor.innerHTML = this.title;
        this.anchor.href = this.url;
        this.textAreaDOM.value = this.content;
    }

    //Method to filter odd characters on contentArray <Array>
    process_content(){
        this.contentArray.map(data => {
            if(data==="–")
                data = "-"
        });
    }    
 
    // Method to for user-written characters
    hide_character(){
        this.content = this.content.slice(1);
        this.contentArray.shift();
        this.show_content();
    }

    end_writing(){
        this.buttonDOM.disabled = false;
        this.textAreaDOM.readOnly = false;
        this.textAreaDOM.value = "";
    }

}