import java.io.*;
import java.net.*;
public class echoClient{
    public echoClient()
    {
        try{
            Socket client = new Socket("140.116.226.205", 8080); //這裡填入Server端的IP位置
            BufferedReader in = new BufferedReader(new InputStreamReader(System.in));  //鍵盤輸入
            DataOutputStream out = new DataOutputStream(client.getOutputStream());  
            DataInputStream datain = new DataInputStream(client.getInputStream());
 
           
            out.writeBytes("q");   //並將資料寫入到串流(即傳送給 Server)	    
	    //讀取從c
	    byte[]   cbuf=new   byte[8096]; 
	    datain.read(cbuf); 
	    String   responseLine=new   String(cbuf);                 
	    System.out.println(responseLine); 
            client.close(); 
        }catch(Exception e){
            System.out.println(e.getMessage());
            System.exit(-1);
        }
    }
    public static void main(String[] args) 
    {       
            echoClient client = new echoClient();
    }
}
