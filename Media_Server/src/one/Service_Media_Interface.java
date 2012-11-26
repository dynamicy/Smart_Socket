package one;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.Timer;
import java.util.TimerTask;





public class Service_Media_Interface extends java.lang.Thread implements Service_Media{ 
	
	public static int check = 0;
	public static int temp = 0;
	public static int count = 0;
	public static int flag = 0;
	
	
 public int myservicefunction() 
 
 { 
	 
	 /*try { 
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
	 
	 */
	 
	 count =0;	 //計算等5秒的時間
	 check = 0;  //回傳alive
	 temp = Activator.stringFromJNI2();  
	 flag = 0;//while 迴圈停止條件
	 
	 while(flag==0){		 
		 check = Activator.stringFromJNI3();
		 
		 if(check==0){
			 try {
				  Thread.sleep(1000);   //暫停1秒
				} catch (InterruptedException e) {
					e.printStackTrace();
				}		 
			 count++;
		    if(count>=5)
		     flag = 1;
		 }
		 else
		     flag = 1;	
	 }
  
	 
	 return check;	
   
     
  };
} 

