var textGen = null;

class TextGenerator{

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
            textGen = new TextGenerator(dataCont);
            textGen.show_content();
            console.log(dataCont);
            
        }else{
            console.error("data content not found!");
        }
    }else{
        console.error("data not found!");
    }
});

function text_writing_process(letter){
    // normal

    // ending
}

window.onkeydown = (e)=>{
    var ctrl = e.ctrlKey ? true : false;
    var shift = e.shiftKey ? true : false; 
    // explore textGen contentArray
    // identify the first letter on the array
    // if it coincides with the key pressed*  then put it out of the array 
    // AND make it known in the text on the screen
    switch(e.key){
        case "a":
        case "c":
        case "d":
        case "e":
        case "f":
        case "g":
        case "h":
        case "i":
        case "j":
        case "k":
        case "l":
        case "m":
        case "n":
        case "ñ":
        case "o":
        case "p":
        case "q":
        case "r":
        case "s":
        case "t":
        case "u":
        case "v":
        case "w":
        case "x":
        case "y":
        case "z":
        
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":

        case " ":

    }

}
