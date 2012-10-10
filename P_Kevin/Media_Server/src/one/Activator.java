package one;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;

import java.io.*;
import java.util.*;
import java.net.*;
import java.io.BufferedOutputStream;
import org.osgi.framework.ServiceReference;

import java.net.InetSocketAddress;
import java.net.Socket;



public class Activator extends TimerTask implements BundleActivator {

	private static BundleContext context;
	
	Timer timer = new Timer();
	
	Get_Media_URL service = new Get_Media_URL_Interface(); 	
	
	Service_Media check_media_server = new Service_Media_Interface();
	
	
	
	MyServiceInterface1 service1 = new MyService1(); 
	 
	
	
	static{
        System.load("/system/lib/libhello-jni.so");
		//System.loadLibrary("hello-jni");
	    }
 
  //public static native int  Init();	
  //public static native int Write(char g);
  //public static native int Read();
  //public static native int Close();
  //public static native int readd();
  public static native String stringFromJNI();
  public static native String stringFromJNI1();
  public static native int stringFromJNI2();
	
	
	//MyServiceInterface1 service1 = new MyService1();
	public static String url;
	static BundleContext getContext() {
		return context;
	}

	
	public void run(){

		
	       url =  stringFromJNI1();
		   System.out.println(url+"\n");
	}
	
	
	
	
	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#start(org.osgi.framework.BundleContext)
	 */
	public void start(BundleContext bundleContext) throws Exception {
		
		  Activator.context = bundleContext;
		
		  context.registerService(Get_Media_URL.class.getName(), service, null); 
		  
		  context.registerService(Service_Media.class.getName(), check_media_server, null);
		  
		  
		  context.registerService(MyServiceInterface1.class.getName(), service1, null);
		  
		  stringFromJNI();
		  
		  //System.out.println(Init());
		  //System.out.println(Write('q'));
		  //System.out.println(Read());	  
		  //readd();
		  //System.out.println("OK!!");
		  //System.getProperties().list(System.out);
		  //System.out.println(stringFromJNI());
		  //url =  stringFromJNI();
		  //System.out.println("!!"+url);
		  //System.out.println("This is my first service");
		
		   

		   timer.schedule(new Activator(), 0,3000);
		//context.registerService(MyServiceInterface1.class.getName(), service1, null);
		
	}
	

	
	

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#stop(org.osgi.framework.BundleContext)
	 */
	public void stop(BundleContext bundleContext) throws Exception {
		Activator.context = null;
		//System.out.println("This is my first service and stop");
		// System.out.println(Close());
		timer.cancel();
	}

}