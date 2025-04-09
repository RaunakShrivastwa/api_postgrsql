import transactionController1 from '../repositery/EntityRepositery.js';

const repo = new transactionController1('transaction');

class transactionController{
    createTransaction = async (req,res)=>{
       try {
            const transaction = await repo.create(req.body);
            return res.status(201).json({transaction});
       } catch (error) {
            return res.status(500).json({Error:error})
       }
    }

    getAllTransaction = async (req,res)=>{
        try{
          return res.status(200).json(await repo.findAll());
        }catch(err){
         return res.status(500).json({err})
        }
    }

    updateTransaction = async (req,res)=>{

    }

    deleteTransaction = async (req,res)=>{
       try{
         const transaction =  await repo.deleteById(req.params.id);
         return res.status(200).json(transaction);
       }catch(err){
         return res.status(500).json({err});
       }
    }

    updateTransaction = async (req,res)=>{

    }

    getTransaction = async (req,res)=>{

    }

    transactionDetails = async (req,res)=>{
       try {
          const details = await repo.getTransactionsByUserId(req.params.id);
          return res.status(200).json({Transaction:details})
       } catch (error) {
          return res.status(500).json({Error:error})
       }
    }
}

export default new transactionController();