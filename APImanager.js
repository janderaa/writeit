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
