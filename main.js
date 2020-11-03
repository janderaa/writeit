var textGen = null;

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

function text_writing_process(char){
    // textGen array needs to at least have 1 char!

    console.log(char);
    console.log(textGen.contentArray[0]);

    if(char === textGen.contentArray[0]){
        textGen.hide_character();
    }

    // ending
}

window.onkeydown = (e)=>{
    if(textGen.content.length >0){text_writing_process(e.key);}
}
