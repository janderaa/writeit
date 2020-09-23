class APImanager{
    private query: string;
    public text: string;


    constructor(q: string){
        this.query = q.length==0 ? "" : q.trim();
    }
    

    public async handle_query(event){
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
    private async  search_wikipedia(){
        const request = ''+this.query;
        const res = await fetch(request);

        if(!res.ok){
            throw Error(res.statusText);
        }
    
        const json = await res.json();
    
        return json;
    }

    private  retrieve_content(): string{

        return "";
    }
   
}

const form = document.getElementById("").addEventListener("submit",()=>{
    const cont = document.getElementById("").nodeValue; 
    const req = new APImanager(cont);
    req.handle_query(self);
});




