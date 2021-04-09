// It needs to filter non-UTF8 characters (Japanese's, Korean's, Hindi's, Russian's, etc)

class textGenManager{

    constructor(data, button, textArea, anchor){
        this.title = Object.values(Object.values(data)[0])[2];
        this.url = `https://en.wikipedia.org/?curid=`+Object.values(Object.values(data)[0])[0];
        this.content = Object.values(Object.values(data)[0])[3];
	this.process_content();
        this.contentArray = this.content.split('');
        this.buttonDOM = button;
        this.textAreaDOM = textArea;
        this.anchor = anchor;
	this.show_content();
    }

    show_content(){
        //console.info(this.contentArray);
        //console.info(this.content);
        this.buttonDOM.disabled = true;
        this.textAreaDOM.readOnly = true;
        this.anchor.innerHTML = this.title;
	this.anchor.href = this.url;
        this.textAreaDOM.value = this.content;
    }

    //Method to filter odd characters on contentArray <Array> and content <string>
    process_content(){
        this.content.replace(/[^a-zA-Z0-9]/g,"");
    }    
 
    // Method for user-written characters
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
