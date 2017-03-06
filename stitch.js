function Stitch(type){
     this.stitch =[];
     this.max;
     this.type = type;
     this.create();
     
}
Stitch.prototype.create =function(){
    switch(this.type){
        case '-': {                         // overslaan
        this.max = 2;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(0,1,0,0);
        break;
       }
       case '+': {                         // 1 plat
        this.max = 2;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
         this.stitch[1] = new Pos(0,1,0,2);

        break;
       }
        case '1': {                         // 1 bol
        this.max = 4;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(2,1,0,2);
        this.stitch[2] = new Pos(0,2,0,2);
        this.stitch[3] = new Pos(0,1,0,2);

        break;
       }
        case '2': {                         // 2 driehoekjes
        this.max = 5;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(0,2,0,2);
        this.stitch[2] = new Pos(2,1,0,2);
        this.stitch[3] = new Pos(2,3,0,2);
        this.stitch[4] = new Pos(0,2,0,2);

        break;
        }
        case '3': {                         // 3 steek
        this.max = 13;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(0,1,0,2);
        this.stitch[2] = new Pos(1,2,0,2);
        this.stitch[3] = new Pos(2,2,0,2);
        this.stitch[4] = new Pos(3,1,0,2);
        this.stitch[5] = new Pos(4,1,0,2);
        this.stitch[6] = new Pos(5,2,0,2);
        this.stitch[7] = new Pos(5,3,0,2);
        this.stitch[8] = new Pos(4,4,0,2);
        this.stitch[9] = new Pos(3,4,0,2);
        this.stitch[10] = new Pos(2,3,0,2);
        this.stitch[11] = new Pos(1,3,0,2);
        this.stitch[12] = new Pos(0,4,0,2);

        break;
       }
        case 'A': {                         //R opzetten naar rechts, eerste steek
        this.max = 7;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,2);
        this.stitch[2] = new Pos(4,2,0,2);
        this.stitch[3] = new Pos(3,3,0,1);
        this.stitch[4] = new Pos(2,3,0,1);
        this.stitch[5] = new Pos(1,2,0,1);
        this.stitch[6] = new Pos(4,0,0,2);
        break;
       }
       case 'B': {                         //R opzetten naar rechts
        this.max = 7;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,2);
        this.stitch[2] = new Pos(4,2,0,2);
        this.stitch[3] = new Pos(3,3,0,1);
        this.stitch[4] = new Pos(2,3,0,1);
        this.stitch[5] = new Pos(1,2,0,1);
        this.stitch[6] = new Pos(4,0,0,2);
        break;
       }
       case 'C': {                         //R opzetten naar rechts, laatste steek
        this.max = 10;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,2);
        this.stitch[2] = new Pos(4,2,0,2);
        this.stitch[3] = new Pos(3,3,0,1);
        this.stitch[4] = new Pos(2,3,0,1);
        this.stitch[5] = new Pos(1,2,0,1);
        this.stitch[6] = new Pos(4,0,0,2);
        this.stitch[7] = new Pos(5,0,0,2);
        this.stitch[8] = new Pos(5,1,0,2);
        this.stitch[9] = new Pos(4,1,0,2);
       
        break;
       }

       case 'R': {                         //R naar rechts
        this.max = 9;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,1);
        this.stitch[2] = new Pos(2,1,0,1);
        this.stitch[3] = new Pos(1,3,0,3);
        this.stitch[4] = new Pos(2,4,0,1);
        this.stitch[5] = new Pos(3,4,0,1);
        this.stitch[6] = new Pos(4,3,0,1);
        this.stitch[7] = new Pos(3,1,0,3);
        this.stitch[8] = new Pos(4,0,0,1);
        break;
       }
       case 'S': {                         //R laatste rechts
        this.max = 12;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,1);
        this.stitch[2] = new Pos(2,1,0,1);
        this.stitch[3] = new Pos(1,3,0,3);
        this.stitch[4] = new Pos(2,4,0,1);
        this.stitch[5] = new Pos(3,4,0,1);
        this.stitch[6] = new Pos(4,3,0,1);
        this.stitch[7] = new Pos(3,1,0,3);
        this.stitch[8] = new Pos(4,0,0,2);
        this.stitch[9] = new Pos(5,0,0,2);
        this.stitch[10] = new Pos(5,2,0,2);
        this.stitch[11] = new Pos(4,2,0,1);
        break;
       }
        case 'L': {                         //R naar links
        this.max = 9;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,1,0,1);
        this.stitch[2] = new Pos(0,3,0,3);
        this.stitch[3] = new Pos(-1,4,0,1);
        this.stitch[4] = new Pos(-2,4,0,1);
        this.stitch[5] = new Pos(-3,3,0,1);
        this.stitch[6] = new Pos(-2,1,0,3);
        this.stitch[7] = new Pos(-3,0,0,1);
        this.stitch[8] = new Pos(-4,0,0,1);
        break;
       }
       case 'K': {                         //R laatste links
        this.max = 10;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,1,0,1);
        this.stitch[2] = new Pos(0,3,0,3);
        this.stitch[3] = new Pos(-1,4,0,1);
        this.stitch[4] = new Pos(-2,4,0,1);
        this.stitch[5] = new Pos(-3,3,0,1);
        this.stitch[6] = new Pos(-2,1,0,3);
        this.stitch[7] = new Pos(-3,0,0,1);
        this.stitch[8] = new Pos(-4,0,0,1);
        this.stitch[9] = new Pos(-4,2,0,2);
        break;
       }
        case 'U': {                         //R afhechten, laatste steek links
        this.max = 7;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,0,0,2);
        this.stitch[2] = new Pos(-3,-2,0,2);
        this.stitch[3] = new Pos(-3,-3,0,2);
        this.stitch[4] = new Pos(-2,-3,0,1);
        this.stitch[5] = new Pos(-1,-2,0,1);
        this.stitch[6] = new Pos(-3,0,0,2);
        break;
       }

       case 'V': {                         //R afhechten naar links
        this.max =7;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,0,0,2);
        this.stitch[2] = new Pos(-4,-2,0,2);
        this.stitch[3] = new Pos(-3,-3,0,1);
        this.stitch[4] = new Pos(-2,-3,0,1);
        this.stitch[5] = new Pos(-1,-2,0,1);
        this.stitch[6] = new Pos(-4,0,0,2);
        break;
       }
      case 'W': {                         //R afhechten, eerste steek naar links
        this.max = 4;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,1,0,1);
        this.stitch[2] = new Pos(0,2,0,2);
        this.stitch[3] = new Pos(-1,3,0,2);

        break;
       }
       case 'X': {                         //R afhechten, eerste steek
        this.max = 6;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,1);
        this.stitch[2] = new Pos(2,1,0,1);
        this.stitch[3] = new Pos(0,2,0,2);
        this.stitch[4] = new Pos(1,3,0,2);
        this.stitch[5] = new Pos(2,3,0,2);
        break;
       }
       case 'Y': {                         //R afhechten naar rechts
        this.max = 7;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,2);
        this.stitch[2] = new Pos(4,-2,0,2);
        this.stitch[3] = new Pos(3,-3,0,1);
        this.stitch[4] = new Pos(2,-3,0,1);
        this.stitch[5] = new Pos(1,-2,0,1);
        this.stitch[6] = new Pos(4,0,0,2);
        break;
       }
       case 'Z': {                         //R afhechten, laatste steek
        this.max = 7;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,2);
        this.stitch[2] = new Pos(3,-1,0,2);
        this.stitch[3] = new Pos(3,-3,0,2);
        this.stitch[4] = new Pos(2,-3,0,1);
       this.stitch[5] = new Pos(1,-2,0,2);
       this.stitch[6] = new Pos(3,0,0,2);
        break;
       }
  case 'a': {                         //R opzetten naar rechts, eerste steek
        this.max = 7;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,2);
        this.stitch[2] = new Pos(4,2,0,2);
        this.stitch[3] = new Pos(3,3,0,2);
        this.stitch[4] = new Pos(2,3,0,3);
        this.stitch[5] = new Pos(1,2,0,2);
        this.stitch[6] = new Pos(4,0,0,2);
        break;
       }
       case 'b': {                         //R opzetten naar rechts
        this.max = 7;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,2);
        this.stitch[2] = new Pos(4,2,0,2);
        this.stitch[3] = new Pos(3,3,0,2);
        this.stitch[4] = new Pos(2,3,0,3);
        this.stitch[5] = new Pos(1,2,0,2);
        this.stitch[6] = new Pos(4,0,0,2);
        break;
       }
       case 'c': {                         //R opzetten naar rechts, laatste steek
        this.max = 10;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,2);
        this.stitch[2] = new Pos(4,2,0,2);
        this.stitch[3] = new Pos(3,3,0,2);
        this.stitch[4] = new Pos(2,3,0,3);
        this.stitch[5] = new Pos(1,2,0,2);
        this.stitch[6] = new Pos(4,0,0,2);
        this.stitch[7] = new Pos(5,0,0,2);
        this.stitch[8] = new Pos(5,1,0,2);
        this.stitch[9] = new Pos(4,1,0,2);
       
        break;
       }

       case 'r': {                         //R naar rechts
        this.max = 9;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,3);
        this.stitch[2] = new Pos(2,1,0,2);
        this.stitch[3] = new Pos(1,3,0,1);
        this.stitch[4] = new Pos(2,4,0,2);
        this.stitch[5] = new Pos(3,4,0,3);
        this.stitch[6] = new Pos(4,3,0,2);
        this.stitch[7] = new Pos(3,1,0,1);
        this.stitch[8] = new Pos(4,0,0,2);
        break;
       }
       case 's': {                         //R laatste rechts
        this.max = 12;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,3);
        this.stitch[2] = new Pos(2,1,0,2);
        this.stitch[3] = new Pos(1,3,0,1);
        this.stitch[4] = new Pos(2,4,0,2);
        this.stitch[5] = new Pos(3,4,0,3);
        this.stitch[6] = new Pos(4,3,0,2);
        this.stitch[7] = new Pos(3,1,0,1);
        this.stitch[8] = new Pos(4,0,0,2);
        this.stitch[9] = new Pos(5,0,0,3);
        this.stitch[10] = new Pos(5,2,0,2);
        this.stitch[11] = new Pos(4,2,0,3);
        break;
       }
        case 'l': {                         //R naar links
        this.max = 9;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,1,0,2);
        this.stitch[2] = new Pos(0,3,0,1);
        this.stitch[3] = new Pos(-1,4,0,2);
        this.stitch[4] = new Pos(-2,4,0,3);
        this.stitch[5] = new Pos(-3,3,0,2);
        this.stitch[6] = new Pos(-2,1,0,1);
        this.stitch[7] = new Pos(-3,0,0,2);
        this.stitch[8] = new Pos(-4,0,0,3);
        break;
       }
       case 'k': {                         //R laatste links
        this.max = 10;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,1,0,1);
        this.stitch[2] = new Pos(0,3,0,1);
        this.stitch[3] = new Pos(-1,4,0,2);
        this.stitch[4] = new Pos(-2,4,0,3);
        this.stitch[5] = new Pos(-3,3,0,2);
        this.stitch[6] = new Pos(-2,1,0,1);
        this.stitch[7] = new Pos(-3,0,0,2);
        this.stitch[8] = new Pos(-4,0,0,3);
        this.stitch[9] = new Pos(-4,2,0,2);
        break;
       }
        case 'u': {                         //R afhechten, laatste steek links
        this.max = 7;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,0,0,2);
        this.stitch[2] = new Pos(-3,-2,0,2);
        this.stitch[3] = new Pos(-3,-3,0,2);
        this.stitch[4] = new Pos(-2,-3,0,3);
        this.stitch[5] = new Pos(-1,-2,0,2);
        this.stitch[6] = new Pos(-3,0,0,2);
        break;
       }

       case 'v': {                         //R afhechten naar links
        this.max =7;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,0,0,2);
        this.stitch[2] = new Pos(-4,-2,0,2);
        this.stitch[3] = new Pos(-3,-3,0,2);
        this.stitch[4] = new Pos(-2,-3,0,3);
        this.stitch[5] = new Pos(-1,-2,0,2);
        this.stitch[6] = new Pos(-4,0,0,2);
        break;
       }
      case 'w': {                         //R afhechten, eerste steek naar links
        this.max = 4;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(-1,1,0,1);
        this.stitch[2] = new Pos(0,2,0,2);
        this.stitch[3] = new Pos(-1,3,0,2);

        break;
       }
       case 'x': {                         //R afhechten, eerste steek
        this.max = 6;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,3);
        this.stitch[2] = new Pos(2,1,0,2);
        this.stitch[3] = new Pos(0,2,0,2);
        this.stitch[4] = new Pos(1,3,0,2);
        this.stitch[5] = new Pos(2,3,0,2);
        break;
       }
       case 'y': {                         //R afhechten naar rechts
        this.max = 7;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,2);
        this.stitch[2] = new Pos(4,-2,0,2);
        this.stitch[3] = new Pos(3,-3,0,2);
        this.stitch[4] = new Pos(2,-3,0,3);
        this.stitch[5] = new Pos(1,-2,0,2);
        this.stitch[6] = new Pos(4,0,0,2);
        break;
       }
       case 'z': {                         //R afhechten, laatste steek
        this.max =7;
        this.stitch = [];
        this.stitch[0] = new Pos(0,0,0,0);
        this.stitch[1] = new Pos(1,0,0,2);
        this.stitch[2] = new Pos(3,-1,0,2);
        this.stitch[3] = new Pos(3,-3,0,2);
        this.stitch[4] = new Pos(2,-3,0,3);
        this.stitch[5] = new Pos(1,-2,0,2);
        this.stitch[6] = new Pos(3,0,0,2);
        break;
       }
     }
  }
