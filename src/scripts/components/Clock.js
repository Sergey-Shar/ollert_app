

export class Clock {
    getTime(){
       this.time = new Date().toLocaleTimeString()
    }

    render(){
        this.getTime()
        const clock = document.querySelector(".header__clock")
        clock.innerText = this.time;
    }
    start(){
        this.render()
        setInterval(() => this.render() , 1000);
    }
    
}


