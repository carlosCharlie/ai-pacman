
let path = [];

class Ia{

    constructor(){

        this.trained = false;
        this.inputs = [];
        this.outputs = [];

        this.tree = new ML.DecisionTreeClassifier(
            {
            gainFunction: 'gini',
            maxDepth: 50,
            minNumSamples: 1
            });
    }

    move(ghostPos,userPos,movements){

        ghostPos = ghostPos.slice(0,4);
        
        let row = [];

        if(!this.trained){
            this.trained = true;
            this.tree.train(this.inputs,this.outputs);
        }

        ghostPos.sort((a,b) =>Math.sqrt(Math.pow(a.new.x-userPos.x,2)+Math.pow(a.new.y-userPos.y,2)) > Math.sqrt(Math.pow(b.new.x-userPos.x,2)+Math.pow(b.new.y-userPos.y,2)))
        .forEach(g => {
            row.push(g.new.x-userPos.x);
            row.push(g.new.y-userPos.y); 
        });

        row = row.concat(movements.map(Number));
        
        let result = Number(this.tree.predict([row]))+37;
        
        console.log(result);

        return result;

    }


    learn(ghostPos,userPos,key,movements){
        
        this.trained = false;
        
        key -= 37;

        console.log(key);

        ghostPos = ghostPos.slice(0,4);

        let row = [];

        ghostPos.sort((a,b) =>Math.sqrt(Math.pow(a.new.x-userPos.x,2)+Math.pow(a.new.y-userPos.y,2)) > Math.sqrt(Math.pow(b.new.x-userPos.x,2)+Math.pow(b.new.y-userPos.y,2)))
        .forEach(g => {
            row.push(g.new.x-userPos.x);
            row.push(g.new.y-userPos.y); 
        });

        row = row.concat(movements.map(Number));

        this.inputs.push(row);

        this.outputs.push(key);

        let text = row.reduce((p,c)=>p+"<td>"+c+"</td>","");

        text+="<td>"+key+"</td>";
        document.getElementById("tableList").innerHTML+="<tr>"+text+"</tr>";
    }

};