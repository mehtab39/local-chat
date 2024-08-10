
class UserService{
    constructor(){
        this.id = '_' + Math.random().toString(36).substr(2, 9);
    }
}

const user =  new UserService()

export default user;
