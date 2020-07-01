class Auth{

    constructor(){
        this.authentcated=false;
    }

    login(){
        this.authentcated=true;
    }

    logout(){
        this.authentcated=false;
    }

    isAuthenticated(){
        return this.authentcated;
    }
}
export default new Auth();