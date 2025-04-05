import userTable from "./user.js";
import vendorTable from "./vendor.js";
import transaction from "./transaction.js";

class entityManager{
    constructor(){
        userTable();
        vendorTable();
        transaction();
    }
}

export default entityManager;