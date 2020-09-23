class APImanager{

    constructor(q){
        let config = '
        action=query&
        list=search&
        prop=info&
        inprop=url&
        utf8=&
        format=json&
        origin=*&
        srlimit=20';

        this.query = q.length==0 ? "" : q.trim();
        this.request = 'https://en.wikipedia.org/w/api.php?'+config+'&srsearch=`'+this.query;
    }

    async handle_query(event){
        event.preventDefault();

        try {

            const results = await this.search_wikipedia();
            console.log(results);

        } catch (err) {
            console.error(err);
            alert('Failed to search wikipedia');
        }

    }

    // simple AJAX petition
    async  search_wikipedia(){
        const res = await fetch(this.request);

        if(!res.ok){
            throw Error(res.statusText);
        }
    
        const json = await res.json();
    
        return json;
    }

    show_content(){
        // extract json content
        // process json content
        // show content
        return "";
    }
   
}

const form = document.getElementById("search-form").addEventListener("submit",(event)=>{
    const cont = document.getElementById("search-input").value; 
    const req = new APImanager(cont);
    req.handle_query(event);
});
