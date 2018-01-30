function valid_mail(email_value) 
        {
            if(email_value==undefined||email_value=="")
            {
                return false;
            }
            var atpos = email_value.indexOf("@");
            var dotpos = email_value.lastIndexOf(".");
            if (atpos<1 || dotpos<atpos+2 || dotpos+2>=email_value.length) 
            {
        
                return false;
            }
            return true;
        }
        function valid_mobile(mobile_value) 
        {
            var phoneno = /^\d{10}$/;
            if(mobile_value==undefined||mobile_value=="")
            {
                return false;
            }
            if(mobile_value.match(phoneno)) 
            {  
                return true;  
            }  
            else  
            {  
                return false; 
            }  
        }
