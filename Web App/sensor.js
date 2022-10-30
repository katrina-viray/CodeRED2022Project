class Sensor{
    constructor(car){
        this.car=car;
        this.rayCount=100;
        this.rayLength=100;
        this.raySpread=Math.PI;
        
        this.rays=[];
        this.readings=[]; //if theres a border or not
    }

    update(zoneBorders){
       this.#castRays();
       this.readings=[];
       for(let i=0; i<this.rays.length;i++){
        this.readings.push(
            this.#getReading(this.rays[i],zoneBorders)
        );
       }
    }

    #getReading(ray,zoneBorders){
        let touches=[];
        for(let i=0;i<zoneBorders.length;i++){
            const touch=getIntersection(
                ray[0],ray[1], zoneBorders[i][0], zoneBorders[i][1]
            );
            if(touch){
                touches.push(touch);
            }
        }
        if(touches.length==0){
            return null;
        }
        else{ //makes an array of the distance between sensor and zones
            const offsets=touches.map(e=>e.offset);
            //find the nearest touch
            const minOffset=Math.min(...offsets);
            //return touch with closest offset
            return touches.find(e=>e.offset==minOffset);
        }

    }

    #castRays(){
        this.rays=[];
        for(let i=0;i<this.rayCount;i++){
            const rayAngle=lerp(
                this.raySpread/2,
                -this.raySpread/2,
                this.rayCount==1?0.5:i/(this.rayCount-1)
            )+this.car.angle;

            const start={x:this.car.x, y:this.car.y};
            const end={
                x:this.car.x-
                    Math.sin(rayAngle)*this.rayLength,
                y:this.car.y-
                    Math.cos(rayAngle)*this.rayLength 
            };
            this.rays.push([start,end]);
        } 
    }

    draw(ctx){    
        for(let i=0;i<this.rayCount;i++){
            let end=this.rays[i][1];
            if(this.readings[i]){
                end=this.readings[i]; //pass the x and y to this
            }
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="yellow";
            ctx.moveTo(
                this.rays[i][0].x,
                this.rays[i][0].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
            //copy everything to visualize sensors
            ctx.beginPath();
            ctx.lineWidth=2;
            ctx.strokeStyle="black";
            ctx.moveTo(
                this.rays[i][1].x, //draw from the tip
                this.rays[i][1].y
            );
            ctx.lineTo(
                end.x,
                end.y
            );
            ctx.stroke();
        }
    }
}