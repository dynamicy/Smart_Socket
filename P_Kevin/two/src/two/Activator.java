package two;

import java.util.Timer;
import java.util.TimerTask;

import org.osgi.framework.BundleActivator;
import org.osgi.framework.BundleContext;
import org.osgi.framework.ServiceReference;


import one.Get_Media_URL;
import one.Service_Media;

public class Activator extends TimerTask implements BundleActivator {

	Timer timer = new Timer();
	public static String req = "";
	Get_Media_URL service_receiver; 
	Service_Media service_alive; 
	
	public static native String stringFromJNI();
	public static native String stringFromJNI1();
	
	
	
	
	static{
        System.load("/system/lib/libhello-jni123.so");
		//System.loadLibrary("hello-jni");
	   }
	
	
	public void run(){

		 req = stringFromJNI1();
	   	 System.out.println(req);
	   	 
	   	 
	  //要求url(下command)
	  if(req.equalsIgnoreCase("q")){			
		ServiceReference ref = context.getServiceReference(Get_Media_URL.class.getName());
		service_receiver = (Get_Media_URL)context.getService(ref);
		String a = service_receiver.myservicefunction();	
		System.out.println("url:"+a);
	  }
	  
	  
	  //詢問是否活著(下command)
	  else if(req.equalsIgnoreCase("p")){			
			ServiceReference ref = context.getServiceReference(Service_Media.class.getName());
			service_alive = (Service_Media)context.getService(ref); 
			int a = service_alive.myservicefunction();	
			System.out.println("alive"+a);	
		  }
	  
	  
	  
	  

   }
	
	private static BundleContext context;
	
	
	static BundleContext getContext() {
		return context;
	}

	public void start(BundleContext bundleContext) throws Exception{
		Activator.context = bundleContext;
		
		stringFromJNI();	
		 
	
	timer.schedule(new Activator(), 0,3000);
	
	
	
			
}
	

	/*
	 * (non-Javadoc)
	 * @see org.osgi.framework.BundleActivator#stop(org.osgi.framework.BundleContext)
	 */
	public void stop(BundleContext bundleContext) throws Exception {
		Activator.context = null;
		timer.cancel();
	}

}
