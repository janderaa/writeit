class APImanager{

    constructor(q){
        let config = 'action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=30';

        this.query = q.length==0 ? "" : q.trim();
        this.request = 'https://en.wikipedia.org/w/api.php?'+config+'&srsearch=`'+this.query;
    }

    async handle_query(event){
        event.preventDefault();

        try {

            const results = await this.search_wikipedia();
            //console.log(results);
            this.process_json(results);

        } catch (err) {
            console.error(err);
            alert('something went wrong! Try again');
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
        let randNum = Math.floor(Math.random()* 30);

        const data = results.query.search[randNum].snippet;
        //console.log(data);

        this.show_content(data);
    }

    show_content(data){
        const resultContent = document.getElementById("text-rw");
        //resultContent.insertAdjacentHTML('beforeend',data);
        resultContent.innerHTML = data;
    }
   
}

const form = document.getElementById("search-form").addEventListener("submit",(event)=>{
    const cont = document.getElementById("search-input").value; 
    const req = new APImanager(cont);
    req.handle_query(event);
});
