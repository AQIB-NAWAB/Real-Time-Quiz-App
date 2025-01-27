export interface userData{
    id:string,
    username:string
}



export class UserManager {
    // saving users in a map 
    // id -> name
  private users: Map<string, userData>;
  
  constructor() {
    this.users = new Map<string,userData>;
  }

  addUser(data:{username:string,id:string}){
    // check if user already exist 
    if(this.users.get(data.id)){
        return null;
    }
    this.users.set(data.id, data);

    return this.users.get(data.id);
  }

  removeUser(id:string){
    this.users.delete(id);
  }

  getAllUsers(){
    return this.users;
  }
  getUser(id:string){

    return this.users.get(id) || null;
  }
}
