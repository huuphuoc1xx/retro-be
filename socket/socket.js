module.exports=(wss)=>{
    const listCLient={};
    wss.on("connection",(ws,req)=>{
        ws.on("message",(data)=>{
            data=JSON.parse(data);
            switch(data.event){
                case "connect":
                    listCLient[data.boardId]=listCLient[data.boardId]?[...listCLient[data.boardId],ws]:[ws];
                    break;
                case "change-card":
                    listCLient[data.boardId].forEach(element=>{
                        if(element!=ws)
                            element.send(JSON.stringify({event:"change-card",data:data.data}));
                    })
                    break;
                case "add-card":
                    listCLient[data.boardId].forEach(element=>{
                        if(element!=ws)
                            element.send(JSON.stringify({event:"add-card",data:data.data}));
                    })
                    break;
                case "delete-card":
                    listCLient[data.boardId].forEach(element=>{
                        if(element!=ws)
                            element.send(JSON.stringify({event:"delete-card",cardId:data.cardId}));
                    })
                    break;
                case "close":
                    listCLient[data.boardId].splice(listCLient[data.boardId].indexOf(ws),1);
                            
                    break;
            }
        })
    })
}