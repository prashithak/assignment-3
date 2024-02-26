const express=require('express');
var fs= require('fs');

const router=express.Router();
router.use(express.json());




//get
router.get('/', (req, res) => {
    const users = getUserData();
    res.send(users);
})


//post
router.post('/add', (req, res) => {
    
    const existUsers = getUserData()
    const userData = req.body
        
        if (userData.Hname == null || userData.PatientCount == null || userData.Hlocation == null )
        {
        return res.status(401).send({error: true, msg: 'User data missing'})
         }
    
    const findExist = existUsers.find( existUsers => existUsers.Hname === userData.Hname )
        if (findExist)
         {
        return res.status(409).send({error: true, msg: 'Hospital already exist'})
        }

    existUsers.push(userData);
    saveUserData(existUsers);
    res.send({success: true, msg: 'User data added successfully'})
})


//put

router.put('/update/:Hname', (req, res) => {
    
   
    const userData = req.body;
    
    const existUsers = getUserData();
       
    const findExist = existUsers.find( existUsers => existUsers.Hname === userData.Hname );
    if (!findExist) {
        return res.status(409).send({error: true, msg: 'Hospital not exist'});
    
    }

    const updateUser = existUsers.filter( existUsers => existUsers.Hname !== userData.Hname  );

    updateUser.push(userData);
    saveUserData(updateUser);
    res.send({success: true, msg: 'User data updated successfully'}) ;  
   
})

//delete

router.delete('/del',(req,res)=>{
    const existUsers = getUserData();
    existUsers.pop();
    res.send({message:"data deleted",existUsers});
})

const getUserData=() => {
    const jsonData = fs.readFileSync('hospitaldata.json');
    return JSON.parse(jsonData) ;   
}

const saveUserData = (data) => {
    const stringifyData = JSON.stringify(data)
    fs.writeFileSync('hospitaldata.json', stringifyData)
}

module.exports = router;