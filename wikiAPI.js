class TextGenerator{

    constructor(data){

        this.title = Object.values(Object.values(data)[0])[2];
        this.url = `https://en.wikipedia.org/?curid=`+Object.values(Object.values(data)[0])[0];
        this.content = Object.values(Object.values(data)[0])[3];
        this.length = this.content.length;
        this.contentArray = this.content.split('');
        this.tempS = this.title+" "+this.url+" "+this.content+" "+this.length+" "+this.contentArray;
    }
    show_content(){
        const resultContent = document.getElementById("text-rw");
        //resultContent.insertAdjacentHTML('beforeend',data);
        //resultContent.innerHTML = this.tempS;
        resultContent.innerHTML = this.content;
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
            const textGen = new TextGenerator(dataCont);
            textGen.show_content();
            console.log(dataCont);
            
        }else{
            console.error("data content not found!");
        }
    }else{
        console.error("data not found!")
    }
});

window.onkeypress = ()=>{
    // it always called whenever the user types something
    // to DO: detect key, detect special case keys (shift+1, shift+`, etc..)
    console.log("Key pressed");
}
