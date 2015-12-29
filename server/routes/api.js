// var fs = require('fs');

var Customer = require('../models/customer');
module.exports = function(router, passport){

    ///
    // router.use(function(req, res, next){
    //     fs.appendFile('logs.txt', req.path + " token: " + req.query.access_token + "\n",
    //         function(err){
    //             next();
    //         });
    // });

    // router.get('/testAPI', function(req, res, next){
    //     if(req.query.access_token) next();
    //     else next('route');
    // },passport.authenticate('bearer', { session: false }),
    //     function(req, res){
    //     res.json({ SecretData: 'abc123', Authenticated: true });
    // });

    // router.get('/testAPI', function(req, res){
    //     res.json({ SecretData: 'abc123', Authenticated: false });
    // });

    ///
    router.post('/customers', function(req, res){
        console.log(req.body);
        var customer = new Customer();
        customer.firstname = req.body.firstname;
        customer.lastname = req.body.lastname;
        customer.phone = req.body.phone;
        if(req.body.address) {
            customer.address.street = req.body.address.street;
            customer.address.city = req.body.address.city;
            customer.address.state = req.body.address.state;
            customer.address.zip = req.body.address.zip;
        }
        
        customer.save(function(err, data){
            if(err)
                throw err;
            res.json(data);
        });
    });
    
    router.get('/customers', function(req, res){
        Customer.find({}, function(err, data){
            res.json(data);
        });
    });
    
    router.delete('/customers', function(req, res){
        Customer.remove({}, function(err){
            res.json({result: err ? 'error' : 'ok'});
        });
    });
    
    router.get('/customers/:id', function(req, res){
        Customer.findOne({_id: req.params.id}, function(err, data){
            res.json(data);
        })
    })
    
    router.delete('/customers/:id', function(req, res){
        Customer.remove({_id: req.params.id}, function(err){
            res.json({result: err ? 'error' : 'ok'});
        })
    })
    
    router.post('/customers/:id', function(req, res){
        Customer.findOne({_id: req.params.id}, function(err, data){
            var customer = data;
            customer.firstname = req.body.firstname;
            customer.lastname = req.body.lastname;
            customer.phone = req.body.phone;
            if(req.body.address) {
                customer.address.street = req.body.address.street;
                customer.address.city = req.body.address.city;
                customer.address.state = req.body.address.state;
                customer.address.zip = req.body.address.zip;
            }
            
            customer.save(function(err, data){
                if(err)
                    throw err;
                res.json(data);
            });
            
        });
    });
    
    
}