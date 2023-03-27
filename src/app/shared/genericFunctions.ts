export function generateId(T:any){
    let max;
    if (T.length==0) {
      max = 0;
    } else {
      let max =T[0].id;
      for (let i = 1; i < T.length; i++) {
        if (T[i].id>max) {
          max=T[i].id;
        }
        
      }
    } return max+1;
    
  }