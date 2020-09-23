class TextGenerator{

    constructor(data){
        this.title = data.title;
        this.url = `https://en.wikipedia.org/?curid=${data.pageid}`;

        this.content = "";
    }
    show_content(data){
        const resultContent = document.getElementById("text-rw");
        //resultContent.insertAdjacentHTML('beforeend',data);
        resultContent.innerHTML = data;
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
            alert('something went wrong! Try again');

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
        const reqContent = new APIManager('action=query&prop=extracts&format=json&exintro=&origin=*&titles='+data.title,"content");
        const dataCont = await reqContent.handle_query(event);
        if(dataCont){
            // i have the content but how do i read it? 
        }else{
            console.error("data content not found!");
        }
    }else{
        console.error("data not found!")
    }
});
