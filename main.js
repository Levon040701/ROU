window.onload = function(){
    var slider = new Carousel({
        page: '#carousel .quote',
        nextPage: '#carousel .quote.nextPage',
        ind: '#carousel .controls .indicator',
        btnPrev: '#carousel .controls .prev',
        btnNext: '#carousel .controls .next',
        auto: true,
        speed: 10
    });
}

function Carousel(obj){
    this.page = document.querySelectorAll(obj.page);
    this.nextPage = obj.nextPage;
    this.ind = document.querySelectorAll(obj.ind);
    this.btnPrev = obj.btnPrev;
    this.btnNext = obj.btnNext;
    this.auto = obj.auto;
    this.speed = obj.speed || 1;
    this.secs = 0;

    var i = 0;
    var slider = this;
    var len = slider.page.length;

    this.prev = function(){
        slider.page[i].classList.remove('shown');
        slider.ind[i].classList.remove('shown');
        slider.page[slider.mod(i + 1)].classList.remove('nextPage');
        slider.page[i].classList.add('nextPage');
        i = slider.mod(i - 1);

        slider.page[i].classList.add('shown');
        slider.ind[i].classList.add('shown');
        slider.secs = 0;
    }

    this.next = function(){
        slider.page[i].classList.remove('shown');
        slider.ind[i].classList.remove('shown');
        slider.page[slider.mod(i + 1)].classList.remove('nextPage');
        slider.page[slider.mod(i + 2)].classList.add('nextPage');
        i = slider.mod(i + 1);

        slider.page[i].classList.add('shown');
        slider.ind[i].classList.add('shown');
        slider.secs = 0;
    }

    this.tp = function(elemId){
        index = -1;
        for(let k = 0; k < len; k++){
            if(slider.ind[k].id == elemId){
                index = k;
                break;
            }
        }

        slider.page[i].classList.remove('shown');
        slider.ind[i].classList.remove('shown');
        slider.page[slider.mod(i + 1)].classList.remove('nextPage');
        i = slider.mod(index);

        slider.page[i].classList.add('shown');
        slider.ind[i].classList.add('shown');
        slider.page[slider.mod(i + 1)].classList.add('nextPage');
        slider.secs = 0;
    }

    this.mod = function(num){
        num %= len;
        if(num < 0){
            num += len;
        }

        return num;
    }

    this.turn = function(){
        slider.secs++;
        if(slider.secs == slider.speed){
            slider.next();
        }
    }

    if(slider.auto){
        showtime = setInterval(slider.turn, 1000);
    }

    // document.querySelector(slider.btnPrev).addEventListener('click', slider.prev);
    // document.querySelector(slider.btnNext).addEventListener('click', slider.next);
    
    var one = document.querySelectorAll('.controls .indicator')[0];
    one.addEventListener('click', function(){slider.tp(one.id);});
    var two = document.querySelectorAll('.controls .indicator')[1];
    two.addEventListener('click', function(){slider.tp(two.id);});
    var three = document.querySelectorAll('.controls .indicator')[2];
    three.addEventListener('click', function(){slider.tp(three.id);});
    var four = document.querySelectorAll('.controls .indicator')[3];
    four.addEventListener('click', function(){slider.tp(four.id);});
}