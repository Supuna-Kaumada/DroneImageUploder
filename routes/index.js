/*
* GET home page.
*/
 
/*
* GET home page.
*/
 
exports.index = function(req, res){
   message = '';
  if(req.method == "POST"){
     var post  = req.body;
     var img_date= post.image_date;
     var description= post.description;

    if (!req.files)
           return res.status(400).send('No files were uploaded.');

     var file = req.files.uploaded_image;
     var img_name=file.name;

        if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                
             file.mv('public/images/upload_images/'+file.name, function(err) {
                            
                if (err)
                  return res.status(500).send(err);

                    var sql = "INSERT INTO `drone_image`(`img_date`,`description` ,`image`) VALUES ('" + img_date + "','" + description + "','" + img_name + "')";

                     var query = db.query(sql, function(err, result) {
                        res.redirect('profile/'+result.insertId);
                     });
                 });
         } else {
           message = "This format is not allowed , please upload file with '.png','.gif','.jpg'";
           res.render('index.ejs',{message: message});
         }
  } else {
     res.render('index');
  }

};

exports.profile = function(req, res){
	var message = '';
	var id = req.params.id;
    var sql="SELECT * FROM `drone_image`"; 
    db.query(sql, function(err, result){
	  if(result.length <= 0)
	  message = "Profile not found!";
     
      res.render('profile.ejs',{data:result, message: message});
   });
};