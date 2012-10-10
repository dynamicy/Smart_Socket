package one;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;

public class Service_Media_Interface implements Service_Media{ 
	
	
	public int check = 0;
	
 public int myservicefunction() 
 { 
    	try { 
    		//server ip
            InetAddress address = InetAddress.getByName("140.116.226.227");
            
            if(address.isReachable(5000)==true){check=1;}        //有ping到            
            else if(address.isReachable(5000)==false){check=0;}  //沒有ping到  
            else {check=0;}                                      //沒有ping到  
            
        } catch (UnknownHostException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    	
    	return check;
   
  };
} 

