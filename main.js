var textGen = null;

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
        resultContent.innerHTML = this.content;
    }

    hide_content(){

    }
    // Known bug: the blank spaces are eliminated (or maybe it's ignored its printing?) together
    // with the first character on the text
    hide_character(){
        this.contentArray.shift();
        this.content = this.content.slice(1);
        this.show_content();
    }

}

class APIManager{

    constructor(cfg,type,q = ""){

        this.query = q.length==0 ? "" : '&srsearch=`'+q.trim();
        this.request = 'https://en.wikipedia.org/w/api.php?'+cfg+this.query;
        this.type = type;
        this.data = '';

    }

    async handle_query(event){
        event.preventDefault();

        try {

            const results = await this.search_wikipedia();
            
            this.process_json(results);

            return this.data;
        } catch (err) {
            console.error(err);

            alert('something went wrong! Be sure to type correctly');

            return null;
        }

    }

    async  search_wikipedia(){
        const res = await fetch(this.request);

        if(!res.ok){
            throw Error(res.statusText);
        }
    
        const json = await res.json();
    
        return json;
    }

    process_json(results){

        switch(this.type){
            case "search":
                let randNum = Math.floor(Math.random()* 30);

                this.data = results.query.search[randNum];

                //console.log(this.data);
            break;
            case "content":
                this.data = results.query.pages;

                //console.log(this.data);
            break;
        }
        
    }  
}



const form = document.getElementById("search-form").addEventListener("submit",async (event)=>{
    const query = document.getElementById("search-input").value; 
    const req = new APIManager('action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=30',"search",query);
    const data = await req.handle_query(event);
    
    if(data){
        const reqContent = new APIManager('action=query&prop=extracts&explaintext=&format=json&&origin=*&exintro=1&titles='+data.title,"content");
        const dataCont = await reqContent.handle_query(event);
        if(dataCont){
            textGen = new textGenManager(dataCont);
            textGen.show_content();
            console.log(dataCont);
            
        }else{
            console.error("data content not found!");
        }
    }else{
        console.error("data not found!");
    }
});

function text_writing_process(char, ctrl, shift){
    // textGen array needs to at least have 1 char!

    let character = "";
    
    // normal
    if(ctrl){
        
    }else if(shift){
        switch(char){
            case "0":
                character = "=";
                break;
            case "1":
                character = "!";
                break;
            case "2":
                character = '"';
                break;
            case "3":
                character = "·";
                break;
            case "4":
                character = "$";
                break;
            case "5":
                character = "%";
                break;
            case "6":
                character ="&";
                break;
            case "7":
                character = "/";
                break;
            case "8":
                character ="(";
                break;
            case "9":
                character = ")";
                break;
            default: 
                character = char.toUpperCase();
                break;
        }
    }else{
        character = char;
    }

    console.log(character);
    console.log(textGen.contentArray[0]);
    if(character === textGen.contentArray[0]){
        textGen.hide_character();
    }
    // ending
}

window.onkeydown = (e)=>{
    let ctrl = e.ctrlKey ? true : false;
    let shift = e.shiftKey ? true : false; 
    if(textGen.content.length >0){text_writing_process(e.key, ctrl, shift);}
}
