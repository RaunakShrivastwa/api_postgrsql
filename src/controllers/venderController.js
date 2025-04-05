import venderRepositery from '../repositery/EntityRepositery.js';

const repo = new venderRepositery('vender');

class Vender {

    createVender = async (req, res) => {
        try {
            const vender = await repo.create(req.body);
            return res.status(201).json(vender);
        } catch (err) {
            return res.status(500).json({ Error: err });
        }
    }

    getAllVender = async (req, res) => {
        try {
            const vender = await repo.findAll();
            return res.status(200).json(vender)
        } catch (err) {
            return res.status(500).json({ Error: err })
        }
    }

    updateVender = async (req, res) => {
       try{
          const updatedVender = await repo.updateById(req.params.id,req.body);
          return res.status(200).json({Updated:updatedVender});
       }catch(err){
        return res.status(500).json({Error:err})
       }
    }

    deleteVender = async (req, res) => {
        try{
            const deletedVender = await repo.deleteById(req.params.id);
            return res.status(200).json({deleted:deletedVender});
        }catch(err){
            return res.status(500).json({Error:err});
        }
    }

    singleVender = async (req, res) => {
        try{
            const vender = await repo.findById(req.params.id);
            return res.status(200).json({Vender:vender});
        }catch(err){
            return res.status(500).json({Error:err});
        }
    }
}

export default new Vender();